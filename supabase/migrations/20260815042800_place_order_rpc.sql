-- Guest checkout uses the publishable key. These SECURITY DEFINER functions
-- write/read orders without a service role key, while still looking up live
-- menu prices so clients cannot submit fake totals.

CREATE OR REPLACE FUNCTION public.place_order(payload jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_settings public.restaurant_settings%ROWTYPE;
  v_zone public.delivery_zones%ROWTYPE;
  v_item public.menu_items%ROWTYPE;
  v_line jsonb;
  v_subtotal integer := 0;
  v_tax integer := 0;
  v_service integer := 0;
  v_packaging integer := 0;
  v_total integer := 0;
  v_order public.orders%ROWTYPE;
  v_qty integer;
  v_lines jsonb := '[]'::jsonb;
BEGIN
  IF payload IS NULL THEN
    RAISE EXCEPTION 'Invalid order';
  END IF;

  SELECT * INTO v_settings FROM restaurant_settings WHERE id = 1;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Ordering is temporarily unavailable.';
  END IF;
  IF NOT v_settings.accepting_orders THEN
    RAISE EXCEPTION 'Loft 29 is not accepting online orders right now.';
  END IF;

  IF COALESCE(payload->>'paymentMethod', '') NOT IN ('cod', 'bank_transfer') THEN
    RAISE EXCEPTION 'Invalid payment method.';
  END IF;
  IF payload->>'paymentMethod' = 'cod' AND NOT v_settings.cod_enabled THEN
    RAISE EXCEPTION 'Cash on delivery is currently unavailable.';
  END IF;
  IF payload->>'paymentMethod' = 'bank_transfer' AND NOT v_settings.bank_transfer_enabled THEN
    RAISE EXCEPTION 'Bank transfer is currently unavailable.';
  END IF;

  SELECT * INTO v_zone FROM delivery_zones WHERE id = payload->>'zoneId';
  IF NOT FOUND OR NOT v_zone.active THEN
    RAISE EXCEPTION 'We do not deliver to that area yet.';
  END IF;

  IF jsonb_typeof(payload->'items') IS DISTINCT FROM 'array'
     OR jsonb_array_length(payload->'items') < 1 THEN
    RAISE EXCEPTION 'Your cart is empty.';
  END IF;

  FOR v_line IN SELECT value FROM jsonb_array_elements(payload->'items')
  LOOP
    v_qty := COALESCE((v_line->>'quantity')::int, 0);
    IF v_qty < 1 OR v_qty > 50 THEN
      RAISE EXCEPTION 'Invalid item quantity.';
    END IF;

    SELECT * INTO v_item FROM menu_items WHERE id = v_line->>'id';
    IF NOT FOUND THEN
      RAISE EXCEPTION 'One of the items is no longer on the menu.';
    END IF;
    IF NOT v_item.available THEN
      RAISE EXCEPTION '% is currently sold out.', v_item.name;
    END IF;

    v_subtotal := v_subtotal + (v_item.price * v_qty);
    v_lines := v_lines || jsonb_build_array(jsonb_build_object(
      'menu_item_id', v_item.id,
      'name_snapshot', v_item.name,
      'price_snapshot', v_item.price,
      'quantity', v_qty,
      'subtotal', v_item.price * v_qty
    ));
  END LOOP;

  IF v_subtotal < v_zone.minimum_order THEN
    RAISE EXCEPTION 'Minimum order for % is Rs. %.', v_zone.name, v_zone.minimum_order;
  END IF;

  IF v_settings.tax_enabled THEN
    v_tax := round((v_subtotal * v_settings.tax_rate) / 100.0);
  END IF;
  IF v_settings.service_charge_enabled THEN
    v_service := round((v_subtotal * v_settings.service_charge_rate) / 100.0);
  END IF;
  IF v_settings.packaging_fee_enabled THEN
    v_packaging := v_settings.packaging_fee;
  END IF;

  v_total := v_subtotal + v_zone.delivery_fee + v_tax + v_service + v_packaging;

  INSERT INTO orders (
    customer_name, phone, email, zone_id, zone_name, delivery_address,
    house, floor, landmark, instructions, estimated_time,
    subtotal, delivery_fee, tax_amount, service_charge, packaging_fee, total, payment_method
  ) VALUES (
    NULLIF(btrim(payload->>'customerName'), ''),
    NULLIF(btrim(payload->>'phone'), ''),
    NULLIF(btrim(payload->>'email'), ''),
    v_zone.id,
    v_zone.name,
    NULLIF(btrim(payload->>'address'), ''),
    NULLIF(btrim(payload->>'house'), ''),
    NULLIF(btrim(payload->>'floor'), ''),
    NULLIF(btrim(payload->>'landmark'), ''),
    NULLIF(btrim(payload->>'instructions'), ''),
    v_zone.estimated_time,
    v_subtotal,
    v_zone.delivery_fee,
    v_tax,
    v_service,
    v_packaging,
    v_total,
    payload->>'paymentMethod'
  )
  RETURNING * INTO v_order;

  INSERT INTO order_items (order_id, menu_item_id, name_snapshot, price_snapshot, quantity, subtotal)
  SELECT
    v_order.id,
    x->>'menu_item_id',
    x->>'name_snapshot',
    (x->>'price_snapshot')::int,
    (x->>'quantity')::int,
    (x->>'subtotal')::int
  FROM jsonb_array_elements(v_lines) AS x;

  INSERT INTO order_status_events (order_id, status, note)
  VALUES (v_order.id, 'new', 'Order placed online');

  RETURN jsonb_build_object(
    'id', v_order.id,
    'orderNumber', v_order.order_number,
    'total', v_order.total,
    'estimatedTime', v_order.estimated_time
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_order_status(_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order jsonb;
  v_items jsonb;
  v_events jsonb;
BEGIN
  SELECT to_jsonb(o) INTO v_order
  FROM (
    SELECT
      id, order_number, customer_name, zone_name, delivery_address, estimated_time,
      subtotal, delivery_fee, tax_amount, service_charge, packaging_fee, total,
      payment_method, payment_status, order_status, created_at
    FROM orders
    WHERE id = _id
  ) o;

  IF v_order IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT COALESCE(jsonb_agg(to_jsonb(i)), '[]'::jsonb) INTO v_items
  FROM (
    SELECT name_snapshot, price_snapshot, quantity, subtotal
    FROM order_items
    WHERE order_id = _id
  ) i;

  SELECT COALESCE(jsonb_agg(to_jsonb(e) ORDER BY e.created_at), '[]'::jsonb) INTO v_events
  FROM (
    SELECT status, note, created_at
    FROM order_status_events
    WHERE order_id = _id
  ) e;

  RETURN jsonb_build_object('order', v_order, 'items', v_items, 'events', v_events);
END;
$$;

REVOKE ALL ON FUNCTION public.place_order(jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_order_status(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.place_order(jsonb) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_order_status(uuid) TO anon, authenticated, service_role;

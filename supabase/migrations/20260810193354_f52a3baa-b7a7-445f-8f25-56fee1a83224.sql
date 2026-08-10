
INSERT INTO public.delivery_zones (id, name, sub_areas, delivery_fee, minimum_order, estimated_time, sort_order) VALUES
('paragon-city','Paragon City', ARRAY['Executive Block','Imperial Block','Orchard Block','Sector A','Sector B','Gate 1','Gate 2'], 99, 1000, '25-35 min', 1),
('barki-road','Barki Road', ARRAY['Street 360','Bhatta Chowk','Charar Pind Link','Sui Gas Society'], 149, 1200, '30-45 min', 2),
('dha-phase-5-6','DHA Phase 5 & 6', ARRAY['Phase 5','Phase 6','Sector C','Sector D','Broadway'], 199, 1500, '35-50 min', 3),
('dha-phase-1-4','DHA Phase 1-4', ARRAY['Phase 1','Phase 2','Phase 3','Phase 4','Y Block','H Block'], 199, 1500, '40-55 min', 4),
('cantt-askari','Cantt & Askari', ARRAY['Askari 9','Askari 10','Askari 11','Cavalry Ground','Sarwar Road'], 249, 1800, '45-60 min', 5),
('gulberg','Gulberg', ARRAY['Gulberg II','Gulberg III','Main Boulevard','Liberty','MM Alam Road'], 299, 2000, '50-70 min', 6),
('johar-town','Johar Town', ARRAY['J Block','R Block','Emporium Area','Expo Centre'], 349, 2500, '60-80 min', 7);

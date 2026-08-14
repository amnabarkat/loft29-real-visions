# WhatsApp CTA cleanup

## Problem
The WhatsApp CTAs are currently using `https://wa.me/NUMBER` links, which the user interpreted as the WhatsApp Business API. They want simple `<a href>` links that open WhatsApp chat directly on web and mobile.

## What we will do
- Confirm that `https://wa.me/NUMBER` is the official WhatsApp click-to-chat URL, not the WhatsApp Business API, and is the correct simple way to open a WhatsApp chat.
- Remove `target="_blank"` and `rel="noreferrer noopener"` from all WhatsApp CTAs so they behave as plain links that open in the same tab / in the WhatsApp app.
- Ensure all reservation/event CTAs across the homepage consistently use the same WhatsApp number link.

## Files to edit
- `src/components/loft/site.tsx` — update all WhatsApp anchor tags and the `CONTACT` object.

## Verification
- Run a type-check/build.
- Spot-check the homepage CTAs in the preview to confirm they link to `wa.me/923332797982`.

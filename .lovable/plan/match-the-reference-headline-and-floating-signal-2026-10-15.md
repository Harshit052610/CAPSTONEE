# Match the reference headline and floating signal

## Scope
Change only the headline typography and animated signal illustration. Preserve the wording, three themes, and all analysis functionality.

## Headline
- Load Instrument Sans at weight 500 for “See the signal” and Playfair Display Medium Italic for “before it becomes noise.” Your Inspect panel identifies these actual rendered fonts; the current headline uses DM Sans and Instrument Serif.
- Use your supplied 48px font size, 47.52px line height, 24px top margin, 25px bottom margin, and 680px maximum width as the reference measurements.
- Remove conflicting headline overrides and the separate oversized italic sizing. Match wrapping and spacing to the supplied screenshot, keeping the first phrase on its own line.
- Treat the 48px measurements as the inspected-size reference, not proof of the larger screenshot’s desktop font size. Check the result at your current 695px view and on wider screens.
- Scope the new fonts to this headline so the rest of the app remains unchanged.

## Floating signal
- Make the illustration more compact while preserving readable labels and its tilted white-card appearance in the light theme.
- Match the reference’s broad, soft lavender shadow behind the upper-right side and subtle shadow beneath the card, using theme-aware shadow tokens.
- Refine the waveform proportions and place “Known device” above-right and “Low risk detected” below-right, without overlap.
- Keep restrained floating and waveform motion, with reduced-motion support. Retain the sample-data disclosure.

## Technical details and verification
- Update font loading in the root document head and headline/signal presentation styles only; adjust presentation markup only where necessary.
- Verify both fonts load and inspect the rendered headline’s font, size, weight, and line height.
- Compare screenshots at 695px, desktop, and mobile widths; check wrapping, shadows, label positions, all three themes, and horizontal overflow.
- No changes to webhook connection, history, forms, or results.
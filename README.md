# Sentinel Capstone

Design a stunning, premium web application called Sentinel AI, an intelligent security analysis platform. The design should feel like a beautifully crafted modern SaaS startup, not a stereotypical cybersecurity tool.

Visual direction: Think Linear meets Apple, with editorial typography, generous whitespace, soft rounded cards, delicate shadows, subtle gradients, refined micro-animations, and beautiful data visualizations. Make it elegant, calm, modern, and instantly impressive to judges. Avoid excessive neon, hacker aesthetics, terminal screens, glowing green text, and overly technical visuals.

Themes: Include three fully working themes accessible through a beautiful toggle: Dark (charcoal and muted lavender), Light (clean white and soft grey), and Warm Beige (cream, sand, and deep brown). Persist the selected theme.

Build the complete page:

Navigation: Minimal logo, Overview, Analyze, History, connection indicator, and theme switcher.

Hero: “Security intelligence, made effortless.” Add a short subtitle and a beautiful primary button labelled “Start an Analysis.”

Overview: Four elegant metric cards for Events Analysed, Threats Detected, High-Risk Cases, and System Status. Clearly distinguish sample data from live data.

Analysis workspace: A clean, easy-to-use form for username, source IP, country, previous country, event type, failed attempts, privilege, response time, ASN, hour, day of week, login success, and device type. Use attractive dropdowns, sensible defaults, validation, and helpful labels.

Quick-start examples: Beautiful selectable presets for Brute-Force Attempt, Suspicious Admin Login, Location Anomaly, Repeated Login Failures, and Normal Login. An “Use Example” action should populate every relevant field. All values must remain editable, and users can submit entirely new events.

Analysis experience: A polished loading state with a subtle animated progress indicator. Submit the form to my configurable n8n webhook and display the actual returned results.

Results: Present the classification, probability, confidence, risk score, evidence, AI-generated explanation, recommended actions, and simulated remediation in clear, human-readable cards. Use restrained colors and tasteful charts, not an intimidating SOC interface.

History: A searchable table of previous analyses with timestamps, usernames, classifications, risk levels, and status. Save demo history in browser storage.

Footer: Minimal branding and workflow connection status.

Functionality: Build using React, TypeScript, and Tailwind CSS. Connect to n8n through a configurable environment variable for the webhook URL. Send submitted values as JSON using POST, handle loading/errors/timeouts, and map the real response into the results interface. Never fabricate live results or claim that simulated remediation actually changed anything. Keep credentials out of frontend code.

Finishing touch: Make every section feel intentionally designed, with smooth scrolling, tasteful transitions, responsive layouts, consistent spacing, and excellent empty states. The first impression should be beautiful and memorable, while the actual analysis workflow remains fully functional. Deliver the complete working application, not just a landing page or static mockup.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sentinel-capstone.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cbb7d091-6bac-56a3-a8e3-6889fcbb0e57).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

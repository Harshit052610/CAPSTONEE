# Sentinel AI workflow connection

Add `N8N_WEBHOOK_URL` in Lovable Cloud secrets. Use the active workflow's production HTTPS webhook URL, never a `VITE_` variable. If the webhook uses bearer authentication, add `N8N_WEBHOOK_TOKEN`. Neither value is exposed to the browser. Publish after adding or changing secrets to update the published app.

Sentinel sends a JSON POST with these fields:

```json
{
  "username": "alex.morgan",
  "source_ip": "192.0.2.24",
  "country": "United States",
  "previous_country": "United States",
  "event_type": "Login",
  "failed_attempts": 0,
  "privilege": "User",
  "response_time": 240,
  "asn": 15169,
  "hour": 10,
  "day_of_week": "Monday",
  "login_success": true,
  "device_type": "Desktop"
}
```

Configure n8n to return JSON when analysis completes, rather than only acknowledging that execution started. The expected response contains `classification` and optional `probability`, `confidence`, `risk_score`, `risk_level`, `evidence` (strings), `explanation`, `recommended_actions` (strings), and `simulated_remediation` (strings). Probability and confidence accept fractions from 0–1, percentages from 0–100, or percentage strings. Risk score uses 0–100. A single object, a one-item array, or wrappers named `json`, `data`, `result`, or `analysis` are accepted.

Missing fields are shown as not provided, never fabricated. Requests time out after 45 seconds. Remediation is a local preview only; no remediation commands are sent to n8n. History and theme are stored only in the current browser. This public demonstration app permits visitors to submit validated events to the configured workflow; put authenticated access in place before connecting a sensitive production workflow.
import { z } from 'zod';

export const eventSchema = z.object({
  username: z.string().trim().min(1, 'Enter a username').max(100),
  source_ip: z.string().ip({ message: 'Enter a valid IP address' }),
  country: z.string().trim().min(2).max(80),
  previous_country: z.string().trim().min(2).max(80),
  event_type: z.enum(['Login', 'Password Reset', 'Privilege Change', 'Data Access']),
  failed_attempts: z.coerce.number().int().min(0).max(10000),
  privilege: z.enum(['User', 'Admin', 'Super Admin']),
  response_time: z.coerce.number().min(0).max(300000),
  asn: z.coerce.number().int().min(0).max(4294967295),
  hour: z.coerce.number().int().min(0).max(23),
  day_of_week: z.enum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
  login_success: z.boolean(),
  device_type: z.enum(['Desktop', 'Mobile', 'Tablet', 'Unknown']),
});
export type SecurityEvent = z.infer<typeof eventSchema>;
export const defaultEvent: SecurityEvent = { username: 'alex.morgan', source_ip: '192.0.2.24', country: 'United States', previous_country: 'United States', event_type: 'Login', failed_attempts: 0, privilege: 'User', response_time: 240, asn: 15169, hour: 10, day_of_week: 'Monday', login_success: true, device_type: 'Desktop' };
export const presets = [
  { name: 'Brute-Force Attempt', description: 'Multiple attempts. One account.', kind: 'danger', event: { ...defaultEvent, username: 'james.wilson', source_ip: '203.0.113.42', country: 'Russia', previous_country: 'United States', failed_attempts: 28, response_time: 85, asn: 9009, hour: 3, login_success: false, device_type: 'Unknown' } },
  { name: 'Suspicious Admin Login', description: 'Elevated access, unusual context.', kind: 'warning', event: { ...defaultEvent, username: 'admin.sarah', source_ip: '198.51.100.18', country: 'Germany', privilege: 'Admin', hour: 2, day_of_week: 'Sunday', asn: 24940, failed_attempts: 3 } },
  { name: 'Location Anomaly', description: 'A login from somewhere new.', kind: 'brand', event: { ...defaultEvent, username: 'emma.chen', source_ip: '203.0.113.86', country: 'Singapore', previous_country: 'United Kingdom', hour: 23, asn: 13335, device_type: 'Mobile' } },
  { name: 'Repeated Login Failures', description: 'A pattern worth a closer look.', kind: 'warning', event: { ...defaultEvent, username: 'oliver.lee', failed_attempts: 12, login_success: false, response_time: 120, hour: 21 } },
  { name: 'Normal Login', description: 'Familiar device. Expected behavior.', kind: 'success', event: { ...defaultEvent } },
] as const;

export type AnalysisResult = { classification: string; probability: number | null; confidence: number | null; riskScore: number | null; riskLevel: string; evidence: string[]; explanation: string | null; actions: string[]; remediation: string[] };
const obj = (v: unknown): Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v) ? v as Record<string, unknown> : {};
const text = (v: unknown): string | null => typeof v === 'string' && v.trim() ? v.trim() : null;
const list = (v: unknown): string[] => Array.isArray(v) ? v.map(x => text(x) ?? text(obj(x)['description']) ?? text(obj(x)['action']) ?? text(obj(x)['reason'])).filter((x): x is string => x !== null) : text(v) ? [String(v)] : [];
function percentage(v: unknown, fractional: boolean) { if (v === null || v === undefined || v === '') return null; const n = typeof v === 'string' ? Number(v.replace('%', '')) : Number(v); if (!Number.isFinite(n) || n < 0) return null; const p = fractional && n <= 1 && !(typeof v === 'string' && v.includes('%')) ? n * 100 : n; return p <= 100 ? Math.round(p * 10) / 10 : null; }
export function normalizeResult(raw: unknown): AnalysisResult {
  let r = obj(Array.isArray(raw) ? raw[0] : raw);
  for (const key of ['json', 'data', 'result', 'analysis']) if (Object.keys(obj(r[key])).length) r = obj(r[key]);
  const classification = text(r['classification']) ?? text(r['prediction']) ?? text(r['label']) ?? text(r['threat_type']);
  if (!classification) throw new Error('The workflow response is missing a classification. Check the n8n response format.');
  return { classification, probability: percentage(r['probability'] ?? r['threat_probability'], true), confidence: percentage(r['confidence'] ?? r['confidence_score'], true), riskScore: percentage(r['risk_score'] ?? r['riskScore'], false), riskLevel: text(r['risk_level']) ?? text(r['riskLevel']) ?? 'Not provided', evidence: list(r['evidence'] ?? r['indicators']), explanation: text(r['explanation']) ?? text(r['ai_explanation']) ?? text(r['ai_generated_explanation']) ?? text(r['summary']), actions: list(r['recommended_actions'] ?? r['recommendations'] ?? r['actions']), remediation: list(r['simulated_remediation'] ?? r['remediation']) };
}
export type HistoryEntry = { id: string; timestamp: string; username: string; result: AnalysisResult; sample: boolean; status: string };
export const sampleHistory: HistoryEntry[] = [
  { id: 'sample-1', timestamp: '2026-10-14T10:42:00Z', username: 'james.wilson', sample: true, status: 'Reviewed', result: { classification: 'Brute-force attempt', probability: 98.2, confidence: 96.8, riskScore: 92, riskLevel: 'High', evidence: ['28 failed login attempts in a short window', 'Login from an unfamiliar country', 'Unrecognized device at 03:00'], explanation: 'This sample event combines repeated failed logins with an unfamiliar location and device. Together, these signals suggest an automated attempt to access the account.', actions: ['Review the source IP and recent account activity', 'Require multi-factor authentication', 'Consider temporarily restricting sign-in attempts'], remediation: ['Temporarily restrict the source IP', 'Flag the account for review'] } },
  { id: 'sample-2', timestamp: '2026-10-14T10:36:00Z', username: 'emma.chen', sample: true, status: 'Reviewed', result: { classification: 'Location anomaly', probability: 82, confidence: 89, riskScore: 64, riskLevel: 'Medium', evidence: ['New country detected'], explanation: 'This sample login originates from a country different from the previous login. Confirm whether travel or a VPN explains the change.', actions: ['Confirm the login with the account owner'], remediation: ['Request an additional identity check'] } },
  { id: 'sample-3', timestamp: '2026-10-14T10:28:00Z', username: 'alex.morgan', sample: true, status: 'Reviewed', result: { classification: 'Normal login', probability: 2, confidence: 99, riskScore: 4, riskLevel: 'Low', evidence: ['Expected location and device', 'No failed attempts'], explanation: 'This sample event matches expected login behavior.', actions: ['Continue routine monitoring'], remediation: [] } },
];
export const historySchema = z.array(z.object({ id: z.string(), timestamp: z.string(), username: z.string(), sample: z.boolean(), status: z.string(), result: z.object({ classification: z.string(), probability: z.number().nullable(), confidence: z.number().nullable(), riskScore: z.number().nullable(), riskLevel: z.string(), evidence: z.array(z.string()), explanation: z.string().nullable(), actions: z.array(z.string()), remediation: z.array(z.string()) }) })).max(100);
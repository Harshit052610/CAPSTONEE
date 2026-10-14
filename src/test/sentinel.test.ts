import { describe, expect, it } from 'vitest';
import { defaultEvent, eventSchema, normalizeResult, presets } from '@/lib/sentinel';
describe('Sentinel event validation', () => {
  it('validates all five complete editable presets', () => { expect(presets).toHaveLength(5); for (const preset of presets) expect(eventSchema.safeParse(preset.event).success).toBe(true); });
  it('accepts an entirely new event', () => { expect(eventSchema.parse({ ...defaultEvent, username: 'a.new.person', source_ip: '2001:db8::1' }).username).toBe('a.new.person'); });
  it('rejects invalid IP addresses and out-of-range event hours', () => { expect(eventSchema.safeParse({ ...defaultEvent, source_ip: 'not-an-ip' }).success).toBe(false); expect(eventSchema.safeParse({ ...defaultEvent, hour: 24 }).success).toBe(false); });
});
describe('Actual workflow response mapping', () => {
  it('maps returned risk, explanation, evidence and actions', () => { expect(normalizeResult([{ json: { classification: 'Brute force', probability: .92, confidence: '98%', risk_score: 87, risk_level: 'High', evidence: ['28 failures'], ai_explanation: 'Repeated attempts', recommended_actions: ['Review account'], simulated_remediation: ['Block IP preview'] } }])).toEqual({ classification: 'Brute force', probability: 92, confidence: 98, riskScore: 87, riskLevel: 'High', evidence: ['28 failures'], explanation: 'Repeated attempts', actions: ['Review account'], remediation: ['Block IP preview'] }); });
  it('never fabricates missing live result values', () => { const r = normalizeResult({ classification: 'Normal' }); expect(r.riskScore).toBeNull(); expect(r.confidence).toBeNull(); expect(r.probability).toBeNull(); expect(r.explanation).toBeNull(); expect(r.actions).toEqual([]); expect(r.remediation).toEqual([]); });
  it('rejects acknowledgments that do not contain an actual classification', () => { expect(() => normalizeResult({ message: 'Workflow was started' })).toThrow(); });
  it('rejects out-of-range scores rather than manufacturing a valid score', () => { expect(normalizeResult({ classification: 'Test', risk_score: 900, probability: -1 }).riskScore).toBeNull(); expect(normalizeResult({ classification: 'Test', probability: -1 }).probability).toBeNull(); });
});
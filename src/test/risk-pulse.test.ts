import { describe, expect, it } from 'vitest';
import { riskPulse } from '@/lib/risk-pulse';
import { sampleHistory, type HistoryEntry } from '@/lib/sentinel';

function entry(timestamp: string, score: number | null): HistoryEntry {
  const base = sampleHistory[0];
  if (!base) throw new Error('Missing fixture');
  return { ...base, timestamp, result: { ...base.result, riskScore: score } };
}
describe('30-day history risk pulse', () => {
  it('includes today and the preceding 29 days only', () => {
    const result = riskPulse([entry('2026-09-15T12:00:00Z', 99), entry('2026-09-16T00:00:00Z', 20), entry('2026-10-15T23:59:59Z', 60), entry('2026-10-16T00:00:00Z', 99)], new Date('2026-10-15T12:00:00Z'));
    expect(result.points).toHaveLength(30);
    expect(result.points[0]).toBe(20);
    expect(result.points[29]).toBe(60);
    expect(result.activeDays).toBe(2);
  });
  it('averages daily scores, ignoring missing scores', () => {
    const result = riskPulse([entry('2026-10-14T10:00:00Z', 20), entry('2026-10-14T11:00:00Z', 60), entry('2026-10-14T12:00:00Z', null), entry('2026-10-15T10:00:00Z', 80)], new Date('2026-10-15T12:00:00Z'));
    expect(result.average).toBe(60);
    expect(result.highest).toBe(80);
    expect(result.activeDays).toBe(2);
  });
});
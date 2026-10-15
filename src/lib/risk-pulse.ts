import type { HistoryEntry } from './sentinel';

export function riskPulse(history: HistoryEntry[], now = new Date()) {
  const end = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const start = end - 29 * 86_400_000;
  const buckets = Array.from({ length: 30 }, () => [] as number[]);
  for (const entry of history) {
    const time = Date.parse(entry.timestamp);
    const score = entry.result.riskScore;
    if (!Number.isFinite(time) || score === null || time < start || time >= end + 86_400_000) continue;
    const index = Math.floor((time - start) / 86_400_000);
    buckets[index]?.push(score);
  }
  const points = buckets.map(values => values.length ? values.reduce((a, b) => a + b, 0) / values.length : null);
  const active = points.filter((value): value is number => value !== null);
  return { points, average: active.length ? Math.round(active.reduce((a, b) => a + b, 0) / active.length) : null, highest: active.length ? Math.round(Math.max(...active)) : null, activeDays: active.length, start: new Date(start) };
}
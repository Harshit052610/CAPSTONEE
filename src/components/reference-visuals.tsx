import { Activity, ArrowDown, ArrowRight, BarChart3, Check, Gauge, Info, ShieldAlert, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { riskPulse } from '@/lib/risk-pulse';
import type { HistoryEntry } from '@/lib/sentinel';

export function ReferenceHero() {
  return <section className="hero">
    <div className="hero-copy">
      <div className="eyebrow hero-eyebrow">Security intelligence, made effortless.</div>
      <h1 data-testid="hero-title">See the signal<br /><em>before it becomes noise.</em></h1>
      <p>Sentinel AI turns raw security events into clear, human decisions<br className="desktop-break" /> — so your team can move quickly, without the guesswork.</p>
      <div className="hero-actions"><Button onClick={() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' })}>Start an Analysis<ArrowRight /></Button><Button variant="ghost" onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>Explore overview<ArrowDown /></Button></div>
    </div>
    <div className="signal-art" aria-label="Illustrative security signal, sample data">
      <div className="signal-grid" />
      <div className="signal-card"><div className="signal-card-heading"><span className="signal-icon"><Activity size={19} /></span><span>Live signal</span><span className="signal-now">now</span></div><svg viewBox="0 0 240 80" className="signal-wave" aria-hidden="true">{[15, 30, 50, 26, 67, 38, 30, 46, 35, 14].map((h, i) => <rect key={i} x={i * 18 + 5} y={(80 - h) / 2} width="13" height={h} rx="4" />)}</svg><div className="signal-value"><strong>99.2%</strong><span>clarity index</span></div></div>
      <div className="signal-tag known-device"><Check size={13} />Known device</div><div className="signal-tag low-risk"><span className="status-dot connected" />Low risk detected</div><span className="signal-sample">Illustrative signal · sample data</span>
    </div>
  </section>;
}

export function ReferenceMetrics({ rows, sample, configured }: { rows: HistoryEntry[]; sample: boolean; configured: boolean }) {
  const threats = rows.filter(h => !['normal login', 'normal', 'benign', 'safe'].includes(h.result.classification.toLowerCase())).length;
  const high = rows.filter(h => ['high', 'critical'].includes(h.result.riskLevel.toLowerCase())).length;
  return <div className="metric-grid">{[
    { label: 'Events analysed', value: sample ? '12,840' : rows.length.toLocaleString(), note: sample ? '+18.6% this month' : 'Completed real analyses', icon: BarChart3, tone: 'primary' },
    { label: 'Threats detected', value: sample ? '284' : threats, note: sample ? '2.2% of all events' : 'Events flagged for review', icon: ShieldAlert, tone: 'danger' },
    { label: 'High-risk cases', value: sample ? '18' : high, note: sample ? '4 need attention' : 'High or critical risk', icon: Gauge, tone: 'warning' },
    { label: 'System status', value: configured ? 'Ready' : 'Not connected', note: configured ? 'Workflow configured' : 'Awaiting your n8n workflow', icon: Wifi, tone: 'success' },
  ].map((metric, i) => <div className="metric" key={metric.label}><div className={`metric-icon tone-${metric.tone}`}><metric.icon size={21} /></div><div className="metric-header">{metric.label}{sample && i < 3 && <span className="sample-pill">Sample</span>}</div><div className={`metric-number ${i === 3 ? 'metric-status' : ''}`}>{metric.value}</div><div className="metric-bottom">{metric.note}</div></div>)}</div>;
}

export function RiskPulse({ history }: { history: HistoryEntry[] }) {
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => { setToday(new Date()); }, []);
  const pulse = riskPulse(today ? history : [], today ?? new Date('2000-01-30T00:00:00Z'));
  const coordinates = pulse.points.map((score, i) => `${30 + i * 24},${190 - (score ?? 0) * 1.5}`).join(' ');
  return <div className="risk-pulse"><div className="pulse-heading"><div><div className="eyebrow">Risk pulse</div><h3>A quieter view of risk.</h3><p>Average daily risk score from the last 30 days of this browser’s history.</p></div><span className="sample-pill">30 days</span></div><div className="pulse-body"><div className="pulse-chart"><svg viewBox="0 0 756 220" role="img" aria-label="Average daily risk scores over 30 days"><line x1="30" x2="726" y1="50" y2="50" className="pulse-guide" /><line x1="30" x2="726" y1="120" y2="120" className="pulse-guide" /><line x1="30" x2="726" y1="190" y2="190" className="pulse-guide" /><polygon points={`30,190 ${coordinates} 726,190`} className="pulse-area" /><polyline points={coordinates} className="pulse-line" />{pulse.points.map((score, i) => score !== null && <circle key={i} cx={30 + i * 24} cy={190 - score * 1.5} r="4.5" className="pulse-point"><title>{`${Math.round(score)} / 100`}</title></circle>)}</svg><div className="pulse-axis"><span>{pulse.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}</span><span>Today</span></div></div><div className="pulse-stats"><div><span>Average risk</span><strong>{pulse.average ?? '—'}<small>/100</small></strong></div><div><span>Highest day</span><strong>{pulse.highest ?? '—'}<small>/100</small></strong></div><div><span>Active days</span><strong>{pulse.activeDays}<small>/30</small></strong></div></div></div><div className="pulse-note"><Info size={14} />{history.some(h => h.sample) ? 'Demo entries are included; real analyses are added here automatically.' : 'Based on analyses saved in this browser.'}</div></div>;
}
import { createFileRoute } from '@tanstack/react-router';
import { SentinelApp } from '@/components/sentinel-app';
export const Route = createFileRoute('/analyze')({
  head: () => ({ meta: [{ title: 'Analyze an Event — Sentinel AI' }, { name: 'description', content: 'Analyse login events with Sentinel AI. Get real workflow insights, risk assessments, and recommended actions.' }, { property: 'og:title', content: 'Analyze an Event — Sentinel AI' }, { property: 'og:description', content: 'Turn a security event into clear, actionable intelligence.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Analyze,
});
function Analyze() { return <SentinelApp view="analyze" />; }
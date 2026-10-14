import { createFileRoute } from '@tanstack/react-router';
import { SentinelApp } from '@/components/sentinel-app';
export const Route = createFileRoute('/history')({
  head: () => ({ meta: [{ title: 'Analysis History — Sentinel AI' }, { name: 'description', content: 'Review and search previous Sentinel AI security analyses, classifications, and risk levels.' }, { property: 'og:title', content: 'Analysis History — Sentinel AI' }, { property: 'og:description', content: 'Every event has a story. Review your security analysis history.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: History,
});
function History() { return <SentinelApp view="history" />; }
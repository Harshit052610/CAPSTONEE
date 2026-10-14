import { createFileRoute } from "@tanstack/react-router";
import { SentinelApp } from '@/components/sentinel-app';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: 'Sentinel AI — Security intelligence, made effortless' }, { name: 'description', content: 'Understand security events with clear risk assessments, AI explanations, and actionable insights.' }, { property: 'og:title', content: 'Sentinel AI — Security intelligence, made effortless' }, { property: 'og:description', content: 'A calmer, clearer perspective on security. Analyse events and understand your next move.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Index,
});
function Index() { return <SentinelApp />; }

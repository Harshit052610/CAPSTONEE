import { createServerFn } from '@tanstack/react-start';
import { eventSchema, normalizeResult } from './sentinel';

export const workflowStatus = createServerFn({ method: 'GET' }).handler(async () => ({ configured: Boolean(process.env['N8N_WEBHOOK_URL']) }));
export const analyzeEvent = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env['N8N_WEBHOOK_URL'];
    if (!url) return { ok: false as const, error: 'Your workflow is not connected yet. Add N8N_WEBHOOK_URL in Cloud secrets, then try again.' };
    try {
      const target = new URL(url);
      if (target.protocol !== 'https:' || target.username || target.password) return { ok: false as const, error: 'The workflow requires a valid HTTPS webhook URL.' };
      const headers: Record<string, string> = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
      const token = process.env['N8N_WEBHOOK_TOKEN'];
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const response = await fetch(target, { method: 'POST', headers, body: JSON.stringify(data), signal: AbortSignal.timeout(45000), redirect: 'error' });
      if (!response.ok) return { ok: false as const, error: `The workflow returned an error (${response.status}). Check your n8n execution and try again.` };
      const body = await response.text();
      if (body.length > 1000000) return { ok: false as const, error: 'The workflow response is too large.' };
      let raw: unknown;
      try { raw = JSON.parse(body); } catch { return { ok: false as const, error: 'The workflow did not return valid JSON. Check the n8n response step.' }; }
      try { return { ok: true as const, result: normalizeResult(raw) }; } catch { return { ok: false as const, error: 'The workflow response is missing a classification. Check the n8n response format.' }; }
    } catch (error) {
      return { ok: false as const, error: error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name) ? 'The workflow took longer than 45 seconds. Check n8n and try again.' : 'Could not reach your workflow. Check that it is active and try again.' };
    }
  });
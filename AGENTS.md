<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Sentinel shares one workspace across overview, analyze, and history routes so event and response behavior stays consistent.
- Validate event payloads with the shared schema in both the browser and server handler; normalize only actual webhook response fields, leaving missing values empty.
- Send n8n requests through a public server function with a server-only HTTPS destination and optional bearer secret; browser code never receives webhook credentials.
- Theme preferences and capped analysis history use browser storage, as explicitly requested; do not move that history into Cloud without a new requirement.
- Reference-led hero, metrics, and risk chart are separate presentation components; the chart derives daily averages from stored history to avoid fabricated live analytics.

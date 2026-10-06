# WA Archive

Local-first browser extension for archiving and analyzing conversations visible to the authenticated user in WhatsApp Web.

> Early development version. WA Archive is independent and is not affiliated with WhatsApp or Meta.

## Current MVP
Detects the open WhatsApp Web conversation, parses messages currently rendered in the DOM, stores normalized records in IndexedDB, deduplicates them with deterministic IDs, and exposes a local dashboard. Continuous capture can be explicitly enabled for the currently open conversation so newly rendered messages are archived as they appear.

## Development
```bash
npm install
npm run build
```
Load `dist/` as an unpacked Chromium extension and reload WhatsApp Web.

## Roadmap
- User-controlled progressive historical loading
- Resilient selector adapters
- Replies, reactions and media metadata
- Conversation analytics and response-time metrics
- Group connection/network graph
- Search and timeline
- CSV, TXT and HTML exports
- Firefox packaging

## Privacy
Conversation content is processed and stored locally. The MVP has no server-side conversation storage or telemetry endpoint.

## License
MIT

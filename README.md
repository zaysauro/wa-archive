# WA Archive

Extensão local-first para arquivar e analisar conversas do WhatsApp Web.

## Fontes de dados

- Captura das mensagens renderizadas no WhatsApp Web.
- Importação local de exportações oficiais do WhatsApp em TXT.
- Importação local de ZIPs contendo TXT; mídia é ignorada.

TXT, ZIP e conteúdo das conversas **não são enviados para servidor, API, telemetria ou analytics externo**. O processamento e o IndexedDB ficam no navegador.

## Desenvolvimento

```bash
npm install
npm test
npm run build
```

Carregue a pasta `dist` como extensão descompactada no Chrome.

## Teste manual de importação

Use `fixtures/demo-chat.txt`. Ele contém somente mensagens fictícias entre Bruno e Cliente Teste, distribuídas em vários dias, horários e sessões.

## Arquitetura

- Manifest V3 + TypeScript + Vite.
- Content script coleta o DOM do WhatsApp e envia mensagens ao service worker.
- Service worker persiste captura Web no IndexedDB da extensão.
- Dashboard e importador TXT/ZIP usam o mesmo IndexedDB.
- Fingerprint determinístico evita duplicação entre importações repetidas e captura Web quando conversa, timestamp, remetente e texto normalizados coincidem.
- Sessões usam intervalo configurável `SESSION_GAP_MS`, atualmente 4 horas.

## Privacidade

Sem backend. Sem upload de conversas. Sem código remoto. Sem analytics externo.

Projeto independente, não afiliado ao WhatsApp ou à Meta.

MIT License.

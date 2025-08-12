# Santan v1 — WhatsApp Bot

## Quick start

1. Install Node.js (v18+) and `ffmpeg`.
2. Copy `config.example.json` to `config.json` and update values.
3. `npm install`
4. `npm start` — scan the QR code printed in terminal.

Commands example:
- `!help`
- `!santan`
- `!setcmd hello Hi there!` then `!hello`
- `!play <query>`
- `!meme`, `!quote`, `!joke`, `!weather <city>`, `!translate <lang> <text>`

**Security:** do NOT commit the `session/` folder or `config.json` with secrets.

See `commands/` for available commands.

# Raspi Info Hub

Real-time dashboard for Raspberry Pi. Pure client-side — no backend, no build tools. Just open `index.html`.

<img width="1676" height="886" alt="image" src="https://github.com/user-attachments/assets/f9f35d71-ea99-4d21-8eea-a8e0e6adbf36" />

## Panels

| Panel | Source |
|-------|--------|
| Crypto (BTC, ETH) — EMA, RSI, signals | CoinGecko |
| BTC Charts — 7D + 90D with EMA overlay | CoinGecko |
| Stocks — 1D/30D/90D change | Yahoo Finance |
| Market Sentiment — Crypto F&G + VIX | alternative.me / Yahoo |
| Weather + 7-day forecast | wttr.in / Open-Meteo |
| Traffic — live or estimated | TomTom (optional) |
| News — BBC, Reuters, Guardian, CZ | RSS via rss2json |
| Trending — CZ / World / US / HN | Google Trends / HN API |
| Site Monitor — ping + latency sparklines | fetch |
| Forex — EUR, USD, GBP vs CZK | frankfurter.app |
| Quote — stoic/pragmatic, rotates daily | Built-in (60+) |

All free APIs. No keys required (TomTom optional for live traffic).

## Setup

```bash
open index.html
# or
python3 -m http.server 8080
```

## Config

Edit `js/my-config.js` — overrides defaults in `config.js`. No restart needed, just refresh.

For live traffic, get a free key at [developer.tomtom.com](https://developer.tomtom.com) (2500 req/day):
```js
CONFIG.traffic.tomtomKey = 'your-key';
```

## Structure

```
index.html        # Dashboard (CSS inline)
js/config.js      # Defaults
js/my-config.js   # Your overrides
js/utils.js       # Helpers
js/app.js         # Main app
```

## License

MIT

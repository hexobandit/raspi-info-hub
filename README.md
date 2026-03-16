# Raspi Info Hub

A real-time info dashboard designed for a Raspberry Pi with a hallway-mounted display. Pure client-side HTML/CSS/JS -- no backend, no build tools, no dependencies. Just open `index.html`.

Dark military-tracker-inspired aesthetic with JetBrains Mono, neon green accents, and Mission Control 3-column layout.

<img width="1676" height="886" alt="image" src="https://github.com/user-attachments/assets/f9f35d71-ea99-4d21-8eea-a8e0e6adbf36" />


## Features

| Panel | Data | API |
|-------|------|-----|
| Crypto Markets | BTC, ETH prices with EMA12/26, RSI(14), overbought/oversold signals | CoinGecko (free) |
| Stocks | S&P 500, NASDAQ, Amazon | Yahoo Finance via allorigins proxy |
| Charts | 7D / 30D / 90D / 180D with EMA overlay, click to toggle | CoinGecko market_chart |
| Fear & Greed | Crypto sentiment index with gauge bar | alternative.me |
| Weather | Current conditions + tomorrow hero | wttr.in (free) |
| 7-Day Forecast | Daily forecast with icons and temp ranges | Open-Meteo (free) |
| Traffic | Drive time to destination with rush-hour detection | Haversine estimate (TomTom optional) |
| News Feed | BBC, Reuters, Guardian, Novinky.cz -- auto-scrolling | RSS via rss2json.com |
| Trending Now | Google Trends CZ / Worldwide / US + Hacker News top stories, click to toggle | Google Trends RSS, HN Firebase API |
| Site Monitor | Ping your websites, latency sparklines, UP/DOWN status | fetch no-cors + timing |
| Forex Rates | EUR/CZK, USD/CZK, GBP/CZK, EUR/USD | frankfurter.app (ECB data) |
| Daily Quote | Stoic/pragmatic quotes, changes daily | Built-in (60+ curated) |
| Clock | Large clock with date | Local |
| System Bar | Network status, session uptime, heap usage, UTC timestamp | Browser APIs |

All APIs are free and require no API keys.

## Quick Start

```bash
# Option 1: Just open the file
open index.html

# Option 2: Serve locally
python3 -m http.server 8080
# then open http://localhost:8080
```

## Raspberry Pi Kiosk Mode

```bash
# Clone the repo
git clone https://github.com/yourusername/raspi-info-hub.git
cd raspi-info-hub

# Launch Chromium in kiosk mode
chromium-browser --kiosk --noerrdialogs --disable-infobars \
  --disable-session-crashed-bubble --disable-translate \
  file://$(pwd)/index.html
```

To auto-start on boot, add to `~/.config/lxsession/LXDE-pi/autostart`:
```
@chromium-browser --kiosk --noerrdialogs --disable-infobars file:///home/pi/raspi-info-hub/index.html
```

Disable screen blanking:
```bash
sudo raspi-config  # Display Options > Screen Blanking > Off
```

## Configuration

Edit **`js/my-config.js`** to customize. No server required -- it loads via a `<script>` tag.

```js
// Change the hub name
CONFIG.name = 'KRUPKY INFO HUB';

// Your location
CONFIG.location.city = 'Dolni Brezany';
CONFIG.location.lat = 49.9625;
CONFIG.location.lon = 14.4594;

// Traffic destination
CONFIG.traffic.destName = 'Chodov OC';
CONFIG.traffic.destLat = 50.0313;
CONFIG.traffic.destLon = 14.4942;

// Crypto to track (CoinGecko IDs)
CONFIG.crypto = ['bitcoin', 'ethereum'];

// Stocks (Yahoo Finance symbols)
CONFIG.stocks = [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'QQQ', name: 'NASDAQ' },
    { symbol: 'AMZN', name: 'Amazon' }
];

// Sites to ping
CONFIG.sites = [
    'https://mysite.com',
    'https://anothersite.com'
];

// News feeds (RSS URLs)
CONFIG.newsFeeds = [
    { name: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: 'CZ', url: 'https://www.novinky.cz/rss' }
];
```

See `js/config.js` for all available defaults and refresh intervals.

## Project Structure

```
raspi-info-hub/
  index.html          # Dashboard (all CSS inline)
  js/
    config.js          # Default configuration
    my-config.js       # Your overrides (edit this)
    utils.js           # Formatting, math, SVG helpers
    app.js             # Main app -- fetch, render, boot
  hub.config.md        # Alternative markdown config (optional)
```

## Live Traffic (Optional)

For real-time traffic data instead of estimates, get a free TomTom API key (2500 req/day):

1. Sign up at [developer.tomtom.com](https://developer.tomtom.com)
2. Add to `js/my-config.js`:
   ```js
   CONFIG.traffic.tomtomKey = 'your-key-here';
   ```

## License

MIT

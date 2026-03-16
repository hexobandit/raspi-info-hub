# Hub Configuration

Edit this file to customize your dashboard. The app parses this on startup.
Lines starting with `#` are comments/headings and are ignored.
Format: `key: value` — one per line within each section.

---

## General

name: KRUPKY INFO HUB
theme: green
<!-- options: green | amber | cyberpunk -->

---

## Location

city: Dolni Brezany
country: CZ
lat: 49.9625
lon: 14.4594

---

## Traffic

origin_lat: 49.9625
origin_lon: 14.4594
dest_lat: 50.0313
dest_lon: 14.4942
dest_name: Chodov OC
<!-- Optional: get a free key at developer.tomtom.com for live traffic -->
tomtom_key:

---

## Crypto

<!-- CoinGecko IDs — find yours at coingecko.com/en/api -->
coins: bitcoin, ethereum

---

## Stocks

<!-- Yahoo Finance symbols -->
<!-- Format: SYMBOL | Display Name -->
stock: SPY | S&P 500
stock: QQQ | NASDAQ
stock: AMZN | Amazon

---

## Sites to Monitor

<!-- Full URLs of sites to ping -->
site: https://military-aircraft-tracker.com
site: https://simplemermaid.com
site: https://udelejzahradu.cz
site: https://erikamcgregor.cz
site: https://hexobandit.com

---

## News Feeds

<!-- Format: LABEL | RSS Feed URL -->
feed: BBC | https://feeds.bbci.co.uk/news/world/rss.xml
feed: RTRS | https://feeds.reuters.com/reuters/worldNews
feed: GUAR | https://www.theguardian.com/world/rss
feed: CZ | https://www.novinky.cz/rss

---

## Weather

<!-- Leave blank to use wttr.in (free, no key needed) -->
<!-- Or get a free key at openweathermap.org -->
openweather_key:

---

## Refresh Intervals (seconds)

clock: 1
markets: 120
weather: 600
news: 300
quotes: 86400
pinger: 60
fear: 600
system: 5
traffic: 300

---

## Quotes Style

<!-- options: stoic | mixed | tech | eastern -->
quote_style: stoic

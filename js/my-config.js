// ============================================================
//  YOUR CONFIG — Edit this file to customize the dashboard
//  This overrides the defaults in config.js
//  Just change values below and refresh the browser
// ============================================================

CONFIG.name = 'KRUPKY INFO HUB';

// -- Location --
CONFIG.location.city = 'Dolni Brezany';
CONFIG.location.country = 'CZ';
CONFIG.location.lat = 49.9625;
CONFIG.location.lon = 14.4594;

// -- Traffic --
CONFIG.traffic.originLat = 49.9625;
CONFIG.traffic.originLon = 14.4594;
CONFIG.traffic.destLat = 50.0313;
CONFIG.traffic.destLon = 14.4942;
CONFIG.traffic.destName = 'Chodov OC';
// Optional: get a free key at developer.tomtom.com for live traffic
// CONFIG.traffic.tomtomKey = 'your-key-here';

// -- Crypto (CoinGecko IDs) --
CONFIG.crypto = ['bitcoin', 'ethereum'];

// -- Stocks (Yahoo Finance symbols via allorigins proxy) --
CONFIG.stocks = [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'QQQ', name: 'NASDAQ' },
    { symbol: 'AMZN', name: 'Amazon' }
];

// -- Sites to Monitor --
CONFIG.sites = [
    'https://military-aircraft-tracker.com',
    'https://simplemermaid.com',
    'https://udelejzahradu.cz',
    'https://erikamcgregor.cz',
    'https://hexobandit.com'
];

// -- News Feeds (RSS via rss2json.com) --
CONFIG.newsFeeds = [
    { name: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
    { name: 'RTRS', url: 'https://feeds.reuters.com/reuters/worldNews' },
    { name: 'GUAR', url: 'https://www.theguardian.com/world/rss' },
    { name: 'CZ', url: 'https://www.novinky.cz/rss' }
];

// -- Refresh Intervals (milliseconds) --
// CONFIG.intervals.clock = 1000;
// CONFIG.intervals.markets = 120000;
// CONFIG.intervals.weather = 600000;
// CONFIG.intervals.news = 300000;
// CONFIG.intervals.pinger = 60000;

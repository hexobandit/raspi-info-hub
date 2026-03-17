// ============================================================
//  RASPI INFO HUB — Configuration
//  Edit these values to customize your dashboard
// ============================================================

const CONFIG = {
    // -- Location --
    location: {
        city: 'Your City',
        country: 'XX',
        lat: 0,
        lon: 0
    },

    // -- Traffic --
    traffic: {
        originLat: 0,
        originLon: 0,
        destLat: 0,
        destLon: 0,
        destName: 'Destination'
        // tomtomKey: 'YOUR-TOMTOM-API-KEY'  // get free key at developer.tomtom.com
    },

    // -- Markets --
    // CoinGecko IDs for crypto
    crypto: ['bitcoin', 'ethereum'],
    // Yahoo Finance symbols (fetched via a free proxy)
    stocks: [
        { symbol: 'SPY', name: 'S&P 500' },
        { symbol: 'QQQ', name: 'NASDAQ' },
        { symbol: 'AMZN', name: 'Amazon' }
    ],

    // -- Website Pinger --
    sites: [
        'https://military-aircraft-tracker.com',
        'https://simplemermaid.com',
        'https://your-site.com'
    ],

    // -- News --
    // Using RSS feeds via rss2json (free, no key needed for basic use)
    newsFeeds: [
        { name: 'BBC', url: 'https://feeds.bbci.co.uk/news/world/rss.xml' },
        { name: 'RTRS', url: 'https://feeds.reuters.com/reuters/worldNews' },
        { name: 'GUAR', url: 'https://www.theguardian.com/world/rss' },
        { name: 'CZ', url: 'https://www.novinky.cz/rss' }
    ],

    // -- Weather --
    // OpenWeatherMap free tier (get key at openweathermap.org — free)
    // Leave empty to use wttr.in (no key needed)
    openWeatherApiKey: '',

    // -- Refresh intervals (ms) --
    intervals: {
        clock: 1000,
        markets: 120000,    // 2 min
        weather: 600000,    // 10 min
        news: 300000,       // 5 min
        quotes: 86400000,   // daily
        pinger: 60000,      // 1 min
        fear: 600000,       // 10 min
        system: 5000,       // 5 sec
        traffic: 120000     // 2 min
    },

    // -- Visual --
    crt: {
        scanlines: true,
        glow: true,
        flicker: true,
        backgroundColor: '#0a0e14',
        primaryColor: '#00ff41',       // matrix green
        secondaryColor: '#00b330',
        dimColor: '#006b1d',
        accentColor: '#ff6600',        // orange for warnings
        dangerColor: '#ff0040',        // red for alerts
        headerColor: '#00ffff',        // cyan for headers
        mutedColor: '#3a5a3a',
        borderColor: '#00ff4140',
        fontSize: 14,
        fontFamily: 'Courier New, monospace'
    }
};

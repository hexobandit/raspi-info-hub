// ============================================================
//  Markdown Config Parser
//  Reads hub.config.md and builds CONFIG object
// ============================================================

async function loadConfig(path = 'hub.config.md') {
    try {
        const res = await fetch(path, { cache: 'no-store' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const text = await res.text();
        // Verify it's actually markdown, not an HTML error page
        if (text.trim().startsWith('<!') || text.trim().startsWith('<html')) {
            throw new Error('Got HTML instead of markdown — server may be returning 404 page');
        }
        return parseConfigMd(text);
    } catch (e) {
        console.warn('Could not load hub.config.md, using defaults:', e.message);
        return null;
    }
}

function parseConfigMd(text) {
    const lines = text.split('\n');
    let section = '';
    const raw = {};

    for (let line of lines) {
        line = line.trim();

        // skip empty, comments (html-style), and horizontal rules
        if (!line || line.startsWith('<!--') || line === '---') continue;

        // section headers: ## Something
        if (line.startsWith('## ')) {
            section = line.replace(/^#+\s*/, '').toLowerCase()
                .replace(/[^a-z0-9]+/g, '_').replace(/_+$/, '').replace(/^_+/, '');
            if (!raw[section]) raw[section] = [];
            continue;
        }

        // skip top-level heading
        if (line.startsWith('#')) continue;

        // key: value lines
        const match = line.match(/^([^:]+):\s*(.*)$/);
        if (match && section) {
            raw[section].push({ key: match[1].trim(), value: match[2].trim() });
        }
    }

    return buildConfig(raw);
}

function buildConfig(raw) {
    const cfg = {};

    // General
    const general = raw.general || [];
    cfg.name = findVal(general, 'name') || 'RASPI INFO HUB';
    cfg.theme = findVal(general, 'theme') || 'green';

    // Location
    const loc = raw.location || [];
    cfg.location = {
        city: findVal(loc, 'city') || 'Dolni Brezany',
        country: findVal(loc, 'country') || 'CZ',
        lat: parseFloat(findVal(loc, 'lat')) || 49.9625,
        lon: parseFloat(findVal(loc, 'lon')) || 14.4594
    };

    // Traffic
    const traf = raw.traffic || [];
    cfg.traffic = {
        originLat: parseFloat(findVal(traf, 'origin_lat')) || cfg.location.lat,
        originLon: parseFloat(findVal(traf, 'origin_lon')) || cfg.location.lon,
        destLat: parseFloat(findVal(traf, 'dest_lat')) || 50.0313,
        destLon: parseFloat(findVal(traf, 'dest_lon')) || 14.4942,
        destName: findVal(traf, 'dest_name') || 'Destination',
        tomtomKey: findVal(traf, 'tomtom_key') || ''
    };

    // Crypto
    const crypto = raw.crypto || [];
    const coinsStr = findVal(crypto, 'coins') || 'bitcoin, ethereum';
    cfg.crypto = coinsStr.split(',').map(s => s.trim()).filter(Boolean);

    // Stocks (multi-value)
    const stocks = raw.stocks || [];
    cfg.stocks = stocks
        .filter(e => e.key === 'stock')
        .map(e => {
            const parts = e.value.split('|').map(s => s.trim());
            return { symbol: parts[0], name: parts[1] || parts[0] };
        });
    if (cfg.stocks.length === 0) {
        cfg.stocks = [
            { symbol: '^GSPC', name: 'S&P 500' },
            { symbol: '^IXIC', name: 'NASDAQ' },
            { symbol: 'AMZN', name: 'Amazon' }
        ];
    }

    // Sites
    const sites = raw.sites_to_monitor || [];
    cfg.sites = sites
        .filter(e => e.key === 'site')
        .map(e => e.value)
        .filter(Boolean);

    // News feeds
    const feeds = raw.news_feeds || [];
    cfg.newsFeeds = feeds
        .filter(e => e.key === 'feed')
        .map(e => {
            const parts = e.value.split('|').map(s => s.trim());
            return { name: parts[0], url: parts[1] };
        })
        .filter(f => f.url);

    // Weather
    const weather = raw.weather || [];
    cfg.openWeatherApiKey = findVal(weather, 'openweather_key') || '';

    // Intervals — section becomes "refresh_intervals_seconds" after sanitization
    const iv = raw.refresh_intervals_seconds || raw.refresh_intervals || [];
    cfg.intervals = {};
    const defaults = { clock:1, markets:120, weather:600, news:300, quotes:86400, pinger:60, fear:600, system:5, traffic:300 };
    for (const [k, v] of Object.entries(defaults)) {
        const fromConfig = findVal(iv, k);
        cfg.intervals[k] = (fromConfig ? parseInt(fromConfig) : v) * 1000;
    }

    // Quotes
    const quotes = raw.quotes_style || [];
    cfg.quoteStyle = findVal(quotes, 'quote_style') || 'stoic';

    return cfg;
}

function findVal(entries, key) {
    const entry = entries.find(e => e.key === key);
    return entry ? entry.value : null;
}

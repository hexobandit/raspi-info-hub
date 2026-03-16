// ============================================================
//  RASPI INFO HUB — Utility Functions
//  Formatting, math, fetch helpers, SVG generation
// ============================================================

function formatNumber(n, decimals = 2) {
    if (n == null || isNaN(n)) return '---';
    if (Math.abs(n) >= 1e12) return (n / 1e12).toFixed(1) + 'T';
    if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    return n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

function formatPrice(n) {
    if (n == null || isNaN(n)) return '---';
    if (n >= 1000) return '$' + formatNumber(n, 0);
    if (n >= 1) return '$' + formatNumber(n, 2);
    return '$' + n.toFixed(4);
}

function pctChange(current, previous) {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
}

function pctString(pct) {
    if (pct == null || isNaN(pct)) return '---';
    const sign = pct >= 0 ? '+' : '';
    return sign + pct.toFixed(2) + '%';
}

function pctColorClass(pct) {
    if (pct > 0) return 'green';
    if (pct < 0) return 'red';
    return 'muted';
}

function pctArrow(pct) {
    if (pct > 0) return '\u25B2'; // up triangle
    if (pct < 0) return '\u25BC'; // down triangle
    return '\u25C6'; // diamond
}

// Calculate EMA (Exponential Moving Average)
function calcEMA(data, period) {
    if (!data || data.length < period) return [];
    const k = 2 / (period + 1);
    const ema = [data.slice(0, period).reduce((a, b) => a + b, 0) / period];
    for (let i = period; i < data.length; i++) {
        ema.push(data[i] * k + ema[ema.length - 1] * (1 - k));
    }
    return ema;
}

// Calculate RSI (Relative Strength Index)
function calcRSI(data, period = 14) {
    if (!data || data.length < period + 1) return null;
    let gains = 0, losses = 0;
    for (let i = 1; i <= period; i++) {
        const diff = data[i] - data[i - 1];
        if (diff > 0) gains += diff;
        else losses -= diff;
    }
    let avgGain = gains / period;
    let avgLoss = losses / period;
    for (let i = period + 1; i < data.length; i++) {
        const diff = data[i] - data[i - 1];
        avgGain = (avgGain * (period - 1) + (diff > 0 ? diff : 0)) / period;
        avgLoss = (avgLoss * (period - 1) + (diff < 0 ? -diff : 0)) / period;
    }
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}

// RSI label + CSS class
function rsiInfo(rsi) {
    if (rsi == null) return { label: '---', cls: 'pill-neutral' };
    if (rsi >= 70) return { label: 'OVERBOUGHT', cls: 'pill-overbought' };
    if (rsi <= 30) return { label: 'OVERSOLD', cls: 'pill-oversold' };
    return { label: 'NEUTRAL', cls: 'pill-neutral' };
}

// EMA trend signal
function emaSignal(ema12, ema26) {
    if (!ema12 || !ema26 || !ema12.length || !ema26.length) {
        return { label: '---', cls: 'pill-neutral' };
    }
    const e12 = ema12[ema12.length - 1];
    const e26 = ema26[ema26.length - 1];
    if (e12 > e26) return { label: 'BULLISH', cls: 'pill-bullish' };
    return { label: 'BEARISH', cls: 'pill-bearish' };
}

// Truncate with ellipsis
function truncate(str, len) {
    if (!str) return '';
    if (str.length <= len) return str;
    return str.substring(0, len - 3) + '...';
}

// Time ago string
function timeAgo(date) {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return seconds + 's';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
    return Math.floor(seconds / 86400) + 'd';
}

// Safe fetch with timeout
async function safeFetch(url, timeout = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timer);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        clearTimeout(timer);
        console.warn('Fetch failed:', url, e.message);
        return null;
    }
}

// Decode HTML entities
function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Haversine distance (km)
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Weather icon from description
function weatherIcon(desc) {
    const d = (desc || '').toLowerCase();
    if (d.includes('sun') || d.includes('clear')) return '\u2600'; // sun
    if (d.includes('cloud') && d.includes('part')) return '\u26C5'; // partly cloudy
    if (d.includes('cloud') || d.includes('overcast')) return '\u2601'; // cloud
    if (d.includes('rain') || d.includes('drizzle') || d.includes('shower')) return '\uD83C\uDF27'; // rain
    if (d.includes('thunder') || d.includes('storm')) return '\u26C8'; // storm
    if (d.includes('snow') || d.includes('blizzard')) return '\u2744'; // snow
    if (d.includes('fog') || d.includes('mist') || d.includes('haz')) return '\uD83C\uDF2B'; // fog
    return '\u25CB'; // circle
}

// Generate SVG sparkline path string from data array
// Returns { linePath, areaPath } strings for <path d="...">
function sparklinePaths(data, width, height, padding = 1) {
    if (!data || data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const w = width - padding * 2;
    const h = height - padding * 2;
    const step = w / (data.length - 1);

    const points = data.map((v, i) => {
        const x = padding + i * step;
        const y = padding + h - ((v - min) / range) * h;
        return { x: x.toFixed(1), y: y.toFixed(1) };
    });

    const linePath = points.map((p, i) =>
        (i === 0 ? 'M' : 'L') + p.x + ',' + p.y
    ).join(' ');

    const areaPath = linePath +
        ` L${points[points.length - 1].x},${height} L${points[0].x},${height} Z`;

    return { linePath, areaPath };
}

// Build complete SVG sparkline element HTML
function buildSparklineSVG(data, width, height, color, fillOpacity = 0.08) {
    const paths = sparklinePaths(data, width, height);
    if (!paths) return '';

    return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" width="100%" height="100%">
        <path d="${paths.areaPath}" fill="${color}" opacity="${fillOpacity}"/>
        <path d="${paths.linePath}" fill="none" stroke="${color}" stroke-width="1.5"/>
    </svg>`;
}

// Fear & Greed color
function fngColor(value) {
    if (value <= 25) return '#ff3355'; // extreme fear
    if (value <= 45) return '#ff8800'; // fear
    if (value <= 55) return '#8a9a8a'; // neutral
    if (value <= 75) return '#00ff41'; // greed
    return '#ff8800';                  // extreme greed
}

// Fear & Greed label + pill class
function fngInfo(value, label) {
    const l = (label || '').toUpperCase();
    if (l.includes('EXTREME') && l.includes('FEAR')) return { label: 'EXTREME FEAR', cls: 'pill-extreme-fear' };
    if (l.includes('FEAR')) return { label: 'FEAR', cls: 'pill-fear' };
    if (l.includes('EXTREME') && l.includes('GREED')) return { label: 'EXTREME GREED', cls: 'pill-extreme-greed' };
    if (l.includes('GREED')) return { label: 'GREED', cls: 'pill-greed' };
    return { label: 'NEUTRAL', cls: 'pill-neutral' };
}

// Format session uptime
function formatUptime(ms) {
    const totalS = Math.floor(ms / 1000);
    const h = Math.floor(totalS / 3600);
    const m = Math.floor((totalS % 3600) / 60);
    if (h > 0) return h + 'h ' + m + 'm';
    return m + 'm';
}

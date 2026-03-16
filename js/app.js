// ============================================================
//  RASPI INFO HUB — Main Application
//  Pure DOM-based dashboard. No Canvas. No backend.
// ============================================================

(function () {
    'use strict';

    // ── State ───────────────────────────────────────────────
    const state = {
        crypto: {},
        stocks: {},
        weather: null,
        news: [],
        newsIndex: 0,
        lastNewsScroll: 0,
        fng: null,
        sites: {},
        traffic: null,
        quote: null,
        startTime: Date.now(),
        chartRange: '7d', // '7d', '30d', '90d', '180d' — toggled by user
        trendingCZ: [],
        trendingWORLD: [],
        trendingUS: [],
        trendingHN: []
    };

    // Quotes bank — stoic, pragmatic, no fluff
    const QUOTES = [
        { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
        { text: "The obstacle is the way.", author: "Marcus Aurelius" },
        { text: "He who has a why to live can bear almost any how.", author: "Nietzsche" },
        { text: "Waste no more time arguing about what a good man should be. Be one.", author: "Marcus Aurelius" },
        { text: "Difficulty is what wakes up the genius.", author: "Nassim Taleb" },
        { text: "A man is about as big as the things that make him angry.", author: "Churchill" },
        { text: "You could leave life right now. Let that determine what you do and say and think.", author: "Marcus Aurelius" },
        { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
        { text: "It is not that we have a short time to live, but that we waste a great deal of it.", author: "Seneca" },
        { text: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius" },
        { text: "No man is free who is not master of himself.", author: "Epictetus" },
        { text: "The world breaks everyone, and afterward, some are strong at the broken places.", author: "Hemingway" },
        { text: "What stands in the way becomes the way.", author: "Marcus Aurelius" },
        { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
        { text: "Think lightly of yourself and deeply of the world.", author: "Miyamoto Musashi" },
        { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
        { text: "Strong minds discuss ideas, average minds discuss events, weak minds discuss people.", author: "Socrates" },
        { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Edison" },
        { text: "Ships are safe in harbor, but that's not what ships are built for.", author: "John A. Shedd" },
        { text: "Memento mori.", author: "Stoic Proverb" },
        { text: "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.", author: "Marcus Aurelius" },
        { text: "Discipline equals freedom.", author: "Jocko Willink" },
        { text: "Amor fati \u2014 love your fate.", author: "Nietzsche" },
        { text: "The impediment to action advances action. What stands in the way becomes the way.", author: "Marcus Aurelius" },
        { text: "Do not pray for easy lives. Pray to be stronger men.", author: "JFK" },
        { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
        { text: "Knowing is not enough, we must apply. Willing is not enough, we must do.", author: "Bruce Lee" },
        { text: "Man cannot remake himself without suffering, for he is both the marble and the sculptor.", author: "Alexis Carrel" },
        { text: "The more you sweat in training, the less you bleed in combat.", author: "Richard Marcinko" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { text: "He who fears death will never do anything worthy of a living man.", author: "Seneca" },
        { text: "Under pressure, you don't rise to the occasion \u2014 you sink to the level of your training.", author: "Navy SEALs" },
        { text: "The things you own end up owning you.", author: "Chuck Palahniuk" },
        { text: "You have power over your mind, not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
        { text: "If it is not right, do not do it. If it is not true, do not say it.", author: "Marcus Aurelius" },
        { text: "Be tolerant with others and strict with yourself.", author: "Marcus Aurelius" },
        { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius" },
        { text: "Never let the future disturb you. You will meet it with the same weapons of reason.", author: "Marcus Aurelius" },
        { text: "Somewhere, someone busier than you is training right now.", author: "Unknown" },
        { text: "Hard choices, easy life. Easy choices, hard life.", author: "Jerzy Gregorek" },
        { text: "No one saves us but ourselves. No one can and no one may. We ourselves must walk the path.", author: "Buddha" },
        { text: "Comfort is the enemy of achievement.", author: "Farrah Gray" },
        { text: "The mind is everything. What you think you become.", author: "Buddha" },
        { text: "Stay hungry. Stay foolish.", author: "Stewart Brand" },
        { text: "Don't explain your philosophy. Embody it.", author: "Epictetus" },
        { text: "If you're going through hell, keep going.", author: "Churchill" },
        { text: "Death smiles at us all. All we can do is smile back.", author: "Marcus Aurelius" },
        { text: "There is nothing permanent except change.", author: "Heraclitus" },
        { text: "Courage is not the absence of fear, but the judgment that something else is more important.", author: "Ambrose Redmoon" },
        { text: "Argue with idiots, and you become an idiot.", author: "Paul Graham" },
        { text: "A gem cannot be polished without friction, nor a man perfected without trials.", author: "Seneca" },
        { text: "Only the dead have seen the end of war.", author: "Plato" },
        { text: "In the middle of difficulty lies opportunity.", author: "Einstein" },
        { text: "You are what you repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
        { text: "What we do in life echoes in eternity.", author: "Marcus Aurelius" },
        { text: "It is a rough road that leads to the heights of greatness.", author: "Seneca" },
        { text: "We are more often frightened than hurt; and we suffer more in imagination than in reality.", author: "Seneca" },
        { text: "Adapt what is useful, reject what is useless, and add what is specifically your own.", author: "Bruce Lee" },
        { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius" },
        { text: "Per aspera ad astra \u2014 through hardship to the stars.", author: "Latin Proverb" },
        { text: "Make your ego porous. Will is of little importance, complaining is nothing, fame is nothing.", author: "Rilke" },
        { text: "The only real failure in life is not to be true to the best one knows.", author: "Buddha" },
        { text: "Every next level of your life will demand a different you.", author: "Leonardo DiCaprio" },
    ];

    // ── DOM Helpers ─────────────────────────────────────────
    const $ = id => document.getElementById(id);

    function setHTML(id, html) {
        const el = $(id);
        if (el) el.innerHTML = html;
    }

    function setText(id, text) {
        const el = $(id);
        if (el) el.textContent = text;
    }

    // ── Clock ───────────────────────────────────────────────
    function updateClock() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        const date = now.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).toUpperCase();

        setText('header-clock', time);
        setText('header-date', date);

        // Bottom bar timestamp
        const ts = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        setText('bottom-ts', ts);
    }

    // ── System / Status Bar ─────────────────────────────────
    function updateSystemBar() {
        // Online status
        const netEl = $('net-status');
        if (netEl) {
            netEl.textContent = navigator.onLine ? 'ONLINE' : 'OFFLINE';
            netEl.className = navigator.onLine ? 'online' : 'offline';
        }

        // Connection info
        const netInfo = $('net-info');
        if (netInfo && navigator.connection) {
            const c = navigator.connection;
            netInfo.textContent = `${(c.effectiveType || '').toUpperCase()} \u2193${c.downlink || '--'}Mbps`;
        }

        // Session uptime
        setText('session-uptime', formatUptime(Date.now() - state.startTime));

        // Heap (Chrome only)
        const heapEl = $('heap-info');
        if (heapEl && performance.memory) {
            const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(0);
            const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(0);
            heapEl.textContent = 'HEAP: ' + used + '/' + total + 'MB';
        }
    }

    // ── Crypto ──────────────────────────────────────────────
    function bootStatus(id, ok) {
        const el = $(id);
        if (el) {
            el.textContent = ok ? 'OK' : 'FAIL';
            el.className = ok ? 'boot-ok' : 'boot-loading';
        }
    }

    // Small delay to avoid CoinGecko rate limits
    function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

    async function fetchCrypto() {
        const ids = CONFIG.crypto.join(',');
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`;
        const data = await safeFetch(url, 15000);
        if (data && Array.isArray(data)) {
            data.forEach(coin => {
                state.crypto[coin.id] = {
                    name: coin.symbol.toUpperCase(),
                    price: coin.current_price,
                    change24h: coin.price_change_percentage_24h,
                    high24h: coin.high_24h,
                    low24h: coin.low_24h,
                    marketCap: coin.market_cap,
                    volume: coin.total_volume,
                    sparkline: coin.sparkline_in_7d?.price || [],
                    lastUpdate: Date.now()
                };
            });
        }

        // Fetch market_chart for detailed price history (180 days)
        // This gives ~180 daily points (or hourly for shorter ranges)
        for (const id of CONFIG.crypto) {
            await delay(1500); // avoid CoinGecko rate limit
            const chart = await safeFetch(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=180`,
                15000
            );
            if (chart?.prices && Array.isArray(chart.prices) && state.crypto[id]) {
                // chart.prices = [[timestamp, price], ...]
                const allPrices = chart.prices.map(p => p[1]);
                state.crypto[id].prices180d = allPrices;

                // Compute EMA/RSI on the full dataset
                state.crypto[id].ema12 = calcEMA(allPrices, 12);
                state.crypto[id].ema26 = calcEMA(allPrices, 26);
                state.crypto[id].rsi = calcRSI(allPrices, 14);
            }
        }

        bootStatus('boot-crypto', Object.keys(state.crypto).length > 0);
        renderCrypto();
        renderCharts();
    }

    function renderCrypto() {
        let html = '';
        for (const id of CONFIG.crypto) {
            const d = state.crypto[id];
            if (!d) {
                html += `<div class="crypto-row"><span class="loading-text">${id}: connecting...</span></div>`;
                continue;
            }

            const arrow = pctArrow(d.change24h);
            const colorCls = pctColorClass(d.change24h);
            const sig = emaSignal(d.ema12, d.ema26);
            const rsi = d.rsi != null ? d.rsi : null;
            const rsiI = rsiInfo(rsi);
            const rsiPct = rsi != null ? Math.min(100, Math.max(0, rsi)) : 0;
            const rsiBarColor = rsi >= 70 ? '#ff3355' : rsi <= 30 ? '#ff8800' : '#00ff41';

            html += `<div class="crypto-row">
                <div class="crypto-header">
                    <span class="crypto-symbol">${d.name}</span>
                    <span class="crypto-price">${formatPrice(d.price)}</span>
                    <span class="crypto-change ${colorCls}">${arrow} ${pctString(d.change24h)}</span>
                    <span class="pill ${sig.cls}" style="margin-left:auto;">${sig.label}</span>
                </div>
                <div class="crypto-details">
                    <span>24H: ${formatPrice(d.low24h)} \u2013 ${formatPrice(d.high24h)}</span>
                    <span>MCap: ${formatNumber(d.marketCap, 0)}</span>
                </div>`;

            if (d.ema12?.length && d.ema26?.length) {
                const e12 = d.ema12[d.ema12.length - 1];
                const e26 = d.ema26[d.ema26.length - 1];
                html += `<div class="crypto-ema-row">
                    <span>EMA12: ${formatPrice(e12)}</span>
                    <span>EMA26: ${formatPrice(e26)}</span>
                </div>`;
            }

            if (rsi != null) {
                html += `<div class="crypto-rsi-row">
                    <span style="color:var(--secondary);min-width:75px;">RSI(14): ${rsi.toFixed(1)}</span>
                    <div class="gauge">
                        <div class="gauge-fill" style="width:${rsiPct}%;background:${rsiBarColor};"></div>
                        <div class="gauge-markers" style="left:30%;"></div>
                        <div class="gauge-markers" style="left:70%;"></div>
                    </div>
                    <span class="pill ${rsiI.cls}">${rsiI.label}</span>
                </div>`;
            }

            html += `</div>`;
        }
        setHTML('crypto-content', html);
    }

    function renderHeroTomorrow() {
        const d = state.weather;
        if (!d) return;
        const icon = weatherIcon(d.tomorrowDesc);
        setText('hero-tomorrow-desc', icon + ' TOMORROW');
        setText('hero-tomorrow-temp', d.tomorrowLow + '°/' + d.tomorrowHigh + '°');
        setText('hero-tomorrow-sub', d.tomorrowDesc);
    }

    function renderCharts() {
        const rangeLabel = state.chartRange.toUpperCase();
        setText('charts-title', 'CHARTS — ' + rangeLabel);

        let html = '';
        for (const id of CONFIG.crypto) {
            const d = state.crypto[id];
            if (!d) continue;

            // Pick data source based on range
            let priceData, ema12Data, ema26Data;
            const rangeDays = parseInt(state.chartRange) || 7;

            if (state.chartRange === '7d') {
                // Use sparkline (hourly, ~168 points) for 7d
                priceData = d.sparkline?.slice(-168);
            } else {
                // Use market_chart prices (daily, ~180 points for 180d)
                const src = d.prices180d;
                if (!src || src.length < 10) {
                    // Fallback to sparkline if no long-term data
                    priceData = d.sparkline?.slice(-168);
                } else {
                    // Slice proportionally: prices180d covers 180 days
                    const sliceCount = Math.max(20, Math.round(src.length * (rangeDays / 180)));
                    priceData = src.slice(-sliceCount);
                }
            }

            if (!priceData || priceData.length < 5) continue;

            // Compute EMAs on the visible slice
            ema12Data = calcEMA(priceData, Math.min(12, Math.floor(priceData.length / 3)));
            ema26Data = calcEMA(priceData, Math.min(26, Math.floor(priceData.length / 2)));
            const ema100Data = priceData.length >= 100
                ? calcEMA(priceData, 100)
                : (priceData.length >= 50 ? calcEMA(priceData, Math.floor(priceData.length * 0.6)) : []);

            const color = d.change24h >= 0 ? '#00ff41' : '#ff3355';
            const W = 800, H = 200;
            const svg = buildChartWithEMA(priceData, ema12Data, ema26Data, ema100Data, W, H, color);

            // EMA values for legend
            const e12val = d.ema12?.length ? formatPrice(d.ema12[d.ema12.length - 1]) : '';
            const e26val = d.ema26?.length ? formatPrice(d.ema26[d.ema26.length - 1]) : '';
            const e100val = ema100Data?.length ? formatPrice(ema100Data[ema100Data.length - 1]) : '';
            let legend = '';
            if (e12val) {
                legend = `<span class="muted" style="font-size:9px;margin-left:8px;">` +
                    `<span style="color:#00cccc;">― EMA12 ${e12val}</span> &nbsp; ` +
                    `<span style="color:#ff8800;">― EMA26 ${e26val}</span>` +
                    (e100val ? ` &nbsp; <span style="color:#cc66ff;">― EMA100 ${e100val}</span>` : '') +
                    `</span>`;
            }

            html += `<div class="chart-label">${d.name}/USD ${rangeLabel} ${legend}</div>
                <div class="chart-container">${svg}</div>`;
        }
        if (!html) html = '<div class="loading-text">No chart data yet</div>';
        setHTML('charts-content', html);
    }

    // Build chart SVG with price line + EMA overlays
    function buildChartWithEMA(priceData, ema12, ema26, ema100, width, height, priceColor) {
        const pricePaths = sparklinePaths(priceData, width, height, 2);
        if (!pricePaths) return '';

        const min = Math.min(...priceData);
        const max = Math.max(...priceData);
        const range = max - min || 1;
        const padding = 2;
        const w = width - padding * 2;
        const h = height - padding * 2;
        const step = w / (priceData.length - 1);

        // Helper: build SVG path for an EMA array
        function emaPath(emaData, color) {
            if (!emaData || emaData.length < 2) return '';
            const offset = priceData.length - emaData.length;
            let started = false;
            const pts = [];
            for (let i = 0; i < emaData.length; i++) {
                const x = (padding + (i + offset) * step).toFixed(1);
                const y = (padding + h - ((emaData[i] - min) / range) * h).toFixed(1);
                pts.push((started ? 'L' : 'M') + x + ',' + y);
                started = true;
            }
            if (pts.length < 2) return '';
            return `<path d="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="1" stroke-dasharray="3,2" opacity="0.7"/>`;
        }

        return `<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" width="100%" height="100%">
            <path d="${pricePaths.areaPath}" fill="${priceColor}" opacity="0.06"/>
            <path d="${pricePaths.linePath}" fill="none" stroke="${priceColor}" stroke-width="1.5"/>
            ${emaPath(ema12, '#00cccc')}
            ${emaPath(ema26, '#ff8800')}
            ${emaPath(ema100, '#cc66ff')}
        </svg>`;
    }

    // ── Stocks ──────────────────────────────────────────────
    // Uses allorigins.win CORS proxy to reach Yahoo Finance
    async function fetchStocks() {
        for (const stock of CONFIG.stocks) {
            try {
                const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(stock.symbol)}?range=5d&interval=1d`;
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`;
                const data = await safeFetch(proxyUrl, 15000);
                if (data?.chart?.result?.[0]) {
                    const result = data.chart.result[0];
                    const meta = result.meta;
                    const closes = result.indicators?.quote?.[0]?.close?.filter(v => v != null) || [];
                    const price = meta.regularMarketPrice;
                    const prevClose = meta.chartPreviousClose || meta.previousClose;
                    const change = prevClose ? pctChange(price, prevClose) : 0;

                    state.stocks[stock.symbol] = {
                        name: stock.name,
                        price: price,
                        change: change,
                        closes: closes,
                        lastUpdate: Date.now()
                    };
                }
            } catch (e) {
                console.warn('Stock fetch failed:', stock.symbol, e);
            }
        }
        bootStatus('boot-stocks', Object.keys(state.stocks).length > 0);
        renderStocks();
    }

    function renderStocks() {
        let html = '';
        let hasAny = false;

        for (const stock of CONFIG.stocks) {
            const d = state.stocks[stock.symbol];
            if (!d) {
                html += `<div class="stock-row">
                    <span class="stock-name">${stock.name}</span>
                    <span class="loading-text">unavailable</span>
                    <span></span>
                </div>`;
                continue;
            }
            hasAny = true;
            const arrow = pctArrow(d.change);
            const colorCls = pctColorClass(d.change);
            html += `<div class="stock-row">
                <span class="stock-name">${d.name}</span>
                <span class="stock-price">${formatPrice(d.price)}</span>
                <span class="stock-change ${colorCls}">${arrow} ${pctString(d.change)}</span>
            </div>`;
        }

        if (!html) html = '<div class="loading-text">Market data unavailable (CORS)</div>';
        setHTML('stocks-content', html);
    }

    // ── Forex Rates ─────────────────────────────────────────
    // Uses frankfurter.app (free, no key, CORS-friendly, ECB data)
    async function fetchForex() {
        const url = 'https://api.frankfurter.app/latest?from=CZK&to=EUR,USD,GBP';
        const data = await safeFetch(url, 10000);
        if (data?.rates) {
            // API returns how much 1 CZK buys — we want the inverse (how many CZK per 1 unit)
            state.forex = {};
            for (const [currency, rate] of Object.entries(data.rates)) {
                state.forex[currency] = { rate: (1 / rate), pair: currency + '/CZK' };
            }
        }

        // Also get EUR/USD
        const eurusd = await safeFetch('https://api.frankfurter.app/latest?from=EUR&to=USD', 10000);
        if (eurusd?.rates?.USD) {
            state.forex['EUR/USD'] = { rate: eurusd.rates.USD, pair: 'EUR/USD' };
        }

        renderForex();
    }

    function renderForex() {
        if (!state.forex || Object.keys(state.forex).length === 0) {
            setHTML('forex-content', '<div class="loading-text">Loading rates...</div>');
            return;
        }

        const order = ['EUR', 'USD', 'GBP', 'EUR/USD'];
        let html = '';

        for (const key of order) {
            const d = state.forex[key];
            if (!d) continue;
            const decimals = key === 'EUR/USD' ? 4 : 2;
            html += `<div class="forex-row">
                <span class="forex-pair">${d.pair}</span>
                <span class="forex-rate">${d.rate.toFixed(decimals)}</span>
            </div>`;
        }

        if (html) {
            html += `<div style="font-size:9px;color:var(--muted);margin-top:6px;">Source: ECB via frankfurter.app</div>`;
        }
        setHTML('forex-content', html || '<div class="loading-text">Rates unavailable</div>');
    }

    // ── Weather ─────────────────────────────────────────────
    async function fetchWeather() {
        const loc = `${CONFIG.location.lat},${CONFIG.location.lon}`;
        const url = `https://wttr.in/${loc}?format=j1`;
        const data = await safeFetch(url, 15000);
        if (data) {
            const current = data.current_condition?.[0];
            const today = data.weather?.[0];
            const tomorrow = data.weather?.[1];
            const dayAfter = data.weather?.[2];
            state.weather = {
                temp: current?.temp_C,
                feelsLike: current?.FeelsLikeC,
                desc: current?.weatherDesc?.[0]?.value || '',
                humidity: current?.humidity,
                windSpeed: current?.windspeedKmph,
                windDir: current?.winddir16Point,
                visibility: current?.visibility,
                pressure: current?.pressure,
                uvIndex: current?.uvIndex,
                cloudcover: current?.cloudcover,
                todayHigh: today?.maxtempC,
                todayLow: today?.mintempC,
                todayDesc: today?.hourly?.[4]?.weatherDesc?.[0]?.value || '',
                tomorrowHigh: tomorrow?.maxtempC,
                tomorrowLow: tomorrow?.mintempC,
                tomorrowDesc: tomorrow?.hourly?.[4]?.weatherDesc?.[0]?.value || '',
                dayAfterHigh: dayAfter?.maxtempC,
                dayAfterLow: dayAfter?.mintempC,
                dayAfterDesc: dayAfter?.hourly?.[4]?.weatherDesc?.[0]?.value || '',
                sunrise: today?.astronomy?.[0]?.sunrise,
                sunset: today?.astronomy?.[0]?.sunset,
                lastUpdate: Date.now()
            };
        }
        bootStatus('boot-weather', !!state.weather);
        renderWeatherHero();
        renderHeroTomorrow();
        renderWeatherExt();
    }

    function renderWeatherHero() {
        const d = state.weather;
        if (!d) return;

        const icon = weatherIcon(d.desc);
        setText('hero-weather-desc', icon + ' ' + d.desc.toUpperCase());
        setText('hero-weather-temp', d.temp + '\u00B0C');
        setText('hero-weather-sub', `Feels ${d.feelsLike}\u00B0C | Wind ${d.windSpeed}km/h ${d.windDir}`);
    }

    function renderWeatherExt() {
        const d = state.weather;
        if (!d) return;

        setHTML('weather-ext-content', `
            <div class="weather-grid">
                <div class="weather-stat">
                    <span class="weather-stat-label">Wind</span>
                    <span class="weather-stat-value">${d.windSpeed} km/h ${d.windDir}</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">Humidity</span>
                    <span class="weather-stat-value">${d.humidity}%</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">Pressure</span>
                    <span class="weather-stat-value">${d.pressure} hPa</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">UV Index</span>
                    <span class="weather-stat-value">${d.uvIndex}</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">Visibility</span>
                    <span class="weather-stat-value">${d.visibility} km</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">Cloud</span>
                    <span class="weather-stat-value">${d.cloudcover}%</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">Sunrise</span>
                    <span class="weather-stat-value">${d.sunrise || '--'}</span>
                </div>
                <div class="weather-stat">
                    <span class="weather-stat-label">Sunset</span>
                    <span class="weather-stat-value">${d.sunset || '--'}</span>
                </div>
            </div>
        `);
    }

    // Fetch 7-day forecast from Open-Meteo (free, no key, CORS-friendly)
    async function fetchForecast() {
        const lat = CONFIG.location.lat;
        const lon = CONFIG.location.lon;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
        const data = await safeFetch(url, 10000);
        if (data?.daily) {
            state.forecast = data.daily.time.map((date, i) => ({
                date: date,
                high: Math.round(data.daily.temperature_2m_max[i]),
                low: Math.round(data.daily.temperature_2m_min[i]),
                code: data.daily.weathercode[i]
            }));
        }
        renderForecast();
    }

    // WMO weather code to icon + description
    function wmoToWeather(code) {
        const map = {
            0: ['☀', 'Clear sky'],
            1: ['🌤', 'Mainly clear'], 2: ['⛅', 'Partly cloudy'], 3: ['☁', 'Overcast'],
            45: ['🌫', 'Foggy'], 48: ['🌫', 'Rime fog'],
            51: ['🌦', 'Light drizzle'], 53: ['🌦', 'Drizzle'], 55: ['🌧', 'Heavy drizzle'],
            61: ['🌧', 'Light rain'], 63: ['🌧', 'Rain'], 65: ['🌧', 'Heavy rain'],
            66: ['🌧', 'Freezing rain'], 67: ['🌧', 'Heavy freezing rain'],
            71: ['❄', 'Light snow'], 73: ['❄', 'Snow'], 75: ['❄', 'Heavy snow'],
            77: ['❄', 'Snow grains'],
            80: ['🌦', 'Light showers'], 81: ['🌧', 'Showers'], 82: ['🌧', 'Heavy showers'],
            85: ['❄', 'Snow showers'], 86: ['❄', 'Heavy snow showers'],
            95: ['⛈', 'Thunderstorm'], 96: ['⛈', 'Thunderstorm + hail'], 99: ['⛈', 'Thunderstorm + heavy hail']
        };
        return map[code] || ['◌', 'Unknown'];
    }

    function renderForecast() {
        if (!state.forecast || state.forecast.length === 0) {
            setHTML('forecast-content', '<div class="loading-text">Loading forecast...</div>');
            return;
        }

        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let html = '';

        for (let i = 0; i < Math.min(7, state.forecast.length); i++) {
            const f = state.forecast[i];
            const d = new Date(f.date);
            const [icon, desc] = wmoToWeather(f.code);
            const label = i === 0 ? 'TODAY' : dayNames[d.getDay()];

            html += `<div class="forecast-row">
                <span class="forecast-day">${label}</span>
                <span class="forecast-icon">${icon}</span>
                <span class="forecast-temps">${f.low}\u00B0 / ${f.high}\u00B0</span>
                <span class="forecast-desc">${desc}</span>
            </div>`;
        }
        setHTML('forecast-content', html);
    }

    // ── News ────────────────────────────────────────────────
    async function fetchNews() {
        state.news = [];
        for (const feed of CONFIG.newsFeeds) {
            const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
            const data = await safeFetch(url, 15000);
            if (data?.items) {
                const items = data.items.slice(0, 8).map(item => ({
                    tag: feed.name,
                    title: decodeHTML(item.title),
                    pubDate: item.pubDate,
                    link: item.link
                }));
                state.news.push(...items);
            }
        }
        bootStatus('boot-news', state.news.length > 0);
        renderNews();
    }

    function renderNews() {
        if (state.news.length === 0) {
            setHTML('news-content', '<div class="loading-text">No news available</div>');
            return;
        }

        // Auto-scroll: shift the visible window
        const maxVisible = 8;
        const now = Date.now();
        if (now - state.lastNewsScroll > 8000 && state.news.length > maxVisible) {
            state.newsIndex = (state.newsIndex + 1) % state.news.length;
            state.lastNewsScroll = now;
        }

        let html = '';
        for (let i = 0; i < maxVisible && i < state.news.length; i++) {
            const idx = (i + state.newsIndex) % state.news.length;
            const item = state.news[idx];
            const tagCls = item.tag === 'CZ' ? 'pill-tag-cz' : 'pill-tag-world';
            const age = timeAgo(item.pubDate);
            html += `<div class="news-item">
                <span class="pill pill-tag ${tagCls}">${item.tag}</span>
                <span class="news-text">${truncate(item.title, 95)}</span>
                <span class="news-time">${age}</span>
            </div>`;
        }
        setHTML('news-content', html);
    }

    // ── Quote ───────────────────────────────────────────────
    function loadQuote() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const dayOfYear = Math.floor((now - start) / 86400000);
        const idx = dayOfYear % QUOTES.length;
        state.quote = QUOTES[idx];
        renderQuote();
    }

    function renderQuote() {
        if (!state.quote) return;
        setText('quote-text', '\u201C' + state.quote.text + '\u201D');
        setText('quote-author', '\u2014 ' + state.quote.author);
    }

    // ── Fear & Greed ────────────────────────────────────────
    async function fetchFNG() {
        const url = 'https://api.alternative.me/fng/?limit=1';
        const data = await safeFetch(url, 10000);
        if (data?.data?.[0]) {
            const d = data.data[0];
            state.fng = {
                value: parseInt(d.value),
                label: d.value_classification,
                timestamp: d.timestamp * 1000
            };
        }
        bootStatus('boot-fng', !!state.fng);
        renderFNG();
    }

    function renderFNG() {
        if (!state.fng) return;
        const d = state.fng;
        const color = fngColor(d.value);
        const info = fngInfo(d.value, d.label);

        setHTML('fng-content', `
            <div class="fng-display">
                <span class="fng-value" style="color:${color};">${d.value}</span>
                <span class="pill ${info.cls}">${info.label}</span>
            </div>
            <div class="fng-gauge">
                <div class="fng-gauge-fill" style="width:${d.value}%;background:${color};"></div>
            </div>
            <div class="fng-scale">
                <span class="red">EXTREME FEAR</span>
                <span class="muted">NEUTRAL</span>
                <span class="orange">EXTREME GREED</span>
            </div>
        `);
    }

    // ── Site Monitor ────────────────────────────────────────
    async function fetchSites() {
        for (const site of CONFIG.sites) {
            const host = new URL(site).hostname;
            if (!state.sites[host]) {
                state.sites[host] = { history: [], status: 'PENDING', latency: null };
            }

            const start = performance.now();
            try {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), 8000);
                await fetch(site, {
                    mode: 'no-cors',
                    cache: 'no-store',
                    signal: controller.signal
                });
                clearTimeout(timer);
                const elapsed = Math.round(performance.now() - start);
                state.sites[host].status = 'UP';
                state.sites[host].latency = elapsed;
                state.sites[host].lastCheck = Date.now();
                state.sites[host].history.push(elapsed);
                if (state.sites[host].history.length > 60) {
                    state.sites[host].history.shift();
                }
            } catch (e) {
                state.sites[host].status = 'DOWN';
                state.sites[host].latency = null;
                state.sites[host].lastCheck = Date.now();
                state.sites[host].history.push(0);
                if (state.sites[host].history.length > 60) {
                    state.sites[host].history.shift();
                }
            }
        }
        bootStatus('boot-sites', Object.keys(state.sites).length > 0);
        renderSites();
    }

    function renderSites() {
        const hosts = Object.keys(state.sites);
        if (hosts.length === 0) {
            setHTML('sites-content', '<div class="loading-text">Pinging sites...</div>');
            return;
        }

        let html = '';
        for (const host of hosts) {
            const d = state.sites[host];
            const isUp = d.status === 'UP';
            const isPending = d.status === 'PENDING';
            const dotCls = isPending ? 'pending' : (isUp ? 'up' : 'down');
            const latStr = isUp ? d.latency + 'ms' : (isPending ? '...' : 'DOWN');
            const latCls = isUp ? 'green' : (isPending ? 'muted' : 'red');

            // Mini sparkline for latency history
            let sparklineHTML = '';
            if (d.history.length > 3) {
                const color = isUp ? '#00ff41' : '#ff3355';
                sparklineHTML = `<span class="site-sparkline">${buildSparklineSVG(d.history, 60, 16, color, 0.1)}</span>`;
            }

            html += `<div class="site-row">
                <span class="site-dot ${dotCls}"></span>
                <span class="site-name">${host}</span>
                ${sparklineHTML}
                <span class="site-latency ${latCls}">${latStr}</span>
            </div>`;
        }
        setHTML('sites-content', html);
    }

    // ── Traffic ─────────────────────────────────────────────
    async function fetchTraffic() {
        const t = CONFIG.traffic;
        const tomtomKey = t.tomtomKey || '';

        if (tomtomKey) {
            const url = `https://api.tomtom.com/routing/1/calculateRoute/${t.originLat},${t.originLon}:${t.destLat},${t.destLon}/json?key=${tomtomKey}&traffic=true`;
            const data = await safeFetch(url, 10000);
            if (data?.routes?.[0]) {
                const route = data.routes[0].summary;
                state.traffic = {
                    duration: Math.ceil(route.travelTimeInSeconds / 60),
                    durationTraffic: Math.ceil(route.trafficDelayInSeconds / 60),
                    distance: (route.lengthInMeters / 1000).toFixed(1),
                    estimated: false,
                    rushHour: false,
                    lastUpdate: Date.now()
                };
                renderTraffic();
                return;
            }
        }

        // Fallback: smart estimate based on road distance, time of day, day of week
        // Dolni Brezany → Chodov OC is ~12km by road (vs ~8km straight line)
        const straightDist = haversine(t.originLat, t.originLon, t.destLat, t.destLon);
        const roadDist = straightDist * 1.4; // road detour factor
        const now = new Date();
        const hour = now.getHours();
        const min = now.getMinutes();
        const dayOfWeek = now.getDay(); // 0=Sun
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const timeDecimal = hour + min / 60;

        // Typical Prague traffic pattern (multiplier on base travel time)
        let multiplier = 1.0;
        if (isWeekend) {
            // Weekends: light traffic, slight bump around noon for shopping
            if (timeDecimal >= 10 && timeDecimal <= 14) multiplier = 1.15;
            else if (timeDecimal >= 22 || timeDecimal <= 5) multiplier = 0.8;
        } else {
            // Weekday traffic curve (Prague D1/south corridor)
            if (timeDecimal >= 6.5 && timeDecimal < 7) multiplier = 1.3;
            else if (timeDecimal >= 7 && timeDecimal < 8) multiplier = 1.7;
            else if (timeDecimal >= 8 && timeDecimal < 9) multiplier = 1.8; // peak
            else if (timeDecimal >= 9 && timeDecimal < 10) multiplier = 1.4;
            else if (timeDecimal >= 15 && timeDecimal < 16) multiplier = 1.3;
            else if (timeDecimal >= 16 && timeDecimal < 17) multiplier = 1.6;
            else if (timeDecimal >= 17 && timeDecimal < 18) multiplier = 1.7; // peak
            else if (timeDecimal >= 18 && timeDecimal < 19) multiplier = 1.4;
            else if (timeDecimal >= 22 || timeDecimal <= 5) multiplier = 0.75;
        }

        const baseMinutes = (roadDist / 38) * 60; // 38 km/h avg — suburban Prague + traffic lights
        state.traffic = {
            duration: Math.ceil(baseMinutes * multiplier),
            distance: roadDist.toFixed(1),
            estimated: true,
            rushHour: multiplier >= 1.5,
            peak: multiplier >= 1.7,
            lastUpdate: Date.now()
        };
        bootStatus('boot-traffic', true);
        renderTraffic();
    }

    function renderTraffic() {
        const d = state.traffic;
        if (!d) return;

        const destName = CONFIG.traffic.destName || 'DESTINATION';
        setText('traffic-dest', 'DRIVE TO ' + destName.toUpperCase());
        setText('traffic-time', d.duration + ' min');

        const infoEl = $('traffic-info');
        if (infoEl) {
            let info = d.distance + ' km';
            if (d.peak) {
                info += ' | PEAK TRAFFIC';
                infoEl.className = 'traffic-info traffic-rush';
            } else if (d.rushHour) {
                info += ' | Rush hour';
                infoEl.className = 'traffic-info traffic-rush';
            } else {
                info += ' | Normal';
                infoEl.className = 'traffic-info';
            }
            if (d.estimated) info += ' (est.)';
            infoEl.textContent = info;
        }
    }

    // ── Trending ──────────────────────────────────────────
    // Sources: Google Trends (CZ + US) via rss2json, Hacker News API
    const TRENDING_SOURCES = ['CZ', 'WORLD', 'US', 'HN'];
    let trendingSourceIdx = 0;

    async function fetchTrending() {
        // Google Trends CZ
        const czUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' +
            encodeURIComponent('https://trends.google.com/trending/rss?geo=CZ');
        const czData = await safeFetch(czUrl, 10000);
        if (czData?.items) {
            state.trendingCZ = czData.items.slice(0, 15).map((item, i) => ({
                rank: i + 1,
                text: decodeHTML(item.title),
                traffic: item.description || '',
                source: 'CZ'
            }));
        }

        // Google Trends US
        await delay(500);
        const usUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' +
            encodeURIComponent('https://trends.google.com/trending/rss?geo=US');
        const usData = await safeFetch(usUrl, 10000);
        if (usData?.items) {
            state.trendingUS = usData.items.slice(0, 15).map((item, i) => ({
                rank: i + 1,
                text: decodeHTML(item.title),
                traffic: item.description || '',
                source: 'US'
            }));
        }

        // Google Trends Worldwide
        await delay(500);
        const wwUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' +
            encodeURIComponent('https://trends.google.com/trending/rss');
        const wwData = await safeFetch(wwUrl, 10000);
        if (wwData?.items) {
            state.trendingWORLD = wwData.items.slice(0, 15).map((item, i) => ({
                rank: i + 1,
                text: decodeHTML(item.title),
                traffic: item.description || '',
                source: 'WORLD'
            }));
        }

        // Hacker News top stories
        const hnIds = await safeFetch('https://hacker-news.firebaseio.com/v0/topstories.json', 10000);
        if (hnIds && Array.isArray(hnIds)) {
            const top10 = hnIds.slice(0, 12);
            const stories = [];
            for (const id of top10) {
                const story = await safeFetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, 5000);
                if (story) {
                    stories.push({
                        rank: stories.length + 1,
                        text: story.title,
                        meta: (story.score || 0) + ' pts',
                        source: 'HN'
                    });
                }
            }
            state.trendingHN = stories;
        }

        const hasData = (state.trendingCZ?.length > 0) || (state.trendingWORLD?.length > 0) || (state.trendingUS?.length > 0) || (state.trendingHN?.length > 0);
        bootStatus('boot-trending', hasData);
        renderTrending();
    }

    function renderTrending() {
        const source = TRENDING_SOURCES[trendingSourceIdx];
        let items = [];
        let label = '';

        if (source === 'CZ') {
            items = state.trendingCZ || [];
            label = 'GOOGLE TRENDS — CZECH REPUBLIC';
        } else if (source === 'WORLD') {
            items = state.trendingWORLD || [];
            label = 'GOOGLE TRENDS — WORLDWIDE';
        } else if (source === 'US') {
            items = state.trendingUS || [];
            label = 'GOOGLE TRENDS — UNITED STATES';
        } else {
            items = state.trendingHN || [];
            label = 'HACKER NEWS — TOP STORIES';
        }

        if (items.length === 0) {
            setHTML('trending-content', '<div class="loading-text">No trending data yet</div>');
            return;
        }

        const tagCls = source === 'HN' ? 'pill-tag-hn' : 'pill-tag-trend';
        let html = `<div style="font-size:9px;color:var(--muted);margin-bottom:4px;letter-spacing:1px;">${label}</div>`;

        for (const item of items) {
            const meta = item.meta || item.traffic || '';
            html += `<div class="trending-item">
                <span class="trending-rank">${item.rank}.</span>
                <span class="trending-text">${truncate(item.text, 60)}</span>
                ${meta ? `<span class="trending-meta">${truncate(meta, 20)}</span>` : ''}
            </div>`;
        }

        setHTML('trending-content', html);
    }

    // ── Fetch All ───────────────────────────────────────────
    async function fetchAll() {
        await Promise.allSettled([
            fetchCrypto(),
            fetchWeather(),
            fetchNews(),
            fetchFNG(),
            fetchSites(),
            fetchTraffic(),
            fetchStocks(),
            fetchTrending(),
            fetchForecast(),
            fetchForex()
        ]);
        loadQuote();
    }

    // ── Scheduled Refreshes ─────────────────────────────────
    function scheduleRefreshes() {
        const iv = CONFIG.intervals;
        setInterval(updateClock, iv.clock);
        setInterval(fetchCrypto, iv.markets);
        setInterval(fetchWeather, iv.weather);
        setInterval(fetchNews, iv.news);
        setInterval(loadQuote, iv.quotes);
        setInterval(fetchSites, iv.pinger);
        setInterval(fetchFNG, iv.fear);
        setInterval(updateSystemBar, iv.system);
        setInterval(fetchTraffic, iv.traffic);
        setInterval(fetchStocks, iv.markets); // stocks same interval as markets

        setInterval(fetchTrending, iv.news); // refresh trending with news
        setInterval(fetchForecast, iv.weather); // refresh forecast with weather
        setInterval(fetchForex, iv.weather); // refresh forex with weather (ECB updates daily)

        // News auto-scroll timer (runs every 8s)
        setInterval(renderNews, 8000);
    }

    // ── Boot Sequence ───────────────────────────────────────
    async function boot() {
        // Config is loaded via <script src="js/my-config.js"> — no fetch needed
        bootStatus('boot-config', true);

        // Update hub name in header + title
        const hubName = CONFIG.name || 'RASPI INFO HUB';
        document.title = hubName;
        setText('hub-title', hubName);
        setText('boot-title', hubName);

        // Update location in header
        const loc = CONFIG.location;
        setText('header-location',
            `${loc.city.toUpperCase()}, ${loc.country} \u00A0|\u00A0 ${loc.lat.toFixed(2)}\u00B0N ${loc.lon.toFixed(2)}\u00B0E`
        );

        // Start clock immediately
        updateClock();

        // Boot screen progress bar
        const bootBar = $('boot-bar-fill');
        if (bootBar) {
            bootBar.style.width = '30%';
        }

        // Start fetching data (non-blocking — don't wait for all to finish)
        fetchAll();

        // Boot bar animation + fade out after 2s max
        if (bootBar) bootBar.style.width = '60%';
        setTimeout(() => {
            if (bootBar) bootBar.style.width = '100%';
            setTimeout(() => {
                const bootScreen = $('boot-screen');
                if (bootScreen) {
                    bootScreen.classList.add('fade-out');
                    setTimeout(() => { bootScreen.style.display = 'none'; }, 700);
                }
            }, 400);
        }, 1500);

        // Start system bar updates
        updateSystemBar();

        // Chart range toggle: cycle through 7d → 30d → 90d → 180d → 7d
        const chartRanges = ['7d', '30d', '90d', '180d'];
        const toggleEl = $('chart-toggle');
        if (toggleEl) {
            toggleEl.addEventListener('click', () => {
                const idx = chartRanges.indexOf(state.chartRange);
                state.chartRange = chartRanges[(idx + 1) % chartRanges.length];
                toggleEl.textContent = state.chartRange.toUpperCase();
                renderCharts();
            });
        }

        // Trending source toggle: CZ → US → HN → CZ
        const trendToggle = $('trending-toggle');
        if (trendToggle) {
            trendToggle.addEventListener('click', () => {
                trendingSourceIdx = (trendingSourceIdx + 1) % TRENDING_SOURCES.length;
                trendToggle.textContent = TRENDING_SOURCES[trendingSourceIdx];
                renderTrending();
            });
        }

        // Schedule recurring refreshes
        scheduleRefreshes();
    }

    // ── Launch ──────────────────────────────────────────────
    boot();

})();

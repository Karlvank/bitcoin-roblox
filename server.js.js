const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Hier bewaren we de laatste candle
let lastCandle = null;

// Endpoint voor Roblox om de laatste candle op te halen
app.get('/getCandle', (req, res) => {
    res.json(lastCandle);
});

// Functie om candle op te halen van CoinGecko
async function updateCandle() {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/ohlc', {
            params: {
                vs_currency: 'usd',
                days: 1
            },
            headers: {
                'X-CoinGecko-Api-Key': 'CG-gxEZjJNbKfokXAnK6567ocfW'
            }
        });

        // response.data is een array: [timestamp, open, high, low, close]
        const candles = response.data;
        const latest = candles[candles.length - 1];

        lastCandle = {
            timestamp: latest[0],
            open: latest[1],
            high: latest[2],
            low: latest[3],
            close: latest[4]
        };

        console.log('Laatste candle opgehaald:', lastCandle);
    } catch (err) {
        console.error('Fout bij ophalen candle:', err);
    }
}

// Update elke minuut
setInterval(updateCandle, 60 * 1000);
updateCandle(); // meteen ophalen

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
});

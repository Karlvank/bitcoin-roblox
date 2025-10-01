import axios from "axios";

export default async function handler(req, res) {
  try {
    // Dummy data om Roblox te testen
    res.status(200).json({
      timestamp: Date.now(),
      price: 42000
    });

    // Later echte CoinGecko call kan hier
    /*
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
      {
        params: { vs_currency: "usd", days: "1", interval: "minute" },
        headers: { "X-CoinGecko-API-Key": "CG-gxEZjJNbKfokXAnK6567ocfW" },
      }
    );
    const prices = response.data.prices;
    const lastPrice = prices[prices.length - 1];
    res.status(200).json({ timestamp: lastPrice[0], price: lastPrice[1] });
    */

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

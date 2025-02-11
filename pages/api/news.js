export default async function handler(req, res) {
  const apiKey = "7dc72a2cd83d4a95ab72a92cd604b6d7"; // Your API Key
  const apiUrl = "https://newsapi.org/v2/everything";

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}&apiKey=${apiKey}&language=en&pageSize=10&sortBy=publishedAt`, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

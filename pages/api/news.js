export default async function handler(req, res) {
  const API_KEY = "7dc72a2cd83d4a95ab72a92cd604b6d7";
  const topics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change and New Technology to Fight It",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News (Books, Movies, Awards like Nebula, Three-Body Problem, etc.)",
  ];

  const searchQuery = req.query.q || topics.join(" OR ");
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NewsAPI error: ${response.status}`);
    
    const data = await response.json();
    return res.status(200).json({ articles: data.articles.slice(0, 10) });
  } catch (error) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ error: "Failed to fetch news." });
  }
}

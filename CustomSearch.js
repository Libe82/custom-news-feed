import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Favorite topics to display automatically
  const defaultTopics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change and New Technology to Fight It",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News"
  ];

  // Function to fetch news articles
  const fetchNews = async (searchQuery) => {
    console.log("Fetching news for:", searchQuery);
    const apiKey = "7dc72a2cd83d4a95ab72a92cd604b6d7"; // Your API Key
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/json"
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.articles || data.articles.length === 0) {
        console.error("❌ No articles found.");
        setResults([]);
      } else {
        setResults(
          data.articles.map(article => ({
            title: article.title,
            description: article.description ? article.description.substring(0, 150) + "..." : "No description available.",
            url: article.url,
            image: article.urlToImage || "https://via.placeholder.com/150",
            source: article.source.name
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setResults([]);
    }
  };

  // Fetch news on load with default topics
  useEffect(() => {
    fetchNews(defaultTopics.join(" OR "));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Custom News Feed</h1>
      <p style={{ textAlign: "center" }}>
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "60%", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button
          onClick={() => fetchNews(query)}
          style={{ padding: "10px", marginLeft: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px" }}
        >
          Search
        </button>
      </div>

      {/* News Articles */}
      {results.length > 0 ? (
        <div>
          {results.map((article, index) => (
            <div key={index} style={{ marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "10px", display: "flex", alignItems: "center" }}>
              <img src={article.image} alt={article.title} style={{ width: "100px", height: "100px", marginRight: "15px", borderRadius: "5px" }} />
              <div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "18px", fontWeight: "bold", color: "#007BFF", textDecoration: "none" }}>
                  {article.title}
                </a>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>{article.description}</p>
                <span style={{ fontSize: "12px", fontWeight: "bold" }}>Source: {article.source}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>No news articles found.</p>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  
  // Default topics to display automatically
  const defaultTopics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change and New Technology to Fight It",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News"
  ];

  useEffect(() => {
    fetchNews(defaultTopics.join(" OR ")); // Fetch news automatically on load
  }, []);

  const fetchNews = async (searchQuery) => {
    console.log("Fetching news for:", searchQuery);
    const apiKey = "7dc72a2cd83d4a95ab72a92cd604b6d7"; // Replace with your API key
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("API Response:", data); // Debugging log

      if (!data.articles || data.articles.length === 0) {
        console.error("❌ No articles found.");
        setResults([]); // Clear results if no articles are found
      } else {
        setResults(
          data.articles.map(article => ({
            title: article.title,
            description: article.description ? article.description.substring(0, 150) + "..." : "No description available.",
            url: article.url,
            image: article.urlToImage || "https://via.placeholder.com/150", // Default image
            source: article.source.name
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setResults([]);
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      fetchNews(query);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto", textAlign: "center" }}>
      <h1>Custom News Feed</h1>
      <p>Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.</p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search query..."
        style={{
          padding: "10px",
          width: "60%",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginLeft: "10px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          background: "#007bff",
          color: "white",
          cursor: "pointer"
        }}
      >
        Search
      </button>

      <div>
        {results.length === 0 ? (
          <p style={{ color: "red" }}>No news articles found.</p>
        ) : (
          results.map((article, index) => (
            <div key={index} style={{
              borderBottom: "1px solid #ddd",
              padding: "15px",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "15px"
            }}>
              <img src={article.image} alt="News" style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <div>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "18px", fontWeight: "bold", textDecoration: "none", color: "#007bff" }}>
                  {article.title}
                </a>
                <p style={{ margin: "5px 0" }}><strong>Source:</strong> {article.source}</p>
                <p style={{ fontSize: "14px", color: "#555" }}>{article.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // List of default topics for the homepage
  const defaultTopics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change and New Technology to Fight It",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News"
  ];

  // API Key and Base URL
  const apiKey = "7dc72a2cd83d4a95ab72a92cd604b6d7";
  const apiUrl = `https://newsapi.org/v2/everything?apiKey=${apiKey}&language=en&pageSize=10&sortBy=publishedAt`;

  // Function to fetch news articles
  const fetchNews = (query) => {
    console.log("Fetching news for:", query);
    
    fetch(`${apiUrl}&q=${encodeURIComponent(query)}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log("API Response:", data);
      if (data.articles) {
        setResults(data.articles);
      } else {
        console.error("No articles found.");
        setResults([]);
      }
    })
    .catch(error => console.error("Error fetching news:", error));
  };

  // Load default topics on initial render
  useEffect(() => {
    fetchNews(defaultTopics.join(" OR ")); // Combine topics for broader search
  }, []);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchNews(query);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Custom News Feed</h1>
      <p style={{ color: "#666" }}>
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>

      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "70%",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Display results */}
      <div>
        {results.length > 0 ? (
          results.map((article, index) => (
            <div key={index} style={{ textAlign: "left", marginBottom: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "8px" }}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt="news" style={{ width: "100%", borderRadius: "8px" }} />
              )}
              <h3 style={{ margin: "10px 0" }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#007bff" }}>
                  {article.title}
                </a>
              </h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                <strong>Source:</strong> {article.source.name} | <strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p style={{ fontSize: "14px", color: "#333" }}>{article.description}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "red" }}>No news articles found.</p>
        )}
      </div>
    </div>
  );
}

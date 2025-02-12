import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (searchQuery = "") => {
    setError("");
    try {
      const response = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setError("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Error fetching news. Please try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>Custom News Feed</h1>
      <p style={{ fontSize: "16px", color: "#555" }}>
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
          style={{
            width: "70%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => fetchNews(query)}
          style={{
            marginLeft: "10px",
            padding: "10px 15px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}

      <div>
        {articles.map((article, index) => (
          <div key={index} style={{ borderBottom: "1px solid #ddd", padding: "15px", textAlign: "left" }}>
            <h3 style={{ margin: "0 0 5px" }}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none" }}>
                {article.title}
              </a>
            </h3>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
              <strong>Source:</strong> {article.source.name}
            </p>
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} style={{ width: "100%", borderRadius: "5px", marginTop: "10px" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

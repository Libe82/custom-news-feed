import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  // Define the API Key
  const API_KEY = "7dc72a2cd83d4a95ab72a92cd604b6d7"; // Your API Key
  const API_URL = "https://newsapi.org/v2/everything";
  // Default Topics (Predefined search topics)
  const defaultTopics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change and New Technology to Fight It",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News (Books, Movies, Awards like Nebula, Three-Body Problem, etc.)",
  ];
  useEffect(() => {
    fetchNews(defaultTopics.join(" OR ")); // Fetch default news
    fetchNews();
  }, []);

  const fetchNews = async (searchQuery) => {
  const fetchNews = async (searchQuery = "") => {
    setError("");
    console.log(`Fetching news for: ${searchQuery}`);
    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const response = await fetch(`/api/news?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles.slice(0, 10)); // Limit to 10 articles
        setArticles(data.articles);
      } else {
        setError("No articles found.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Error fetching news. Please try again.");
      setError("Error fetching news. Please try again later.");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Custom News Feed</h1>
      <p className="description">
    <div style={{ maxWidth: "800px", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>Custom News Feed</h1>
      <p style={{ fontSize: "16px", color: "#555" }}>
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>
      <div className="search-container">
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
        <button onClick={() => fetchNews(query)}>Search</button>
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

      {error && <p className="error">{error}</p>}
      {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}

      <div className="news-list">
      <div>
        {articles.map((article, index) => (
          <div key={index} className="news-item">
            <img src={article.urlToImage} alt={article.title} />
            <div className="news-content">
              <h2>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </h2>
              <p>{article.description ? article.description.substring(0, 150) + "..." : "No description available."}</p>
              <span className="news-source">{article.source.name}</span>
            </div>
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
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: auto;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
        }
        .description {
          color: #555;
          margin-bottom: 20px;
        }
        .search-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        input {
          padding: 8px;
          width: 60%;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 8px 15px;
          background-color: #007bff;
          color: white;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .error {
          color: red;
          font-weight: bold;
        }
        .news-list {
          display: grid;
          gap: 15px;
        }
        .news-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .news-item img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 5px;
          margin-right: 10px;
        }
        .news-content {
          text-align: left;
        }
        .news-source {
          font-size: 12px;
          color: #777;
        }
      `}</style>
    </div>
  );
}

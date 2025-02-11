import { useState, useEffect } from "react";

const apiKey = "7dc72a2cd83d4a95ab72a92cd604b6d7";  // Replace with your actual API key
const apiUrl = `https://newsapi.org/v2/everything?language=en&sortBy=publishedAt&apiKey=${apiKey}`;

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Default topics to fetch on page load
  const defaultTopics = [
    "Eco-Friendly Farming",
    "Clean Energy Technology",
    "Climate Change",
    "Astronomy & Physics",
    "Hard Sci-Fi News"
  ];

  // Fetch default news when the page loads
  useEffect(() => {
    const defaultQuery = defaultTopics.join(" OR ");
    fetch(`${apiUrl}&q=${encodeURIComponent(defaultQuery)}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data);
        if (data.articles) {
          setResults(data.articles);
        } else {
          console.error("No articles found.");
        }
      })
      .catch(error => console.error("Error fetching news:", error));
  }, []);

  // Handle user search
  const handleSearch = () => {
    if (!query.trim()) return;
    fetch(`${apiUrl}&q=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        console.log("Search API Response:", data);
        if (data.articles) {
          setResults(data.articles);
        } else {
          console.error("No articles found.");
          setResults([]);
        }
      })
      .catch(error => console.error("Error fetching search results:", error));
  };

  return (
    <div className="container">
      <h1 className="title">Custom News Feed</h1>
      <p className="subtitle">
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {/* News Articles */}
      <div className="news-grid">
        {results.length > 0 ? (
          results.map((article, index) => (
            <div key={index} className="news-card">
              {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
              <h3 className="news-title">
                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
              </h3>
              <p className="news-source"><strong>Source:</strong> {article.source.name}</p>
              <p className="news-description">{article.description}</p>
            </div>
          ))
        ) : (
          <p className="no-news">No news articles found.</p>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .title {
          font-size: 2rem;
          font-weight: bold;
        }
        .subtitle {
          font-size: 1rem;
          margin-bottom: 20px;
        }
        .search-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .search-input {
          width: 70%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
        }
        .search-button {
          padding: 10px 15px;
          margin-left: 10px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
        .news-card {
          background: #fff;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          text-align: left;
        }
        .news-title a {
          font-size: 1.2rem;
          color: #007BFF;
          text-decoration: none;
        }
        .news-source {
          font-size: 0.9rem;
          color: #666;
        }
        .news-description {
          font-size: 1rem;
          color: #333;
        }
        .news-image {
          width: 100%;
          border-radius: 10px;
        }
        .no-news {
          font-size: 1.2rem;
          color: red;
        }
      `}</style>
    </div>
  );
}

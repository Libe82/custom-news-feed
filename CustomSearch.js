import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // ✅ Favorite topics to display automatically
  const defaultTopics = [
    "Clean Energy Technology",
    "Astronomy & Physics Discoveries",
    "Eco-Friendly Farming Innovations",
    "Climate Change & New Technologies",
    "Hard Sci-Fi & Sci-Fi News"
  ];

  // ✅ Fetch News Automatically
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async (searchQuery = "") => {
    try {
      console.log("Fetching news...");

      const topicQuery = searchQuery
        ? searchQuery
        : defaultTopics.join(" OR ");

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(topicQuery)}&sortBy=relevancy&apiKey=7dc72a2cd83d4a95ab72a92cd604b6d7`
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (data.articles) {
        setResults(data.articles);
      } else {
        console.error("Error: No articles found.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(query);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Custom News Feed</h1>
      <p style={{ textAlign: "center" }}>
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>

      {/* ✅ Search Bar */}
      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter search query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "10px", width: "70%", fontSize: "16px" }}
        />
        <button type="submit" style={{ padding: "10px 15px", marginLeft: "10px", fontSize: "16px" }}>Search</button>
      </form>

      {/* ✅ Display News Articles */}
      <div>
        {results.length > 0 ? (
          results.map((article, index) => (
            <div key={index} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
              <h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#0073e6" }}>
                  {article.title}
                </a>
              </h3>
              <p><strong>Source:</strong> {article.source.name}</p>
              <p>{article.description}</p>
              {article.urlToImage && (
                <img src={article.urlToImage} alt="News Thumbnail" style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "10px" }} />
              )}
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", fontStyle: "italic" }}>No news articles found.</p>
        )}
      </div>
    </div>
  );
}

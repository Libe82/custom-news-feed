import { useState, useEffect } from "react";

export default function CustomSearch() {
  const [results, setResults] = useState([]);
  const topics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change & Technology",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News",
  ];

  useEffect(() => {
    fetchNews(topics.join(" OR "));
  }, []);

  const fetchNews = async (query) => {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=YOUR_REAL_API_KEY`
    );
    const data = await response.json();
    setResults(data.articles || []);
  };

  return (
    <div className="container">
      <h1>Custom News Feed</h1>
      <p>Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.</p>
      <div className="news-container">
        {results.map((article, index) => (
          <div key={index} className="news-card">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <h3>{article.title}</h3>
            </a>
            <p><strong>Source:</strong> {article.source?.name || "Unknown"}</p>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

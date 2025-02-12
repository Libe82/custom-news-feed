import { useState, useEffect } from "react";
import styles from "./styles/CustomSearch.module.css"; // Archivo CSS moderno

const API_KEY = "7dc72a2cd83d4a95ab72a92cd604b6d7";
const BASE_URL = "https://newsapi.org/v2/everything";

export default function CustomSearch() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // **Temas predeterminados**
  const defaultTopics = [
    "Eco-Friendly Farming & Cultivation",
    "Clean Energy Technology",
    "Climate Change and New Technology to Fight It",
    "Astronomy & Physics Discoveries",
    "Hard Sci-Fi & Sci-Fi News (Books, Movies, Awards like Nebula, Three-Body Problem, etc.)"
  ];

  useEffect(() => {
    fetchNews(defaultTopics.join(" OR "));
  }, []);

  const fetchNews = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(searchQuery)}&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError("Error fetching news. Please try again.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchNews(query);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Custom News Feed</h1>
      <p className={styles.subtitle}>
        Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.
      </p>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {/* Mensajes de carga y error */}
      {loading && <p className={styles.loading}>Loading news...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Lista de noticias */}
      <div className={styles.newsGrid}>
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className={styles.newsCard}>
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className={styles.newsImage} />
              )}
              <div className={styles.newsContent}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.newsTitle}>
                  {article.title}
                </a>
                <p className={styles.newsSource}>Source: {article.source.name}</p>
                <p className={styles.newsDescription}>
                  {article.description ? article.description.substring(0, 120) + "..." : "No description available."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noNews}>No news articles found.</p>
        )}
      </div>
    </div>
  );
}

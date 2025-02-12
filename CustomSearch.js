import { useState, useEffect } from "react";

export default function CustomSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    // Temas favoritos para mostrar automáticamente
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
        console.log(`Fetching news for: ${searchQuery}`);
        const apiKey = "7dc72a2cd83d4a95ab72a92cd604b6d7"; // Tu API key
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&apiKey=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("API Response:", data);

            if (data.articles) {
                setResults(data.articles);
            } else {
                setResults([]);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setResults([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            fetchNews(query);
        }
    };

    return (
        <div className="container">
            <h1>Custom News Feed</h1>
            <p>Latest news on eco-friendly farming, clean energy, climate change, astronomy, physics, and hard sci-fi.</p>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter search query..."
                />
                <button type="submit">Search</button>
            </form>
            <div className="news-container">
                {results.length > 0 ? (
                    results.map((article, index) => (
                        <div key={index} className="news-card">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <h2>{article.title}</h2>
                            </a>
                            <p><strong>Source:</strong> {article.source.name}</p>
                            <p>{article.description ? article.description.slice(0, 200) + "..." : "No description available."}</p>
                            {article.urlToImage && <img src={article.urlToImage} alt="news" />}
                        </div>
                    ))
                ) : (
                    <p className="no-articles">No news articles found.</p>
                )}
            </div>
        </div>
    );
}

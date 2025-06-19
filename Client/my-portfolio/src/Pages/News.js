import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css";


let API_BASE_URL = 'https://portfolio-6-5icm.onrender.com';
// let API_BASE_URL = 'http://localhost:5000'

function News() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        setArticles(response.data.articles);
      } catch (err) {
        console.error("Error fetching tech news:", err);
        setError("Failed to load technology news.");
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setColumns(1);
      } else if (width < 900) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const gridStyle = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  return (
    <div className="news-tech-container">
      <h2 className="news-tech-title">📰 Latest Technology News</h2>
      {error && <p className="news-tech-error">{error}</p>}
      {articles.length === 0 && !error && (
        <p className="news-tech-loading">Loading...</p>
      )}
      <div className="news-tech-grid" style={gridStyle}>
        {articles.map((article, index) => (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="news-tech-card"
          >
            {article.cover_image && (
              <img
                src={article.cover_image}
                alt={article.title}
                className="news-tech-image"
              />
            )}
            <div className="news-tech-content">
              <h3 className="news-tech-title-text">{article.title}</h3>
              <p className="news-tech-description">
                {article.description || "No description available."}
              </p>
              <small className="news-tech-date">
                {new Date(article.published_at).toLocaleString()}
              </small>
              <p className="news-tech-author">
                👤 By: {article.user?.name || "Unknown"}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default News;
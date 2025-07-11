import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../api/strapi';
import './ArticleDetails.css';

const ArticleDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = 'http://localhost:1337';

  useEffect(() => {
    const getArticle = async () => {
      try {
        const data = await fetchArticleById(slug);
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [slug]);

  if (loading) return <p className="loading-text">Loading article...</p>;
  if (!article) return <p className="error-text">Article not found.</p>;

  return (
    <div className="article-detail-wrapper">
      <div className="article-detail-card">
        <h1 className="article-title">{article.title}</h1>

        {article.articleImage?.url && (
          <img
            src={baseUrl + article.articleImage.url}
            alt={article.title}
            className="article-hero-image"
          />
        )}

        {article.author?.name && (
          <div className="author-section hover-group">
            <p className="author-name">{article.author.name}</p>
            <div className="author-hover-info">
              {article.author?.image?.url && (
                <img
                  src={baseUrl + article.author.image.url}
                  alt={article.author.name}
                  className="author-photo"
                />
              )}
              <p className="author-bio">{article.author.description}</p>
            </div>
          </div>
        )}

        {article.subtitle && <h2 className="article-subtitle">{article.subtitle}</h2>}

        <div className="article-content">
          {article.type === 'video' && article.video?.url ? (
            <video controls className="article-video">
              <source src={baseUrl + article.video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: article.description }}
              className="article-description"
            />
          )}
        </div>

        {article.tags?.length > 0 && (
          <div className="article-tags">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="tag-chip">{tag.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;

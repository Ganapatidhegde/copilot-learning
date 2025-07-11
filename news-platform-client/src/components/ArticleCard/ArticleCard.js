import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ image, title, subtitle, tags, author, id, slug }) => {
     const navigate = useNavigate();
  const baseUrl = 'http://localhost:1337';

  return (
    <div className="article-card" onClick={() => navigate(`/article/slug/${slug}`)} style={{ cursor: 'pointer' }}>
      <div className="article-card-image">
        <img src={baseUrl + image?.url} alt={title} />
      </div>

      <div className="article-card-content">
        <h2 className="article-title">{title}</h2>
        <p className="article-subtitle">{subtitle}</p>

        {/* <div className="article-tags">
          {tags?.map((tag, index) => (
            <span key={index} className="article-tag">{tag.name}</span>
          ))}
        </div> */}

        {/* {author?.name && (
          <div className="article-author">
            <img src={baseUrl + author?.photo?.url} alt={author.name} className="author-photo" />
            <span className="author-name">{author.name}</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ArticleCard;

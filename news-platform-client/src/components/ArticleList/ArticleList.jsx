import React, { useState, useMemo } from 'react';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.css';

const ArticleList = ({
  articles,
  authors = [],
  categories = [],
  tags = [],
  types = []
}) => {
  const [filters, setFilters] = useState({
    author: '',
    tag: '',
    category: '',
    type: ''
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value.toLowerCase() }));
  };

  const filteredArticles = useMemo(() => {
    return articles?.filter(article => {
      const matchesAuthor = filters.author
        ? article.author?.name?.toLowerCase().includes(filters.author)
        : true;

      const matchesTag = filters.tag
        ? article.tags?.some(tag => tag.name?.toLowerCase().includes(filters.tag))
        : true;

      const matchesCategory = filters.category
        ? Array.isArray(article.categories)
          ? article.categories.some(cat => cat.name?.toLowerCase().includes(filters.category))
          : article.categories?.name?.toLowerCase().includes(filters.category)
        : true;

      const matchesType = filters.type
        ? article.type?.toLowerCase().includes(filters.type)
        : true;

      return matchesAuthor && matchesTag && matchesCategory && matchesType;
    });
  }, [articles, filters]);

  return (
    <div className="article-list-wrapper">
      <div className="app-header">
        <h1 className="app-title">📰 InsightHub</h1>
        <p className="app-subtitle">Your gateway to curated and insightful news articles</p>
      </div>

      <div className="filters-card">
        <h3>Filter Articles</h3>
        <div className="filters">
          <select name="author" onChange={handleFilterChange}>
            <option value="">Author</option>
            {authors.map((author, idx) => (
              <option key={idx} value={author.name}>{author.name}</option>
            ))}
          </select>

          <select name="category" onChange={handleFilterChange}>
            <option value="">Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.name}>{cat.name}</option>
            ))}
          </select>

          <select name="type" onChange={handleFilterChange}>
            <option value="">Article Type</option>
            {types.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>

          <select name="tag" onChange={handleFilterChange}>
            <option value="">Tag</option>
            {tags.map((tag, idx) => (
              <option key={idx} value={tag.name}>{tag.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="article-list">
        {filteredArticles?.map((article, index) => (
          <ArticleCard
            key={index}
            image={article.articleImage}
            title={article.title}
            subtitle={article.subtitle}
            tags={article.tags}
            author={article.author}
            id={article.id}
            type={article.type}
            slug={article.slug}
            className="article-card"
          />
        ))}
        {filteredArticles.length === 0 && (
          <p className="no-articles">No matching articles found.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleList;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList/ArticleList';
import ArticleDetail from './components/ArticleDetails/ArticleDetails';
import './App.css';
import { fetchArticles } from './api/strapi';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles();
        setArticles(fetchedArticles);

        // Extract unique filter options
        const authorsSet = new Set();
        const categoriesSet = new Set();
        const tagsSet = new Set();
        const typesSet = new Set();

        fetchedArticles.forEach(article => {
          if (article.author?.name) authorsSet.add(article.author.name);
          if (article.categories?.length) {
            article.categories.forEach(cat => categoriesSet.add(cat.name));
          }
          if (article.tags?.length) {
            article.tags.forEach(tag => tagsSet.add(tag.name));
          }
          if (article.type) typesSet.add(article.type);
        });

        setAuthors([...authorsSet].map(name => ({ name })));
        setCategories([...categoriesSet].map(name => ({ name })));
        setTags([...tagsSet].map(name => ({ name })));
        setTypes([...typesSet]);
      } catch (err) {
        console.error(err);
      } finally {
        console.log('Articles fetched successfully');
      }
    };

    getArticles();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ArticleList
                articles={articles}
                authors={authors}
                categories={categories}
                tags={tags}
                types={types}
              />
            }
          />
          <Route path="/article/slug/:slug" element={<ArticleDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

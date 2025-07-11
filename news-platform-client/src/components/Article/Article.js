import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../../api/strapi';

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadArticles = async () => {
            const data = await fetchArticles();
            setArticles(data);
        };
        loadArticles();
    }, []);

    return (
        <div>
            <h1>Articles</h1>
            {articles.map(article => (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Articles;

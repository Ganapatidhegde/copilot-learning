import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

export const fetchArticles = async () => {
    try {
        const res = await axios.get(`${API_URL}/articles?populate=*`);
        return res.data.data;
    } catch (err) {
        console.error('Error fetching articles:', err);
        return [];
    }
};

export const fetchArticleById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/articles/slug/${id}`);
        return res.data.data;
    } catch (err) {
        console.error(`Error fetching article with ID ${id}:`, err);
        return null;
    }
};

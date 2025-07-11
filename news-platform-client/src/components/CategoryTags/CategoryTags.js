import React from 'react';
import './CategoryTags.css';

const CategoryTag = ({ category }) => {
    return (
        <span className="category-tag">
            {category}
        </span>
    );
};

export default CategoryTag;

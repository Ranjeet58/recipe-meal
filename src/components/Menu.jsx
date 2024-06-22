import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../api/mealApi';
import { Link } from 'react-router-dom';
import Shimmer from './Shimmer';
import '../styles/Menu.scss';

const Menu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then(response => setCategories(response.data.categories))
      .catch(error => console.error('Error fetching the categories:', error))
      .finally(() => setLoading(false));
  }, []);

  console.log( "hi", categories)

  return (
    <div className="container layout__wrapper ">
      <h1>Menu</h1>
      <ul className="menu_listWrapper">
        {loading ? <Shimmer count={10} /> : categories.map(category => (
          <li key={category.idCategory}>
            <Link to={`/meals/${category.strCategory}`} className='menu__listCard'>
            <img src={category.strCategoryThumb}  alt={category.strCategory}/>
                <span className='heading'>{category.strCategory}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;

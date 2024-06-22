import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories, fetchRandomMeal } from '../api/mealApi';
import { FavouritesContext } from '../context/FavouritesContext';
import MealCard from './MealCard';
import Shimmer from './Shimmer';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../styles/Home.scss';
import SectionTopHeading from './SectionTopHeading';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then(response => {
        console.log('Categories fetched:', response.data.categories); 
        setCategories(response.data.categories);
        return Promise.all(Array(8).fill().map(() => fetchRandomMeal()));
      })
      .then(responses => setRandomMeals(responses.map(response => response.data.meals[0])))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, []);

  const isFavourite = (meal) => favourites.some(fav => fav.idMeal === meal.idMeal);

  return (
    <div className="container layout__wrapper">
      <section className="section">
        <SectionTopHeading title="Menu" linkUrl="/menu" />
        <ul className="list menu__listWraper">
          {loading ? <Shimmer count={6} /> : categories.slice(0, 6).map(category => (
            <li key={category.idCategory}>
              <Link to={`/meals/${category.strCategory}`}>
              <img src={category.strCategoryThumb}  alt={category.strCategory}/>
               <span className='heading'>{category.strCategory}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

    {favourites.length > 0 && (
      <section className="section">
        <SectionTopHeading title="My Favourites" linkUrl="/favourites" />
        <ul className="meal__listCard">
          {loading ? <Shimmer count={4} /> : favourites.slice(0, 4).map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </ul>
      </section>
    )}

      <section className="section">
        <SectionTopHeading title="Random Meals" linkUrl="/random-meal" />
        <div className="meal__listCard">
          {loading ? <Shimmer count={8} /> : randomMeals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal}>
              <button onClick={() => isFavourite(meal) ? removeFavourite(meal) : addFavourite(meal)}>
                {isFavourite(meal) ? <AiFillHeart color="#fff" /> : <AiOutlineHeart />}
              </button>
            </MealCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

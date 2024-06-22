import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMealsByCategory } from '../api/mealApi';
import { FavouritesContext } from '../context/FavouritesContext';
import MealCard from './MealCard';
import Shimmer from './Shimmer';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../styles/Meals.scss'


const Meals = () => {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);

  useEffect(() => {
    setLoading(true);
    fetchMealsByCategory(category)
      .then(response => setMeals(response.data.meals))
      .catch(error => console.error('Error fetching the meals:', error))
      .finally(() => setLoading(false));
  }, [category]);

  const isFavourite = (mealId) => favourites.some(fav => fav.idMeal === mealId);

  return (
    <div className="container meals__wrapper">
      <h1 style={{paddingBottom:"1.5rem"}}>{category} Meals</h1>
      <div className="meal__listCard">
        {loading ? <Shimmer count={6} /> : meals.map(meal => (
          <MealCard key={meal.idMeal} meal={meal}>
            <button onClick={() =>  isFavourite(meal.idMeal) ? removeFavourite(meal) : addFavourite(meal) }>  
              {isFavourite(meal.idMeal) ? <AiFillHeart color="#fff" /> : <AiOutlineHeart />}
            </button>
          </MealCard>
        ))}
      </div>
    </div>
  );
};

export default Meals;

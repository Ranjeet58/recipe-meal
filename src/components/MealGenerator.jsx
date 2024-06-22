import  { useEffect, useState, useContext, useRef, useCallback } from 'react';
import { fetchRandomMeal } from '../api/mealApi';
import { FavouritesContext } from '../context/FavouritesContext';
import MealCard from './MealCard';
import Shimmer from './Shimmer';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../styles/RandomMealGenerator.scss';

const RandomMealGenerator = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);
  const observer = useRef();

  const fetchMeals = async (count = 10) => {
    try {
      const mealsPromises = Array.from({ length: count }, () => fetchRandomMeal());
      const mealsResponses = await Promise.all(mealsPromises);
      const mealsData = mealsResponses.map(response => response.data.meals[0]);
      setMeals(prevMeals => [...prevMeals, ...mealsData]);
    } catch (error) {
      console.error('Error fetching random meals:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMeals().finally(() => setLoading(false));
  }, []);

  const loadMoreMeals = () => {
    setLoadingMore(true);
    fetchMeals().finally(() => setLoadingMore(false));
  };

  const lastMealElementRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreMeals();
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingMore]);

  const isFavourite = (mealId) => favourites.some(fav => fav.idMeal === mealId);

  return (
    <div className="container random_mealwrapper" >
      <h1>Random Meals</h1>
      <div className="meal__listCard">
        {loading ? (
          <Shimmer count={10} />
        ) : (
          meals.map((meal, index) => {
            if (meals.length === index + 1) {
              return (
                <div ref={lastMealElementRef} key={meal.idMeal} className="meal-card">
                  <MealCard meal={meal} showDescription={true}>
                    <button onClick={() => isFavourite(meal.idMeal) ? removeFavourite(meal) : addFavourite(meal)}>
                      {isFavourite(meal.idMeal) ? <AiFillHeart color="#fff" /> : <AiOutlineHeart />}
                    </button>
                  </MealCard>
                </div>
              );
            } else {
              return (
                <MealCard key={meal.idMeal} meal={meal} showDescription={true}>
                  <button onClick={() => isFavourite(meal.idMeal) ? removeFavourite(meal) : addFavourite(meal)}>
                    {isFavourite(meal.idMeal) ? <AiFillHeart color="#fff" /> : <AiOutlineHeart />}
                  </button>
                </MealCard>
              );
            }
          })
        )}
      </div>
      {loadingMore && <Shimmer count={3} />}
    </div>
  );
};

export default RandomMealGenerator;

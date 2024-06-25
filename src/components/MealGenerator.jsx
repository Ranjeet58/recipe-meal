import React, { useState, useContext, useCallback } from "react";
import { fetchRandomMeal } from "../api/mealApi";
import { FavouritesContext } from "../context/FavouritesContext";
import MealCard from "./MealCard";
import Shimmer from "./Shimmer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "../styles/RandomMealGenerator.scss";


const MemoizedMealCard = React.memo(MealCard);

const RandomMealGenerator = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const { favourites, addFavourite, removeFavourite } = useContext(FavouritesContext);

  const getRandomMeal = useCallback(async () => {
    setLoading(true);
    setMeal(null); 
    try {
      const response = await fetchRandomMeal();
      setMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const isFavourite = useCallback((mealId) =>
    favourites.some((fav) => fav.idMeal === mealId), [favourites]);

  const handleFavouriteClick = useCallback((meal) => {
    isFavourite(meal.idMeal) ? removeFavourite(meal) : addFavourite(meal);
  }, [isFavourite, addFavourite, removeFavourite]);

  return (
    <div className="container">
      <div className="random_mealwrapper">
        <h4>Generate A Random Meal</h4>
        <div className="meal-container">
          {loading ? (
            <Shimmer count={1} />
          ) : meal ? (
            <MemoizedMealCard key={meal.idMeal} meal={meal}>
              <button
                onClick={() => handleFavouriteClick(meal)}
                className="add_favouriteBtn"
              >
                {isFavourite(meal.idMeal) ? (
                  <AiFillHeart color="#fff" />
                ) : (
                  <AiOutlineHeart />
                )}
              </button>
            </MemoizedMealCard>
          ) : (
            <p>Click Generate Random Meal to get a random meal!</p>
          )}
        </div>
        <button onClick={getRandomMeal} className="generate-button">
          <svg
            height="24"
            width="24"
            fill="#FFFFFF"
            viewBox="0 0 24 24"
            data-name="Layer 1"
            id="Layer_1"
            className="sparkle"
          >
            <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
          </svg>
          <span className="text">Generate Random Meal</span>
        </button>
      </div>
    </div>
  );
};

export default RandomMealGenerator;

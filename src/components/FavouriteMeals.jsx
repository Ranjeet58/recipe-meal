import React, { useContext } from 'react';
import { FavouritesContext } from '../context/FavouritesContext';
import MealCard from './MealCard';
import { AiFillHeart } from 'react-icons/ai';
import '../styles/FavouriteMeals.scss';
import noFavourite  from  '../assets/images/no-favourite.jpeg'

const Favourites = () => {
  const { favourites, removeFavourite } = useContext(FavouritesContext);

  return (
    <div className="container">
      <div className='favorite__wrapper'>
      <h1>My Favourite Meals</h1>
      <div className="favourite__meallist">
        {favourites.length > 0 ? (
          favourites.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} showDescription={true}>
              <button onClick={() => removeFavourite(meal)}>
                <AiFillHeart color="#fff" />
              </button>
            </MealCard>
          ))
        ) : (
          <div className='add__favouritetext'>
           <img src={noFavourite} alt='no-favourite-food' />
            <h4> Please add your favourite food.</h4>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Favourites;

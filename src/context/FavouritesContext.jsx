import React, { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (meal) => setFavourites([...favourites, meal]);
  const removeFavourite = (meal) => setFavourites(favourites.filter(fav => fav.idMeal !== meal.idMeal));

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

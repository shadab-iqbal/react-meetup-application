import { createContext, useState } from "react";

const FavoritesContext = createContext({}); // createContext() returns an object which has .provider and .consumer components

// creating a wrapper component
export function FavoritesContextProvider(props) {
  const [favorites, setFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    setFavorites((prevFavorites) => {
      return prevFavorites.concat(favoriteMeetup); // concat returns a new array, push doesn't
    });
  }

  function removeFavoriteHandler(meetupId) {
    setFavorites((prevFavorites) => {
      return prevFavorites.filter((meetup) => meetup.id !== meetupId); // filter also returns a new array
    });
  }

  function isItemFavoriteHandler(meetupId) {
    return favorites.some((meetup) => meetup.id === meetupId);
  }

  const context = {
    favorites: favorites,
    totalFavorites: favorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    isItemFavorite: isItemFavoriteHandler,
  };

  // "context" will contain the values we want to pass down to all the children
  return (
    <FavoritesContext.Provider value={context}>
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;

import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import FavoritesContext from "../store/FavoritesContext";

export default function FavoritesPage() {
  const favoritesContext = useContext(FavoritesContext);

  return (
    <div>
      <h1>Favorite Meetups</h1>
      {favoritesContext.totalFavorites === 0 ? (
        "Favorite list is empty right now"
      ) : (
        <MeetupList meetups={favoritesContext.favorites} />
      )}
    </div>
  );
}

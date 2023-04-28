import { useContext } from "react";
import Card from "../ui/Card";
import classes from "./MeetupList.module.css";
import FavoritesContext from "../../store/FavoritesContext";

export default function MeetupList(props) {
  const favoritesContext = useContext(FavoritesContext);

  function addToFavoritesHandler(index) {
    const meetup = props.meetups[index];
    const isFavorite = favoritesContext.isItemFavorite(meetup.id);

    if (isFavorite) {
      favoritesContext.removeFavorite(meetup.id);
    } else {
      favoritesContext.addFavorite({
        id: meetup.id,
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      });
    }
  }

  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup, index) => {
        return (
          <li className={classes.item} key={meetup.id}>
            <Card>
              <div className={classes.image}>
                <img src={meetup.image} alt="" />
              </div>
              <div className={classes.content}>
                <h3>{meetup.title}</h3>
                <address>{meetup.address}</address>
                <p>{meetup.description}</p>
              </div>
              <div className={classes.actions}>
                <button onClick={() => addToFavoritesHandler(index)}>
                  {favoritesContext.isItemFavorite(meetup.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

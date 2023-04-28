import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import FavoritesContext from "../../store/FavoritesContext";

export default function MainNavigation() {
  const favoriteContext = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/"> React Meetup App </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/"> All Meetups </Link>
          </li>
          <li>
            <Link to="/new-meetup"> Add New Meetup </Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favorites
              <span className={classes.badge}>
                {favoriteContext.totalFavorites}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

import { Link } from "react-router-dom";
import styles from "./GameCard.module.css";

function GameCard({ game, imageWidth = "200", showRating = true, linkId }) {
  return (
    <div className={styles.gameCard}>
      <img
        className={styles.gameCardImage}
        src={game.image}
        alt={game.name}
        width={imageWidth}
      />
      <Link to={`/games/${linkId ?? game.id ?? game.rawgId}`}>
        <h2 className={styles.gameCardTitle}>{game.name}</h2>
      </Link>
      {showRating && (
        <p className={styles.gameCardRating}>Rating: {game.rating}</p>
      )}
      <p className={styles.gameCardGenres}>
        Géneros: {game.genres ? game.genres.join(", ") : "Sin géneros"}
      </p>
    </div>
  );
}

export default GameCard;

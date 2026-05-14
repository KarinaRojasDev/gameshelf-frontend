import GameListItem from "../GameListItem/GameListItem.jsx";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import styles from "./Tabs.module.css";

function Tabs({ gameList, reviews, onRemoveGame, onDeleteReview }) {
  return (
    <div className={styles.tabs}>
      <section className={styles.tabsGamesPanel}>
        <h2 className={styles.tabsTitle}>Lista de juegos ({gameList.length})</h2>
        {gameList.length === 0 ? (
          <p className={styles.tabsEmptyMessage}>No hay juegos en la lista</p>
        ) : (
          gameList.map((game) => (
            <GameListItem
              key={game.id}
              game={game}
              onRemove={() => onRemoveGame(game)}
            />
          ))
        )}
      </section>

      <section className={styles.tabsReviewsPanel}>
        <h2 className={styles.tabsTitle}>Reseñas ({reviews.length})</h2>
        {reviews.length === 0 ? (
          <p className={styles.tabsEmptyMessage}>No hay reseñas</p>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              showGameLink
              onDelete={() => onDeleteReview(review)}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default Tabs;

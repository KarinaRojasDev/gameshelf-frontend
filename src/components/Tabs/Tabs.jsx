import { useState } from "react";
import GameListItem from "../GameListItem/GameListItem.jsx";
import ReviewCard from "../ReviewCard/ReviewCard.jsx";
import styles from "./Tabs.module.css";

function Tabs({ gameList, reviews, onRemoveGame, onDeleteReview }) {
  const [activeTab, setActiveTab] = useState("games");
  return (
    <div className={styles.tabs}>
      {/* TABS HEADER */}
      <div className={styles.tabsHeader}>
        <button
          className={`${styles.tabsTab} ${activeTab === "games" ? styles.tabsTabActive : ""}`}
          onClick={() => setActiveTab("games")}
        >
          Juegos ({gameList.length})
        </button>
        <button
          className={`${styles.tabsTab} ${activeTab === "reviews" ? styles.tabsTabActive : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reseñas ({reviews.length})
        </button>
      </div>

      {/* PANEL JUEGOS */}
      {activeTab === "games" && (
        <section className={styles.tabsPanel}>
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
      )}

      {/* PANEL RESEÑAS */}
      {activeTab === "reviews" && (
        <section className={styles.tabsPanel}>
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
      )}
    </div>
  );
}

export default Tabs;

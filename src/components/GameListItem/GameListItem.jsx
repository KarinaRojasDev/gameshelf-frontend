import Button from "../Button/Button.jsx";
import GameCard from "../GameCard/GameCard.jsx";
import styles from "./GameListItem.module.css";

function GameListItem({ game, onRemove }) {
  return (
    <div className={styles.gameListItem}>
      <GameCard
        game={game}
        imageWidth="100"
        showRating={false}
        linkId={game.rawgId}
      />
      <p className={styles.gameListItemStatus}>Estado: {game.status}</p>
      <Button
        className={styles.gameListItemDeleteButton}
        variant="danger"
        onClick={onRemove}
      >
        Eliminar
      </Button>
    </div>
  );
}

export default GameListItem;

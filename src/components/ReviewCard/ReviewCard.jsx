import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import styles from "./ReviewCard.module.css";

function ReviewCard({ review, showGameLink = false, onDelete }) {
  return (
    <div className={styles.reviewCard}>
      {showGameLink && (
        <Link
          className={styles.reviewCardGameLink}
          to={`/games/${review.rawgId}`}
        >
          {review.gameName}
        </Link>
      )}
      <StarRating rating={review.rating} readOnly />
      <p className={styles.reviewCardContent}>{review.content}</p>
      <p className={styles.reviewCardDate}>{review.createdAt?.slice(0, 10)}</p>
      {onDelete && (
        <Button
          className={styles.reviewCardDeleteButton}
          variant="danger"
          onClick={onDelete}
        >
          Eliminar reseña
        </Button>
      )}
    </div>
  );
}

export default ReviewCard;

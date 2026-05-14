import Button from "../Button/Button.jsx";
import StarRating from "../StarRating/StarRating.jsx";
import styles from "./ReviewForm.module.css";

function ReviewForm({ review, setReview, onSubmit, reviewMessage }) {
  return (
    <div className={styles.reviewForm}>
      <h3 className={styles.reviewFormTitle}>Escribir reseña</h3>
      <StarRating
        rating={review.rating}
        onRatingChange={(star) =>
          setReview((prev) => ({ ...prev, rating: star }))
        }
      />
      <textarea
        className={styles.reviewFormTextarea}
        placeholder="Escribe tu reseña..."
        value={review.content}
        onChange={(e) =>
          setReview((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <Button className={styles.reviewFormSubmitButton} onClick={onSubmit}>
        Publicar reseña
      </Button>
      {reviewMessage && (
        <p className={styles.reviewFormMessage}>{reviewMessage}</p>
      )}
    </div>
  );
}

export default ReviewForm;

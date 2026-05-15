import styles from "./StarRating.module.css";

function StarRating({ rating, onRatingChange, readOnly = false }) {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          className={styles.starRatingStar}
          key={star}
          onClick={() => {
            if (!readOnly && typeof onRatingChange === "function") {
              onRatingChange(star);
            }
          }}
          data-active={star <= rating}
          data-read-only={readOnly}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating

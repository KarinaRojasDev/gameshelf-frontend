function StarRating({ rating, onRatingChange, readOnly = false }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readOnly && onRatingChange(star)}
          style={{ 
            cursor: readOnly ? 'default' : 'pointer',
            fontSize: '24px',
            color: star <= rating ? '#FFD700' : '#ccc'
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
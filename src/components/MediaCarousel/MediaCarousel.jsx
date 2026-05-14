import styles from "./MediaCarousel.module.css";

function MediaCarousel({ game }) {
  return (
    <div className={styles.mediaCarousel}>
      {/* Imagen principal */}
      <img
        className={styles.mediaCarouselMainImage}
        src={game.image}
        alt={game.name}
        width="400"
      />

      {/* Screenshots */}
      {game.screenshots?.length > 0 && (
        <div className={styles.mediaCarouselScreenshots}>
          <h3 className={styles.mediaCarouselScreenshotsTitle}>
            Screenshots
          </h3>
          {game.screenshots.map((img, index) => (
            <img
              className={styles.mediaCarouselScreenshot}
              key={index}
              src={img}
              alt={`${game.name} screenshot ${index + 1}`}
              width="300"
            />
          ))}
        </div>
      )}

      {/* Videos */}
      {game.videos?.length > 0 && (
        <div className={styles.mediaCarouselVideos}>
          <h3 className={styles.mediaCarouselVideosTitle}>Trailer</h3>
          <iframe
            className={styles.mediaCarouselVideo}
            width="560"
            height="315"
            src={game.videos[0]}
            title={game.name}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

export default MediaCarousel;

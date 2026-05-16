import { useState } from "react";
import styles from "./MediaCarousel.module.css";

function MediaCarousel({ game }) {
  const slides = [
  ...(game.videos?.map(src => ({ type: "video", src })) || []),
  { type: "image", src: game.image },
  ...(game.screenshots?.map(src => ({ type: "image", src })) || []),
];

  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent((i) => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[current];

  return (
  <div className={styles.mediaCarousel}>
    <div className={styles.mediaCarouselSlideWrapper}>
      {slide.type === "image" ? (
        <img className={styles.mediaCarouselSlide} src={slide.src} alt={game.name} />
      ) : (
        <iframe className={styles.mediaCarouselSlide} src={slide.src} title={game.name} allowFullScreen />
      )}
    </div>
    <div className={styles.mediaCarouselControls}>
      <button className={styles.mediaCarouselPrev} onClick={prev}>‹</button>
      <p className={styles.mediaCarouselCounter}>{current + 1} / {slides.length}</p>
      <button className={styles.mediaCarouselNext} onClick={next}>›</button>
    </div>
  </div>
);
}

export default MediaCarousel;
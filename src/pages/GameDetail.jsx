// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGameById,
  addGameToList,
  createReview,
  getGameReviews,
} from "../services/api";
import Spinner from "../components/Spinner/Spinner.jsx";
import Button from "../components/Button/Button.jsx";
import MediaCarousel from "../components/MediaCarousel/MediaCarousel.jsx";
import ReviewCard from "../components/ReviewCard/ReviewCard.jsx";
import ReviewForm from "../components/ReviewForm/ReviewForm.jsx";
import styles from "./GameDetail.module.css";

function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({ rating: 0, content: "" });
  const [reviewMessage, setReviewMessage] = useState("");
  const [gameReviews, setGameReviews] = useState([]);

  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
      .catch((err) => console.error(err));
    getGameReviews(id)
      .then((data) => setGameReviews(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!game || !game.name) return <Spinner />;

  const handleCreateReview = () => {
    if (review.rating === 0) {
      showMessage(setReviewMessage, "Selecciona una puntuación");
      return;
    }
    createReview({
      gameName: game.name,
      rawgId: Number(id),
      rating: Number(review.rating),
      content: review.content,
    })
      .then((data) => {
        showMessage(setReviewMessage, "Reseña creada ✓");
        setReview({ rating: 0, content: "" });
        setGameReviews((prev) => [...prev, data.review]);
      })
      .catch(() => showMessage(setReviewMessage, "Error al crear la reseña"));
  };

  const showMessage = (setter, text) => {
    setter(text);
    setTimeout(() => setter(""), 3000);
  };

  return (
    <main className={styles.gameDetailPage}>
      <h2 className={styles.gameDetailTitle}>{game.name}</h2>
      <MediaCarousel game={game} />
      <p className={styles.gameDetailRating}>Rating: {game.rating}</p>
      <p className={styles.gameDetailGenres}>
        Géneros: {game.genres?.join(", ") || "Sin géneros"}
      </p>

      <p className={styles.gameDetailPlatforms}>
        Plataformas: {game.platforms?.join(", ") || "Sin plataformas"}
      </p>
      <p className={styles.gameDetailReleased}>
        Fecha de lanzamiento: {game.released}
      </p>
      <p className={styles.gameDetailDescription}>{game.description}</p>
      <select
        className={styles.gameDetailStatusSelect}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pendiente</option>
        <option value="playing">Jugando</option>
        <option value="completed">Completado</option>
        <option value="abandoned">Abandonado</option>
        <option value="wishlist">Lista de deseos</option>
      </select>
      <Button
        onClick={() => {
          addGameToList({ rawgId: Number(id), status })
            .then(() => showMessage(setMessage, "Juego añadido a la lista ✓"))
            .catch(() => showMessage(setMessage, "Error al añadir el juego"));
        }}
      >
        Añadir a mi lista
      </Button>
      {message && <p className={styles.gameDetailMessage}>{message}</p>}
      <h3 className={styles.gameDetailReviewsTitle}>
        Reseñas ({gameReviews.length})
      </h3>
      {gameReviews.length === 0 ? (
        <p className={styles.gameDetailEmptyReviews}>No hay reseñas todavía</p>
      ) : (
        gameReviews.map((gameReview) => (
          <ReviewCard key={gameReview.id} review={gameReview} />
        ))
      )}
      <ReviewForm
        review={review}
        setReview={setReview}
        onSubmit={handleCreateReview}
        reviewMessage={reviewMessage}
      />
    </main>
  );
}
export default GameDetail;

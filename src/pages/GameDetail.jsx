// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getGameById,
  addGameToList,
  createReview,
  getGameReviews,
} from "../services/api";
import useAuth from "../context/useAuth.js";
import StarRating from "../components/StarRating.jsx";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState([]);
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({ rating: "", content: "" });
  const [reviewMessage, setReviewMessage] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
      .catch((err) => console.error(err));
    getGameReviews(id)
      .then((data) => setGameReviews(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!game || !game.name) return <p>Cargando...</p>;

  const handleCreateReview = () => {
    createReview({
      gameName: game.name,
      rawgId: Number(id),
      rating: Number(review.rating),
      content: review.content,
    })
      .then((data) => {
        showMessage(setReviewMessage, "Reseña creada ✓");
        setReview({ rating: "", content: "" });
        setGameReviews((prev) => [...prev, data.review]);
      })
      .catch(() => showMessage(setReviewMessage, "Error al crear la reseña"));
  };

  const showMessage = (setter, text) => {
    setter(text);
    setTimeout(() => setter(""), 3000);
  };

  return (
    <div>
      <h2>{game.name}</h2>
      {/* Imagen principal */}
      <img src={game.image} alt={game.name} width="400" />

      {/* Screenshots */}
      {game.screenshots?.length > 0 && (
        <div>
          <h3>Screenshots</h3>
          {game.screenshots.map((img, index) => (
            <img
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
        <div>
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={game.videos[0]}
            title={game.name}
            allowFullScreen
          />
        </div>
      )}
      <p>Rating: {game.rating}</p>
      <p>Géneros: {game.genres.join(", ")}</p>
      <p>Plataformas: {game.platforms.join(", ")}</p>
      <p>Fecha de lanzamiento: {game.released}</p>
      <p>{game.description}</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pendiente</option>
        <option value="playing">Jugando</option>
        <option value="completed">Completado</option>
        <option value="abandoned">Abandonado</option>
        <option value="wishlist">Lista de deseos</option>
      </select>
      <button
        onClick={() => {
          addGameToList({ rawgId: Number(id), status })
            .then(() => showMessage(setMessage, "Juego añadido a la lista ✓"))
            .catch(() => showMessage(setMessage, "Error al añadir el juego"));
        }}
      >
        Añadir a mi lista
      </button>
      {message && <p>{message}</p>}
      <h3>Reseñas ({gameReviews.length})</h3>
      {gameReviews.length === 0 ? (
        <p>No hay reseñas todavía</p>
      ) : (
        gameReviews.map((review) => (
          <div key={review.id}>
            <StarRating rating={review.rating} readOnly />
            <p>{review.content}</p>
            <p>{review.createdAt.slice(0, 10)}</p>
          </div>
        ))
      )}
      <h3>Escribir reseña</h3>
      <StarRating
        rating={review.rating}
        onRatingChange={(star) =>
          setReview((prev) => ({ ...prev, rating: star }))
        }
      />
      <textarea
        placeholder="Escribe tu reseña..."
        value={review.content}
        onChange={(e) =>
          setReview((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <button onClick={handleCreateReview}>Publicar reseña</button>
      {reviewMessage && <p>{reviewMessage}</p>}
    </div>
  );
}
export default GameDetail;

// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameById, addGameToList, createReview } from "../services/api";
import useAuth from "../context/useAuth.js";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState([]);
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({ rating: "", content: "" });
  const [reviewMessage, setReviewMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
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
      .then(() => {
        setReviewMessage("Reseña creada ✓");
        setReview({ rating: "", content: "" });
      })
      .catch(() => setReviewMessage("Error al crear la reseña"));
  };

  return (
    <div>
      <h2>{game.name}</h2>
      {game.media.type === "gallery" ? (
        game.media.images.map((img, index) => (
          <img key={index} src={img} alt={game.name} width="200" />
        ))
      ) : (
        <img src={game.media.image} alt={game.name} width="400" />
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
            .then(() => setMessage("Juego añadido a la lista ✓"))
            .catch(() => setMessage("Error al añadir el juego"));
        }}
      >
        Añadir a mi lista
      </button>
      {message && <p>{message}</p>}
      <h3>Escribir reseña</h3>
      <input
        type="number"
        min="1"
        max="10"
        placeholder="Rating (1-10)"
        value={review.rating}
        onChange={(e) =>
          setReview((prev) => ({ ...prev, rating: e.target.value }))
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

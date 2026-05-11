// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGameById } from "../services/api";

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    getGameById(id)
      .then((data) => setGame(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!game) return <p>Cargando...</p>;


  return (
    <div>
      <button onClick={() => navigate(-1)}>← Volver</button>
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
    </div>
  );
}
export default GameDetail;

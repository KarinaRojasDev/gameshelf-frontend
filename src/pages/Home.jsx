import { useEffect, useState } from "react";
import { getRandomGames, searchGames } from "../services/api";
import { Link } from "react-router-dom"

function Home() {
  const [games, setGames] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    getRandomGames()
      .then((data) => {
        setGames(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <input
        type="text"
        placeholder="Buscar juego..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (input.trim() === "") return;
          searchGames(input).then((data) => setGames(data));
        }}
      >
        Buscar
      </button>
      <button
        onClick={() => {
          setInput("");
          getRandomGames().then((data) => setGames(data));
        }}
      >
        Limpiar
      </button>
      <p>Juegos cargados: {games.length}</p>
      {games.map((game) => (
        <div key={game.id}>
          <img src={game.image} alt={game.name} width="200" />
          <Link to={`/games/${game.id}`}>
          <h2>{game.name}</h2>
          </Link>
          <p>Rating: {game.rating}</p>
          <p>Géneros: {game.genres.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;

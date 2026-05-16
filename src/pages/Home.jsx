import { useEffect, useState } from "react";
import { getRandomGames, searchGames } from "../services/api";
import Spinner from "../components/Spinner/Spinner.jsx";
import GameCard from "../components/GameCard/GameCard.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import styles from "./Home.module.css";

function Home() {
  const [games, setGames] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRandomGames()
      .then((data) => {
        setGames(data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.homePage}>
      {loading ? (
      <Spinner />
    ) : (
      <>
      <div className={styles.homePageHeader}>
        <h1 className={styles.homePageTitle}>Trending Now</h1>
        <SearchBar
          input={input}
          setInput={setInput}
          onSearch={() => {
            if (input.trim() === "") return;
            searchGames(input).then((data) => setGames(data));
          }}
          onClear={() => {
            setInput("");
            getRandomGames().then((data) => setGames(data));
          }}
        />
      </div>
      <div className={styles.homePageGames}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
      </>
      )}
    </main>
  );
}

export default Home;

import Button from "../Button/Button.jsx";
import styles from "./SearchBar.module.css";

function SearchBar({ input, setInput, onSearch, onClear }) {
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchBarInput}
        type="text"
        placeholder="Buscar juego..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button className={styles.searchBarSearchButton} onClick={onSearch}>
        Buscar
      </Button>
      <Button
        className={styles.searchBarClearButton}
        variant="secondary"
        onClick={onClear}
      >
        Limpiar
      </Button>
    </div>
  );
}

export default SearchBar;

import styles from "./SearchBar.module.css";

function SearchBar({ input, setInput, onSearch, onClear }) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBarInputWrapper}>
        <input
          className={styles.searchBarInput}
          type="text"
          placeholder="Buscar juego..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        {input && (
          <span className={styles.searchBarClear} onClick={onClear}>✕</span>
        )}
      </div>
    </div>
  );
}

export default SearchBar;

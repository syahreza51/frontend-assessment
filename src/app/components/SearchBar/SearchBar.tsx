import { useState } from "react";
import styles from "./searchbar.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={styles.searchBar}>
      <input
        id="search-bar"
        placeholder="search product ..."
        className={styles.input}
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;

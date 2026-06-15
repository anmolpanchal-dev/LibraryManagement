import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className="search-bar"
      type="text"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
    />
  );
};

export default SearchBar;
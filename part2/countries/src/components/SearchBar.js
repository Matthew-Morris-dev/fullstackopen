const SearchBar = (props) => {
    return (
        <div>
            find countries <input value={props.search} onChange={props.handleSearchChange} />
        </div>
    );
};

export default SearchBar;

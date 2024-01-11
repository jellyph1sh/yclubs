import "./SearchBox.css";

const SearchBox = () => {
    return (
        <div className="sb-box">
            <div className="sb-bar">
                <input type="text" name="sb" id="sb" placeholder="Bureau des sports..." />
                <img src="src/assets/images/search.svg" alt="search icon" onClick={() => {console.log("search")}} />
            </div>
            <img src="src/assets/images/filter-list.svg" alt="filter list icon" onClick={() => {console.log("popup filters")}}/>
        </div>
    );
};

export default SearchBox;
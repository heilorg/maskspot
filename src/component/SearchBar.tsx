import * as React from "react";

const searchBarStyle: React.CSSProperties = {
    width: "80%",
    height: 30,
    display: "flex",
    margin: "0 auto",
    marginTop: 20,
    padding: "10px 25px",
    backgroundColor: "white",
    borderRadius: 25,
    border: "2px solid #5e5e5e"
};

const searchItemStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none"
};

const SearchBar: React.FC = () => {
    return (
        <div id="searchBar" style={searchBarStyle}>
            <select name="" id="" style={searchItemStyle}>
                <option value="서울특별시">서울특별시</option>
            </select>
            <select name="" id="" style={searchItemStyle}>
                <option value="서울특별시"> 강남구</option>
            </select>
        </div>
    );
};

export default SearchBar;

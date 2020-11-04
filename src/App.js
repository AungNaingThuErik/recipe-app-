import React, {useEffect, useState} from "react";
import Recipe from "./Recipe"
import './App.css';

const App = () => {
  // API key info
  const APP_ID = "3571b243";
  const APP_KEY = "acbab5c29bfd1a73f012ebbd086c8234";


  // Web Hook States
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("chicken")

  // Load the data only when the submit button is pressed
  useEffect( () => {
    getReceipes();
  }, [query]);

  // Fetch the data
  const getReceipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  return(
    <div className="App">
      <h1>Recipes Book</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" required="required" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="Recipes">
        {recipes.map(recipe => (
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
      
    </div>
  );
}

export default App;

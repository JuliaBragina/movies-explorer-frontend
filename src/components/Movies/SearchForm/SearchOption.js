import './searchForm.css';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function SearchOption({ onFindMoviesOpt, onShortMovies, pathForIf }) {
  const location = useLocation();
  const [shortMovies, setShortMovies] = useState(false);
  let shortSvMovLocal = JSON.parse(localStorage.getItem('onlySavedShort'));
  let shortMovLocal = JSON.parse(localStorage.getItem('onlyShort'));

  useEffect(() => {
    if(pathForIf === 'movies') {
      setShortMovies(shortMovLocal);
    } else {
      setShortMovies(shortSvMovLocal);
    }
  }, []);
    
  function handleFindShordMovies(e) {
    setShortMovies(!shortMovies);
  }

  function handleSearchForm(e) {
    e.preventDefault();
    onFindMoviesOpt({
      shortMovies,
      location
    });
  }

  return(
    <form className="searchForm2" onInput={handleSearchForm}>
      <section className="searchFrom__searchOption"> 
        <label className="searchFrom__container">
          <div className="searchFrom__cont"></div>
          <input
            type="checkbox"
            id="checkbox"
            className="searchFrom__checkbox"
            checked={shortMovies}
            onChange={handleFindShordMovies}/>
          <div className="searchFrom__slider"></div>
        </label>
        <span className="searchFrom__text">Короткометражки</span>
      </section>
    </form>
  )
}

export default SearchOption;
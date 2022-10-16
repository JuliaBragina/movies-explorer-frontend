import './searchForm.css';
import searchImg from '../../../images/search-img.svg';
import { useForm } from "react-hook-form"; 
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function SerachMovies({ onFindMovies, onChangeSerachFrom, onShortMovies, pathForIf }) {
  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all'
  });

  let searcSavedhWordLocal = localStorage.getItem('searchSavedWord');
  let searchWordLocal = localStorage.getItem('searchWord');

  const location = useLocation();
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    if(pathForIf === 'movies') {
      setSearchWord(searchWordLocal);
    } else {
      setSearchWord('');
      localStorage.setItem('searchSavedWord', '');
    }
  }, [])

  function handleWriteSearchWord(e) {
    setSearchWord(e.target.value);
  }

  function handleSearchForm(e) {
    e.preventDefault();
    onFindMovies({
      searchWord,
      location
    });
  }

  return (
    <form className="searchForm" 
      onSubmit={handleSearchForm}>
      <section className="searchFrom__serachLine">
        <input
          {...register("search", {required: 'Поле обязательное для заполнения.'})}
            placeholder="Фильм" 
            type='search'
            className="searchForm__input"
            autoComplete="off"
            value={searchWord || ""}
            onChange={handleWriteSearchWord}>
        </input>
        <button type="submit" className="searchForm__button" disabled={!isValid} onClick={onChangeSerachFrom}>
          <img src={searchImg} alt="Поиск" className="searchForm__img"></img>
        </button>
        <span className='popupAuth__error popupAuth__error_forSearchForm'>{errors?.search?.message}</span>
      </section>
    </form>
  ) 
}

export default SerachMovies;
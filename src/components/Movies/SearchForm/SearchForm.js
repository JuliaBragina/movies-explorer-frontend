import './searchForm.css';
import searchImg from '../../../images/search-img.svg';
import { useForm } from "react-hook-form"; 
import React, { useState } from 'react';

function SearchForm({ onFindMovies, onChangeSerachFrom, onShortMovies }) {
  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all'
  });

  const [searchWord, setSearchWord] = useState('');
  const [shortMovies, setShortMovies] = useState(false);

  function handleWriteSearchWord(e) {
    setSearchWord(e.target.value);
  }

  function handleFindShordMovies(e) {
    setShortMovies(!shortMovies);
  }

  function handleSearchForm(e) {
    e.preventDefault();
    onFindMovies({
      searchWord,
      shortMovies
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
      <section className="searchFrom__searchOption"> 
        <label className="searchFrom__container">
          <div className="searchFrom__cont"></div>
          <input
            type="checkbox"
            id="checkbox"
            className="searchFrom__checkbox"
            checked={shortMovies}
            onChange={handleFindShordMovies} />
          <div className="searchFrom__slider"></div>
        </label>
        <span className="searchFrom__text">Короткометражки</span>
      </section>
    </form>
  ) 
}

export default SearchForm;

import './searchForm.css';
import searchImg from '../../../images/search-img.svg';

function SearchForm() {
  return (
    <form className="searchForm">
      <section className="searchFrom__serachLine">
        <input type="search" placeholder="Фильм" className="searchForm__input"></input>
        <button type="submit" className="searchForm__button">
          <img src={searchImg} alt="Поиск" className="searchForm__img"></img>
        </button>
      </section>
      <section className="searchFrom__searchOption"> 
        <label className="searchFrom__container">
          <div className="searchFrom__cont"></div>
          <input type="checkbox" id="checkbox" className="searchFrom__checkbox" />
          <div className="searchFrom__slider"></div>
        </label>
        <span className="searchFrom__text">Короткометражки</span>
      </section>
    </form>
  ) 
}

export default SearchForm;

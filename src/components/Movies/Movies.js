import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Add from './Add/Add.js';
import './main.css';

function Movies({ movies, onCardLike, path, onCardDelete, isMenuOpen }) {
  return(
    <main className={`${isMenuOpen && "main_burgerMenuIsOpen"}`}>
      <SearchForm />
      <MoviesCardList onCardLike={onCardLike} movies={movies} path={path} onCardDelete={onCardDelete} />
      <Add />
    </main>
  )
}

export default Movies;
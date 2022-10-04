import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Add from './Add/Add.js';
import './main.css';
import Preloader from '../Movies/Preloader/Preloader';

function Movies({ movies, onCardLike, pathForIf, onCardDelete, isMenuOpen, onFindMovies, savedMovies, onClickButton, onLoading, onChangeSerachFrom, onShortMovies, onDisableButton }) {
  return(
    <main className={`${isMenuOpen && "main_burgerMenuIsOpen"}`}>
      <SearchForm onFindMovies={onFindMovies} onShortMovies={onShortMovies} onChangeSerachFrom={onChangeSerachFrom}/>
      <>
        {
          onLoading
          ? <Preloader />
          : <MoviesCardList onCardLike={onCardLike} movies={movies} savedMovies={savedMovies} pathForIf={pathForIf} onCardDelete={onCardDelete} onLoading={onLoading} />
        }
      </>
      <>
          {
            pathForIf === 'movies' && <Add onClickButton={onClickButton} onDisableButton={onDisableButton}/>
          }
      </>
    </main>
  )
}

export default Movies;
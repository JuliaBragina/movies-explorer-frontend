import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Add from './Add/Add.js';
import './main.css';
import Preloader from '../Movies/Preloader/Preloader';

function Movies({ movies, onCardLike, pathForIf, onCardDelete, isMenuOpen, onFindMovies, onFindMoviesOpt, savedMovies, onClickButton, onLoading, onChangeSerachFrom, onShortMovies, onDisableButton, onDisableNotFound}) {

  return(
    <main className={`${isMenuOpen && "main_burgerMenuIsOpen"}`}>
      <SearchForm onFindMovies={onFindMovies} onFindMoviesOpt={onFindMoviesOpt} onShortMovies={onShortMovies} onChangeSerachFrom={onChangeSerachFrom} pathForIf={pathForIf}/>
      <>
        {
          onLoading
          ? <Preloader />
          : <MoviesCardList onCardLike={onCardLike} movies={movies} savedMovies={savedMovies} pathForIf={pathForIf} onCardDelete={onCardDelete} onLoading={onLoading} onDisableNotFound={onDisableNotFound}/>
        }
      </>
      <>
      {
        (onDisableButton && pathForIf === 'movies') && <Add onClickButton={onClickButton}/>
      }
      </>
    </main>
  )
}

export default Movies;
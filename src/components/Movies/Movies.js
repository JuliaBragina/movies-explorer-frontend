import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ movies, onCardLike, isCardLiked, path, onCardDelete }) {
  return(
    <>
      <SearchForm />
      <MoviesCardList onCardLike={onCardLike} movies={movies} path={path} onCardDelete={onCardDelete} />
    </>
  )
}

export default Movies;
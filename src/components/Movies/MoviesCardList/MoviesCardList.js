import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

//movies.array.forEach(element => {<MoviesCard key={element.id} movies={element}});

function MoviesCardList({ movies, onCardLike, isCardLiked, path, onCardDelete }) {
  return (
    <div className="moviesCardList">
        <>
          {
            movies.map((movie) => <MoviesCard key={movie.id} onCardLike={onCardLike} movie={movie} path={path} onCardDelete={onCardDelete} />)
          }
        </>
    </div> 
  )
}
  
export default MoviesCardList;
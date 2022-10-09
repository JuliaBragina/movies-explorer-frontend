import './moviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';

function MoviesCardList({ movies, onCardLike, pathForIf, onCardDelete, savedMovies }) {
  
  return (
    <div className="moviesCardList">
      <>
        {
          (pathForIf === 'savedMovies')
          ?  <>
                {
                  (savedMovies.length !== 0)
                    ? savedMovies.map((savedMovie) => <SavedMoviesCard key={savedMovie._id} savedMovie={savedMovie} onCardDelete={onCardDelete} />)
                    : <MoviesNotFound />
                }
             </>
          :  <>
                {
                  movies.length !== 0
                    ? movies.map((movie) => <MoviesCard key={movie.id} movie={movie} savedMovies={savedMovies} onCardLike={onCardLike}/>)
                    : <MoviesNotFound />
                }
             </>
        }
      </>
    </div> 
  )
}
  
export default MoviesCardList;
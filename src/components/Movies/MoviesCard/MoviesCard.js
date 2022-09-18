import './moviesCard.css';

function MoviesCard({ movie, onCardLike, path, onCardDelete }) {
  const isCardLiked = movie.liked === true;
  return (
    <div className="moviesCard">
      <div style={{ backgroundImage: `url(${movie.url})`}} alt="фильм" className="moviesCard__img" />
      <section className="moviesCard__cont">
        <p className='moviesCard__nameFilm'>{movie.nameRU}</p>
        {
          (path === 'savedMovies')
          ? <>
              <button type="button" aria-label = "Удалить" className="moviesCard__btnLike moviesCard__btnLike_isDeleted" onClick={_=>onCardDelete(movie.id)}>
                <div alt="deleteButton" className="moviesCard__btnImg moviesCard__btnImg_isDeleted"></div>
              </button>
            </>
          : <>
               <button type="button" aria-label = "Нравится" className="moviesCard__btnLike moviesCard__btnLike_isLiked" onClick={_=>onCardLike(movie)}>
                 <div className={`moviesCard__btnImg ${isCardLiked && 'moviesCard__btnImg_isLiked'}`}></div>
               </button>
            </>
        }
      </section>
      <p className='moviesCard__time'>{movie.duration}</p>
    </div> 
  )
}

export default MoviesCard;
import './moviesCard.css';
import React from 'react';

function MoviesCard({ movie, onCardLike, savedMovies }) {
  console.log(savedMovies);
  const isCardLiked = savedMovies.some(i => i.movieId === movie.id);
  
  return (
    <div className="moviesCard">
      <a href={movie.trailerLink} target='_blank'><img src={'https://api.nomoreparties.co' + movie.image.url} alt="фильм" className="moviesCard__img" /></a>
      <section className="moviesCard__cont">
        <p className='moviesCard__nameFilm'>{movie.nameRU}</p>
        <button type="button" aria-label = "Нравится" className="moviesCard__btnLike moviesCard__btnLike_isLiked" onClick={_=>onCardLike(movie)}>
          <div className={`moviesCard__btnImg ${isCardLiked && 'moviesCard__btnImg_isLiked'}`}></div>
        </button>
      </section>
      <p className='moviesCard__time'>{movie.duration}</p>
    </div> 
  )
}

export default MoviesCard;
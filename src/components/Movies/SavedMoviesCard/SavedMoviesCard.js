import './moviesCard.css';
import React from 'react';

function SavedMoviesCard({ savedMovie, onCardDelete }) {

  return (
    <div className="moviesCard">
      <img src={savedMovie.image} alt="фильм" className="moviesCard__img" />
      <section className="moviesCard__cont">
        <p className='moviesCard__nameFilm'>{savedMovie.nameRU}</p>
        <button type="button" aria-label = "Удалить" className="moviesCard__btnLike moviesCard__btnLike_isDeleted" onClick={_=>onCardDelete(savedMovie.movieId, savedMovie._id)}>
          <div alt="deleteButton" className="moviesCard__btnImg moviesCard__btnImg_isDeleted"></div>
        </button>
      </section>
      <p className='moviesCard__time'>{savedMovie.duration}</p>
    </div> 
  )
}

export default SavedMoviesCard;
import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import HeaderLanding from '../HeaderLanding/HeaderLanding';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Account from '../Account/Account';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import '../../vendor/page.css';
import NotFound from '../NotFound/NotFound';
import movies from '../../utils/movies';
import savedMovies from '../../utils/savedMovies';

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cardsMovies, setCardsMovies] = useState([]);
  const [cardsSavedMovies, setCardsSavedMovies] = useState([]);

  useEffect(() => {
    setCardsMovies(movies);
    setCardsSavedMovies(savedMovies);
  }, []);   

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleCardLike = (movie) => {
    if (!movie.liked) {
      movie.liked = true;
    } else {
      movie.liked = false;
    }
    setCardsMovies((movie) => movies.map((c) => c.id === movie.id ? movie : c));
  }

  const hadleDeleteCard = (idMovie) => {
    setCardsSavedMovies(movies => movies.filter(c => c.id !== idMovie));
  }

  return (
    <div className="app">
      <div className="page">
        <Switch>
          <Route exact path="/">
            <HeaderLanding />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header isMenuOpen={isMenuOpen} onOpenMenu={handleOpenMenu}/>
            <Movies onCardLike={handleCardLike} movies={cardsMovies}/>
            <Footer />
          </Route>
          <Route path="/savedMovies">
            <Header isMenuOpen={isMenuOpen} onOpenMenu={handleOpenMenu}/>
            <Movies movies={cardsSavedMovies} onCardDelete={hadleDeleteCard} path='savedMovies'/>
            <Footer />
          </Route>
          <Route path="/myAccount">
            <Header isMenuOpen={isMenuOpen} onOpenMenu={handleOpenMenu}/>
            <Account />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route exact path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;

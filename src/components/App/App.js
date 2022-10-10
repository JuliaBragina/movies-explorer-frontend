import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route, useLocation } from "react-router-dom";
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import HeaderLanding from '../HeaderLanding/HeaderLanding';
import ProtectedRouteMovies from '../ProtectedRouteMovies';
import ProtectedRouteSavedMovies from '../ProtectedRouteSavedMovied';
import ProtectedRouteAccount from '../ProtectedRouteAccount';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Account from '../Account/Account';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import '../../vendor/page.css';
import NotFound from '../NotFound/NotFound';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cardsMoviesFiltr, setCardsMoviesFiltr] = useState([]);
  const [switchOnSwortMovies, setSwitchOnSwortMovies] = useState(localStorage.getItem('onlyShort') || false);
  const [switchOnSwortSavedMovies, setSwitchOnSwortSavedMovies] = useState(localStorage.getItem('onlySavedShort') || false);
  const [currenUser, setCurrentUser] = useState({});
  const [testState, setTestState] = useState([]);
  const [testStateSave, setTestStatSave] = useState([]);
  const [disableButtonAdd, setDisableButtonAdd] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changeSearchFrom, setChangeSearchForm] = useState(true);
  const [cardsMoviesFiltrCount, setCardsMoviesFiltrCount] = useState(false);
  const [countMovies, setCountMovies] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [countCardsAdd, setCountCardsAdd] = useState({firstCount: 12, nextCount: 4});
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);

  useEffect(() => {
    setDisableButtonAdd(true);
  }, [switchOnSwortMovies]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
  }, [width]);

  useEffect(() => {
    if (width === 1280) {
      setCountCardsAdd({firstCount: 12, nextCount: 4});
    }
    if ((1025 <= width)&&(width <= 1279)) {
      setCountCardsAdd({firstCount: 12, nextCount: 3});
    }
    if ((581 <= width)&&(width <= 1024)) {
      setCountCardsAdd({firstCount: 8, nextCount: 2});
    }
    if ((320 <= width)&&(width <= 580)) {
      setCountCardsAdd({firstCount: 5, nextCount: 2});
    }
  }, [width]);

  useEffect(() => {
    setSwitchOnSwortMovies(localStorage.getItem('onlyShort'));
  }, [switchOnSwortMovies]);

  useEffect(() => {
    setSwitchOnSwortSavedMovies(localStorage.getItem('onlySavedShort'));
  }, [switchOnSwortSavedMovies]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getSavedMovies()
      .then(movies => {
        setTestState(movies);
        setTestStatSave(movies);
        localStorage.setItem('savedMovies', JSON.stringify(movies));
      })
      .catch(err => console.log(err));

      mainApi.getMe()
      .then(user => {
        history.push(location.pathname);
        setLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(err => {
        history.push('/signin');
        setLoggedIn(false)
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    mainApi.getMe()
    .then(user => {
      history.push(location.pathname);
      setLoggedIn(true);
      setCurrentUser(user);
    })
    .catch(err => {
      history.push('/signin');
      setLoggedIn(false)
    });
  }, [loggedIn]);

  useEffect(() => {
    mainApi.getSavedMovies()
    .then(movies => {
      setTestState(movies);
      setTestStatSave(movies);
      localStorage.setItem('savedMovies', JSON.stringify(movies));
    })
    .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    } else {
      history.push('/signin');
    }
  }, [loggedIn]);

  const handleResizeWindow = () => setWidth(window.innerWidth);

  useEffect(() => {
    localStorage.setItem('searchSavedWord', '');
    localStorage.setItem('searchWord', '');
    localStorage.setItem('filterMovies', '');
  }, []);

  useEffect(() => {
    let searchSavedWord = localStorage.getItem('searchSavedWord');
    if(searchSavedWord.indexOf('undefined') === -1 ) {
      handleFiltrSavedMovies({ searchWord: searchSavedWord, location: 'savedMovies' });
    }
  }, [switchOnSwortSavedMovies]);

  useEffect(() => {
    let searchWord = localStorage.getItem('searchWord');
    if((searchWord.indexOf('undefined') === -1 )&&(searchWord !== '')) {
      handleFiltrMovies({ searchWord: searchWord, location: 'movies' });
    }
  }, [switchOnSwortMovies]);

  const handleFindShordSavedMovies = (shortMovies) => {
    setSwitchOnSwortSavedMovies(shortMovies.shortMovies);
    localStorage.setItem('onlySavedShort', JSON.stringify(shortMovies.shortMovies));
  }

  const handleFindShordMovies = (searchWord) => {
    setSwitchOnSwortMovies(searchWord.shortMovies);
    localStorage.setItem('onlyShort', JSON.stringify(searchWord.shortMovies));
  }

  async function handleFiltrMovies(searchWord) {
    console.log(searchWord);
    setIsLoading(true);
    if ((localStorage.getItem('movies') === null)) {
      await moviesApi.getAllCards()
      .then(res => {
        localStorage.setItem('movies', JSON.stringify(res));
      })
      .catch(err =>{
        setIsRegPopupOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false));
    }

    handleLoadingMovies(searchWord);
    setIsLoading(false);
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleChangeSearchForm = () => {
    setChangeSearchForm(true);
    setDisableButtonAdd(true);
  }

  const handleCloseButton = () => {
    setIsRegPopupOpen(false);
  }

  function handleFiltrSavedMovies(searchWord) {
    let massSavedLocal = []
    let massSavedLocalSort = [];
    localStorage.setItem('searchSavedWord', searchWord.searchWord);
    let shortSavedMovies = localStorage.getItem('onlySavedShort');
    if ((localStorage.getItem('savedMovies') !== null)) {
      massSavedLocal = JSON.parse(localStorage.getItem('savedMovies'));
      massSavedLocal.forEach(item => {
        if ((item.nameRU.toLowerCase().indexOf(searchWord.searchWord.toLowerCase()) !== -1)) {
          if (shortSavedMovies.indexOf(true) !== -1) {
             if(item.duration <= 40) {
              massSavedLocalSort.push(item);
             }
          } else {
            massSavedLocalSort.push(item);
          }
        }
      });
      console.log(massSavedLocalSort);
      localStorage.setItem('filtrSavedMovies', JSON.stringify(massSavedLocalSort));
      setTestState(massSavedLocalSort);
    }
  }

  function handleLoadingMovies(searchWord) {
    let massLocal = [];
    let massLocalSort = [];
    let shortSavedMovies = localStorage.getItem('onlyShort');
    localStorage.setItem('searchWord', searchWord.searchWord);
    massLocal = JSON.parse(localStorage.getItem('movies'));
    massLocal.forEach(item => {
      if ((item.nameRU.toLowerCase().indexOf(searchWord.searchWord.toLowerCase()) !== -1)) {
        if(shortSavedMovies.indexOf(true) !== -1) {
          if(item.duration <= 40) {
            massLocalSort.push(item);
          }
        } else {
          massLocalSort.push(item);
        }
      }
    });
    setCardsMoviesFiltr(massLocalSort);
    localStorage.setItem('filterMovies', JSON.stringify(massLocalSort));
    preRenderCardsOptions(countCardsAdd.firstCount);
  }


  function preRenderCardsOptions (count) {
    console.log(disableButtonAdd);
    setCardsMoviesFiltrCount([]);
    let matrix = [];
    let filterMovies = JSON.parse(localStorage.getItem('filterMovies'));

    if (filterMovies.length < count) {
      console.log(filterMovies.length, count)
      count = filterMovies.length;
      setDisableButtonAdd(false);
    }

    if(filterMovies.length === count) {
      console.log(filterMovies.length, count)
      setDisableButtonAdd(false);
    }

    for (let i = 0; i < count; i++) {
      matrix.push(filterMovies[i]);
    }
    setCountMovies(count);
    setCardsMoviesFiltrCount(matrix);
  }

  function renderCardsOptions() {
    let matrix = [];
    let filterMovies = JSON.parse(localStorage.getItem('filterMovies'));
    let count = countCardsAdd.nextCount;
    let tempCountMovies = countMovies;

    if (filterMovies.length - tempCountMovies < 4) {
      count = filterMovies.length - tempCountMovies;
    }

    if (filterMovies.length === tempCountMovies + count) {
      console.log(filterMovies.length, tempCountMovies + count)
      setDisableButtonAdd(false);
    }
    
    for (let i = 0; i < tempCountMovies + count; i++) {
      matrix.push(filterMovies[i]);
      if( i === tempCountMovies + count ) {
        console.log(tempCountMovies + count)
        setDisableButtonAdd(false);
      }
    }

    setCountMovies(tempCountMovies + count);
    setCardsMoviesFiltrCount(matrix);
  }

  const handleRegisterUser = (data) => {
    setIsLoading(true);
    mainApi.register(data.name, data.email, data.password)
    .then((newUser) => {
      if (newUser) {
        setCurrentUser(newUser);
        mainApi.login(data.email, data.password)
        .then((res) => {
          if(res){
            history.push('/movies');
          } else {
            console.log('токена нет');
          }
        })
        .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
      setIsRegPopupOpen(true);
    })
    .finally(() => setIsLoading(false));
  }

  const handleLoginUser = (data) => {
    setIsLoading(true);
    mainApi.login(data.email, data.password)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        history.push('/movies');
      } else {
        console.log('токена нет');
        setLoggedIn(false);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsRegPopupOpen(true);
    })
    .finally(() => setIsLoading(false));
  }

  function handleLogout() {
    console.log('logout');
    setIsLoading(true);
    mainApi.logout()
    .then((res) => {
      history.push('/');
      setLoggedIn(false);
      console.log(res);
      localStorage.clear();
    })
    .catch((err) => {
      console.log(err);
      setIsRegPopupOpen(true);
    })
    .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(newData) {
    setIsLoading(true);
    mainApi.updateUser(newData.email, newData.name)
    .then((newUser) => setCurrentUser(newUser))
    .catch((err) => {
      console.log(err);
      setIsRegPopupOpen(true);
    })
    .finally(() => setIsLoading(false));
  }

  function handleCardLikeDisLike (movie) {
    let temp = 0;
    let mId = 0;
    let isCardLiked = false;

    testState.forEach((i) => {
      if (i.movieId === movie.id) {
        temp=i;
        isCardLiked = true;
        mId = temp._id;
      }
    });

    if (isCardLiked) {
      handleDeleteMovie(movie.id, mId);
    } else {
      handleCardLike(movie);
    }
  }

  function handleCardLike(movie) {
    mainApi.setLikeMovie(movie.country, movie.director, movie.duration, movie.year, movie.description, movie.image.url, movie.trailerLink, movie.id, movie.image.url, movie.nameRU, movie.nameEN)
      .then((newCard) => {
        setTestState([newCard, ...testState]);
        setTestStatSave([newCard, ...testState]);
    })
    .catch(err => {
      setIsRegPopupOpen(true);
      console.log(err);
    });
  }

  function handleDeleteMovie(movieID, mId) {
    mainApi.deleteLike(mId)
    .then(() => {
      setTestState(movie => movie.filter(c => c.movieId !== movieID));
    })
    .catch((err) => {
      setIsRegPopupOpen(true);
      console.log(err);
    });
  }
  
  return (
    <CurrenUserContext.Provider value={currenUser}>
      <div className="app">
        <div className="page">
          <Switch>
            <Route exact path="/">
              <> 
                {
                  loggedIn 
                  ? <Header isMenuOpen = {isMenuOpen} onOpenMenu = {handleOpenMenu}/>
                  : <HeaderLanding />
                }
              </>
              <Main/>
              <Footer />
            </Route>
            <ProtectedRouteMovies exact path="/movies"
              loggedIn={loggedIn}
              componentHeader = {Header}
              componentMain = {Movies}
              componentFooter = {Footer}
              isMenuOpen = {isMenuOpen}
              onOpenMenu = {handleOpenMenu}
              onCardLike = {handleCardLikeDisLike}
              movies = {cardsMoviesFiltrCount ? cardsMoviesFiltrCount : cardsMoviesFiltr}
              savedMovies = {testStateSave}
              onFindMovies = {handleFiltrMovies}
              onFindMoviesOpt = {handleFindShordMovies}
              pathForIf = 'movies'
              onClickButton = {renderCardsOptions}
              onLoading = {isLoading}
              onShortMovies = {switchOnSwortMovies}
              onChangeSerachFrom={handleChangeSearchForm}
              onDisableButton = {disableButtonAdd}>
            </ProtectedRouteMovies>
            <ProtectedRouteSavedMovies exact path="/savedMovies"
              loggedIn={loggedIn}
              componentHeader = {Header}
              componentMain = {Movies}
              componentFooter = {Footer}
              isMenuOpen={isMenuOpen}
              onOpenMenu={handleOpenMenu}
              onCardDelete = {handleDeleteMovie}
              onShortMovies = {switchOnSwortSavedMovies}
              savedMovies={testState}
              onFindMovies = {handleFiltrSavedMovies}
              onFindMoviesOpt = {handleFindShordSavedMovies}
              pathForIf='savedMovies'>
            </ProtectedRouteSavedMovies>
            <ProtectedRouteAccount exact path="/myAccount"
              loggedIn={loggedIn}
              componentHeader = {Header}
              componentAccount = {Account}
              isMenuOpen = {isMenuOpen}
              onOpenMenu = {handleOpenMenu}
              onUpdateForm = {handleUpdateUser}
              onLogout = {handleLogout} 
              onLoading = {isLoading} >
            </ProtectedRouteAccount>
            <Route path="/signup">
              <Register onRegisterUser={handleRegisterUser} onLoading = {isLoading}/>
            </Route>
            <Route path="/signin">
              <Login onLoginUser={handleLoginUser} onLoading = {isLoading}/>
            </Route>
            <Route exact path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>

        <InfoTooltip
          isOpen={isRegPopupOpen}
          onClose={handleCloseButton} />

      </div>
    </CurrenUserContext.Provider>
  )
}

export default App;

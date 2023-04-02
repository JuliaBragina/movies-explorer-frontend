import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
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
import { MAXWIDTH, PREMAXWIDTH, MIDDLEWIDTH, PREMIDDLEWIDTH, TABLETWIDTH, PRETABLETWIDTH, MINWIDTH, MAXCOUNTPRERENDER, MIDDLECOUNTRERENDER, MINCOUNTRERENDER, MAXCOUNT, MIDDLECOUNT, MINCOUNT, DURATIONSHORTMOVIES } from '../../utils/constants';

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cardsMoviesFiltr, setCardsMoviesFiltr] = useState([]);
  const [switchOnSwortMovies, setSwitchOnSwortMovies] = useState(localStorage.getItem('onlyShort') || false);
  const [switchOnSwortSavedMovies, setSwitchOnSwortSavedMovies] = useState(localStorage.getItem('onlySavedShort') || false);
  const [currenUser, setCurrentUser] = useState({});
  const [testState, setTestState] = useState([]);
  const [testStateSave, setTestStatSave] = useState([]);
  const [disableButtonAdd, setDisableButtonAdd] = useState(true);
  const [disableNotFound, setDisableNotFound] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') ? localStorage.getItem('loggedIn').toLowerCase() === 'true' : false);
  const [isLoading, setIsLoading] = useState(false);
  const [changeSearchFrom, setChangeSearchForm] = useState(true);
  const [cardsMoviesFiltrCount, setCardsMoviesFiltrCount] = useState(false);
  const [countMovies, setCountMovies] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [countCardsAdd, setCountCardsAdd] = useState({firstCount: MAXCOUNTPRERENDER, nextCount: MAXCOUNT});
  const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [changeCardStatus, setChangeCardStatus] = useState(false);
  const [showSavedRes, setShowSavedRes] =  useState(false);


  useEffect(() => {
    console.log("loggedIn1 is " + loggedIn);
    if (loggedIn) {
      mainApi.getMe()
        .then(user => {
          setCurrentUser(user);
          mainApi.getSavedMovies()
          .then(movies => {
            setTestState(movies);
            setTestStatSave(movies);
            localStorage.setItem('savedMovies', JSON.stringify(movies));
          })
          .catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          setLoggedIn(false);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      //history.push('/movies');
    } else {
      history.push('/');
      setCurrentUser({});
      localStorage.clear();
    }
  }, [loggedIn]);

  useEffect(() => {
    setDisableButtonAdd(true);
  }, [switchOnSwortMovies]);

  useEffect(() => {
    setDisableButtonAdd(false);
    setDisableNotFound(true);
  }, [loggedIn]);

  useEffect(() => {
    setShowSavedRes(false);
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
  }, [width]);

  useEffect(() => {
    if (width === MAXWIDTH) {
      setCountCardsAdd({firstCount: MAXCOUNTPRERENDER, nextCount: MAXCOUNT});
    }
    if ((1025 <= MIDDLEWIDTH)&&(width <= PREMAXWIDTH)) {
      setCountCardsAdd({firstCount: MAXCOUNTPRERENDER, nextCount: MIDDLECOUNT});
    }
    if ((TABLETWIDTH <= width)&&(width <= PREMIDDLEWIDTH)) {
      setCountCardsAdd({firstCount: MIDDLECOUNTRERENDER, nextCount: MINCOUNT});
    }
    if ((MINWIDTH <= width)&&(width <= PRETABLETWIDTH)) {
      setCountCardsAdd({firstCount: MINCOUNTRERENDER, nextCount: MINCOUNT});
    }
  }, [width]);

  useEffect(() => {
    setSwitchOnSwortMovies(localStorage.getItem('onlyShort'));
  }, [switchOnSwortMovies]);

  useEffect(() => {
    setSwitchOnSwortSavedMovies(localStorage.getItem('onlySavedShort'));
  }, [switchOnSwortSavedMovies]);

  useEffect(() => {
    mainApi.getSavedMovies()
    .then(movies => {
      setTestState(movies);
      setTestStatSave(movies);
      localStorage.setItem('savedMovies', JSON.stringify(movies));
    })
    .catch(err => console.log(err));
  }, [changeCardStatus]);

  const handleResizeWindow = () => setWidth(window.innerWidth);

  useEffect(() => {
    let searchSavedWord = localStorage.getItem('searchSavedWord');
    if((searchSavedWord !== null) && (searchSavedWord.indexOf('undefined') === -1 )) {
      handleFiltrSavedMovies({ searchWord: searchSavedWord, location: 'savedMovies' });
    }
  }, [switchOnSwortSavedMovies]);

  useEffect(() => {
    setDisableNotFound(false);
    let searchWord = localStorage.getItem('searchWord');
    if((searchWord !== null) && (searchWord.indexOf('undefined') === -1 )&&(searchWord !== '')) {
      handleFiltrMovies({ searchWord: searchWord, location: 'movies' });
    }
  }, [switchOnSwortMovies]);

  const handleFindShordSavedMovies = (shortMovies) => {
    setShowSavedRes(true);
    setSwitchOnSwortSavedMovies(shortMovies.shortMovies);
    localStorage.setItem('onlySavedShort', JSON.stringify(shortMovies.shortMovies));
  }

  const handleFindShordMovies = (searchWord) => {
    setDisableNotFound(false);
    setSwitchOnSwortMovies(searchWord.shortMovies);
    localStorage.setItem('onlyShort', JSON.stringify(searchWord.shortMovies));
  }

  async function handleFiltrMovies(searchWord) {
    console.log(searchWord);
    setIsLoading(true);
    if ((localStorage.getItem('movies') === null)) {
      await moviesApi.getAllCards()
      .then(res => {
        setDisableNotFound(false);
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
    setDisableNotFound(false);
  }

  const handleCloseButton = () => {
    setIsRegPopupOpen(false);
  }

  function handleFiltrSavedMovies(searchWord) {
    setShowSavedRes(true);
    let massSavedLocal = []
    let massSavedLocalSort = [];
    localStorage.setItem('searchSavedWord', searchWord.searchWord);
    let shortSavedMovies = localStorage.getItem('onlySavedShort');
    if (searchWord.searchWord === null) {
      shortSavedMovies = 'false';
    }
    if ((localStorage.getItem('savedMovies') !== null)) {
      massSavedLocal = JSON.parse(localStorage.getItem('savedMovies'));
      massSavedLocal.forEach(item => {
        if ((item.nameRU.toLowerCase().indexOf(searchWord.searchWord.toLowerCase()) !== -1)) {
          if (shortSavedMovies.indexOf(true) !== -1) {
             if(item.duration <= DURATIONSHORTMOVIES) {
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
    setDisableNotFound(false);
    if (shortSavedMovies === null) {
      shortSavedMovies = 'false';
    }
    localStorage.setItem('searchWord', searchWord.searchWord);
    massLocal = JSON.parse(localStorage.getItem('movies'));
    massLocal.forEach(item => {
      if ((item.nameRU.toLowerCase().indexOf(searchWord.searchWord.toLowerCase()) !== -1)) {
        if(shortSavedMovies.indexOf(true) !== -1) {
          if(item.duration <= DURATIONSHORTMOVIES) {
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
    setDisableNotFound(false);
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
            setLoggedIn(true);
            localStorage.setItem("loggedIn", true);
            history.push('/movies');
          } else {
            console.log('токена нет');
            setLoggedIn(false);
            localStorage.setItem("loggedIn", false);
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
        localStorage.setItem("loggedIn", true);
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

  const handleLogout = () => {
    setIsLoading(true);
    mainApi.logout()
    .then((res) => {
      history.push('/');
      setLoggedIn(false);
      localStorage.setItem("loggedIn", false);
      setCurrentUser({});
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
    .then((newUser) => {
      setCurrentUser(newUser);
      setIsRegPopupOpen(true);
      setIsUpdateUser(true);
    })
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
        setChangeCardStatus(true);
        setTestState([newCard, ...testState]);
        setTestStatSave([newCard, ...testState]);
        localStorage.setItem('savedMovies', JSON.stringify(testStateSave));
    })
    .catch(err => {
      setIsRegPopupOpen(true);
      console.log(err);
    });
  }

  function handleDeleteMovie(movieID, mId) {
    mainApi.deleteLike(mId)
    .then(() => {
      setChangeCardStatus(true);
      setTestState(movie => movie.filter(c => c.movieId !== movieID));
      setTestStatSave(movie => movie.filter(c => c.movieId !== movieID));
      localStorage.setItem('savedMovies', JSON.stringify(testStateSave));
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
            <ProtectedRouteMovies path="/movies"
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
              onDisableButton = {disableButtonAdd}
              onDisableNotFound={disableNotFound}>
            </ProtectedRouteMovies>
            <ProtectedRouteSavedMovies path="/savedMovies"
              loggedIn={loggedIn}
              componentHeader = {Header}
              componentMain = {Movies}
              componentFooter = {Footer}
              isMenuOpen={isMenuOpen}
              onOpenMenu={handleOpenMenu}
              onCardDelete = {handleDeleteMovie}
              onShortMovies = {switchOnSwortSavedMovies}
              savedMovies={showSavedRes ? testState : testStateSave}
              onFindMovies = {handleFiltrSavedMovies}
              onFindMoviesOpt = {handleFindShordSavedMovies}
              pathForIf='savedMovies'>
            </ProtectedRouteSavedMovies>
            <ProtectedRouteAccount path="/myAccount"
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
              <Register onRegisterUser={handleRegisterUser} onLoading={isLoading}/>
            </Route>
            <Route path="/signin">
              <Login onLoginUser={handleLoginUser} onLoading={isLoading}/>
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>

        <InfoTooltip
          isOpen={isRegPopupOpen}
          onClose={handleCloseButton}
          updateUserInf={isUpdateUser} />

      </div>
    </CurrenUserContext.Provider>
  )
}

export default App;
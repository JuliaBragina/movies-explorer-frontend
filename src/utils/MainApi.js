class MainApi { 
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject(res);
  }

  getAllCards() {
    return fetch (this._url, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch (this._url + '/movies', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers
    }).then(this._checkResponse);
  }

  setLikeMovie( country, director, duration, year, description, imageUrl, trailerLink, movieId, imageUrl2, nameRU, nameEN ) {
    return fetch (this._url + '/movies', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: 'https://api.nomoreparties.co' + imageUrl,
        trailerLink: trailerLink,
        movieId: movieId,
        thumbnail: 'https://api.nomoreparties.co' + imageUrl2,
        nameRU: nameRU,
        nameEN: nameEN })
    }).then(this._checkResponse);
  };

  register( name, email, password ) {
    return fetch (this._url + '/signup', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    }).then(this._checkResponse);
  };

  login(email, password) {
    return fetch(this._url + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    }).then(this._checkResponse);
  };

  getMe() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };

  logout() {
    return fetch(this._url + '/signout', {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  };

  updateUser(email, name) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({email, name}),
    }).then(this._checkResponse);
  };

  deleteLike(movieId) {
    return fetch(this._url + `/movies/${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._checkResponse);
  }
  
}

const mainApi = new MainApi({
  url: 'https://api.prkmovies.space',
  headers: {
    "Content-Type": "application/json"
  }
});

export default mainApi;
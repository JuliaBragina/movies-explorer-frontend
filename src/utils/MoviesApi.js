class MoviesApi { 
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse = (res) => {
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  }

  getAllCards() {
    return fetch (this._url, {
      method: 'GET',
      headers: this._headers
    }).then(this._checkResponse);
  }
}


const mainApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    "Content-Type": "application/json"
  }
});

export default mainApi;
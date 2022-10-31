import './searchForm.css';
import SearchMovies from './SerachMovies';
import SearchOption from './SearchOption';

function SearchForm({ onFindMovies, onFindMoviesOpt, onChangeSerachFrom, onShortMovies, pathForIf }) {
  return (
    <>
      <SearchMovies onFindMovies={onFindMovies} onChangeSerachFrom={onChangeSerachFrom} pathForIf={pathForIf}/>
      <SearchOption onFindMoviesOpt={onFindMoviesOpt} onShortMovies={onShortMovies} pathForIf={pathForIf}/>
    </>
  ) 
}

export default SearchForm;

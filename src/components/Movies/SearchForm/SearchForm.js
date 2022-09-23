import './searchForm.css';
import searchImg from '../../../images/search-img.svg';
import { useForm } from "react-hook-form"; 

function SearchForm() {
  const { register, handleSubmit, formState: {errors, isValid}, reset } = useForm({
    mode: 'all'
  });

  const onSubmit = () => reset();

  return (
    <form className="searchForm" onSubmit={handleSubmit(onSubmit)}>
      <section className="searchFrom__serachLine">
        <input
          {...register("search", {required: 'Поле обязательное для заполнения.'})}
            placeholder="Фильм" 
            type='search'
            className="searchForm__input"
            autoComplete="off">
        </input>
        <button type="submit" className="searchForm__button" disabled={!isValid}>
          <img src={searchImg} alt="Поиск" className="searchForm__img"></img>
        </button>
        <span className='popupAuth__error popupAuth__error_forSearchForm'>{errors?.search?.message}</span>
      </section>
      <section className="searchFrom__searchOption"> 
        <label className="searchFrom__container">
          <div className="searchFrom__cont"></div>
          <input type="checkbox" id="checkbox" className="searchFrom__checkbox" />
          <div className="searchFrom__slider"></div>
        </label>
        <span className="searchFrom__text">Короткометражки</span>
      </section>
    </form>
  ) 
}

export default SearchForm;

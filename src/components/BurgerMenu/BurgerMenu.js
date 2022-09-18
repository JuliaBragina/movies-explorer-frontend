import { Link } from 'react-router-dom';
import account from '../../images/account.svg';
import './burgerMenu.css';

function BurgerMenu({ isMenuOpen, onOpenMenu }) {
  return(
    <div className={`burgerMenu ${isMenuOpen && "burgerMenu_isOpen"}`}>
      <button className='headerContainer__closeButton' onClick={onOpenMenu}></button>
      <ul className='burgerMenu__navigaton'>
        <li className='headerContainer__point'>
          <Link to="/main" className="headerContainer__linkMovies" onClick={onOpenMenu}>Главная</Link>
        </li>
        <li className='headerContainer__point'>
          <Link to="/movies" className="headerContainer__linkMovies" onClick={onOpenMenu}>Фильмы</Link>
        </li>
        <li className='headerContainer__point'>
          <Link to="/savedMovies" className="headerContainer__linkMovies" onClick={onOpenMenu}>Сохраненные фильмы</Link>
        </li>
        <li className='headerContainer__point'>
          <section className="headerContainer__account">
            <img src={account} alt="AccountIcon" className="headerContainer__img"></img>
            <Link to="/myAccount" className="headerContainer__linkProfile" onClick={onOpenMenu}>Аккаунт</Link>
          </section>
        </li>
      </ul>
    </div>
  )
}

export default BurgerMenu;
import { Link } from "react-router-dom";
import account from '../../images/account.svg';
import logo from '../../images/logo.svg';
import './headerContainer.css';
import '../HeaderLanding/logo.css';

function HeaderContainer({ onOpenMenu, isMenuOpen }) {
  return(
    <header className={`header ${isMenuOpen && "header_burgerMenuIsOpen"}`}>
      <div className='headerContainer'>
        <Link to='/'><img src={logo} alt="Логотип" className="logo"></img></Link>
        <section className='headerContainer__sectionLinks'>
          <Link to="/movies" className="headerContainer__linkMovies">Фильмы</Link>
          <Link to="/savedMovies" className="headerContainer__linkMovies">Сохраненные фильмы</Link>
        </section>
        <section className="headerContainer__account headerContainer__account_isnActive">
          <img src={account} alt="AccountIcon" className="headerContainer__img"></img>
          <Link to="/myAccount" className="headerContainer__linkProfile">Аккаунт</Link>
        </section>
        <button className='headerContainer__burgerButton' onClick={onOpenMenu}></button>
      </div>
    </header>
  )
}

export default HeaderContainer;
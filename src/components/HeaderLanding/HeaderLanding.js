import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './headerLanding.css';
import './logo.css';

function HeaderLanding() {
  return (
    <div className="headerLanding">
      <div className="headerLanding__main">
        <img src={logo} alt="Логотип" className="logo"></img>
        <section className="headerLanding__ayth">
          <Link to='/signup' className="headerLanding__link">Регистрация</Link>
          <Link to='/signin' className="headerLanding__link">Войти</Link>
        </section>
      </div>
    </div>
  )
}

export default HeaderLanding;
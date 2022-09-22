import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import './headerLanding.css';
import './logo.css';

function HeaderLanding() {
  return (
    <header className="headerLanding">
      <div className="headerLanding__main">
        <Link to='/'><img src={logo} alt="Логотип" className="logo"></img></Link>
        <section className="headerLanding__ayth">
          <Link to='/signup' className="headerLanding__link">Регистрация</Link>
          <Link to='/signin' className="headerLanding__link">Войти</Link>
        </section>
      </div>
    </header>
  )
}

export default HeaderLanding;

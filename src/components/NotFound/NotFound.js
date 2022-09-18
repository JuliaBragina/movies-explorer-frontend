import { Link } from 'react-router-dom';
import './notFound.css';

function NotFound() {
  return(
    <div className="notFound">
      <p className="notFound__404">404</p>
      <p className="notFound__pageNotFound">Страница не найдена</p>
      <Link to='/' className='notFound__link'>Назад</Link>
    </div>
  )
}

export default NotFound;
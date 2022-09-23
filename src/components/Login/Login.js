import logo from '../../images/logo.svg';
import PopupAuth from '../PopupAuth/PopupAuth';

function Login() {
  return(
    <PopupAuth logo={logo} textWelcome='Рады видеть' linkButton="/movies"  link='/signup' linkText='Зарегистрироваться' buttonText='Войти' paragr='Еще не зарегистрирваны?' />
  ) 
}

export default Login;
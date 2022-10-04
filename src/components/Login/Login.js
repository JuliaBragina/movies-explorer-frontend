import logo from '../../images/logo.svg';
import PopupAuth from '../PopupAuth/PopupAuth';
import { useForm } from "react-hook-form"; 
import { useState } from 'react';

function Login({ onLoginUser, onLoading }) {

  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all'
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlerChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handlerChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmitFrom(e) {
    e.preventDefault();
    onLoginUser({
      email,
      password,
    });
  }

  return(
    <PopupAuth onSubmit={handleSubmitFrom} onLoading={onLoading} validButton={isValid} logo={logo} textWelcome='Рады видеть' linkButton="/movies"  link='/signup' linkText='Зарегистрироваться' buttonText='Войти' paragr='Еще не зарегистрирваны?' >
      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>E-mail</label>
        <input
          {...register("email", {required: 'Поле обязательное для заполнения.'})} 
          type='email'
          name='email'
          className='popupAuth__input'
          autoComplete="off"
          value={email || ""}
          onChange={handlerChangeEmail}>
        </input>
        <span className='popupAuth__error'>{errors?.email?.message}</span>
      </section>

      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>Пароль</label>
        <input
          {...register("pass", {required: 'Поле обязательное для заполнения.'})}
          type='password'
          name='password'
          className='popupAuth__input'
          autoComplete="off"
          value={password || ""}
          onChange={handlerChangePassword}>
        </input>
        <span className='popupAuth__error'>{errors?.pass?.message}</span>
      </section>

    </PopupAuth>
  ) 
}

export default Login;
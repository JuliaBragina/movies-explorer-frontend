import logo from '../../images/logo.svg';
import PopupAuth from '../PopupAuth/PopupAuth';
import { useForm } from "react-hook-form"; 
import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required().email({ tlds: { allow: false } }),
  password: Joi.string().required(),
}).required();

function Register({ onRegisterUser, onLoading }) {

  const { register, formState: {errors, isValid} } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlerChangeName(e) {
    setName(e.target.value);
  }

  function handlerChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handlerChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmitFrom(e) {
    e.preventDefault();
    console.log('here');
    onRegisterUser({
      name,
      email,
      password,
    });
  }

  return(
    <PopupAuth
      logo={logo}
      textWelcome='Добро пожаловать!'
      linkButton="/movies"
      link='/signin'
      linkText='Войти'
      buttonText='Зарегистрироваться'
      paragr='Уже зарегистрирваны?'
      onSubmit={handleSubmitFrom}
      onLoading={onLoading}
      validButton={isValid}>

      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>Имя</label>
        <input 
          {...register("name")}
          type='text'
          name="name"
          className='popupAuth__input'
          autoComplete="off"
          value={name || ""}
          onChange={handlerChangeName}>
        </input>
        <span className='popupAuth__error'>{errors?.name?.message}</span>
      </section>

      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>E-mail</label>
        <input
          {...register("email")} 
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
          {...register("password")}
          type='password'
          name='password'
          className='popupAuth__input'
          autoComplete="off"
          value={password || ""}
          onChange={handlerChangePassword}>
        </input>
        <span className='popupAuth__error'>{errors?.password?.message}</span>
      </section>

    </PopupAuth>
  ) 
}

export default Register;

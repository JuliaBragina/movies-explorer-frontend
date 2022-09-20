import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form"; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import '../HeaderLanding/logo.css';
import './popupAuth.css';

const schema = yup.object({
  email: yup.string().required().email(),
  pass: yup.string().required(),
}).required();


function PopupAuth({ children, logo, textWelcome, linkButton, link, linkText, buttonText, paragr }) {

  const { register, handleSubmit, formState: {errors, isValid}, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const onSubmit = () => reset();

    return(
      <div className="popupAuth">
        <img src={logo} className="logo popupAuth__img" alt="logo"></img>
        <p className='popupAuth__welcome'>{textWelcome}</p>
        <form className='popupAuth__form' onSubmit={handleSubmit(onSubmit)}>

          {children}

          <section className='popupAuth__section'>
            <label className='popupAuth__placeholder'>E-mail</label>
            <input
              {...register("email", {required: 'Поле обязательное для заполнения.'})} 
              type='email'
              className='popupAuth__input'
              autoComplete="off"
              required>
            </input>
            <span className='popupAuth__error'>{errors?.email?.message}</span>
          </section>

          <section className='popupAuth__section'>
            <label className='popupAuth__placeholder'>Пароль</label>
            <input
              {...register("pass", {required: 'Поле обязательное для заполнения.'})}
              type='password'
              className='popupAuth__input'
              autoComplete="off"
              required>
            </input>
            <span className='popupAuth__error'>{errors?.pass?.message}</span>
          </section>

          
          <NavLink to={linkButton}>
            <button type='submit' className={(link === '/signin') ? "popupAuth__button" : "popupAuth__button popupAuth__button_toLogin"} disabled={!isValid}>{buttonText}</button>
          </NavLink>
          <section className='popupAuth__login'>
            <p className="popupAuth__paragraph">{paragr}</p>
            <Link to={link} className="popupAuth__link">{linkText}</Link>
          </section>
        </form>
      </div>
    ) 
  }
  
  export default PopupAuth;
  
import './account.css';
import { useForm } from "react-hook-form"; 
import { useState } from 'react';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import React from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().required().email({ tlds: { allow: false } }),
}).required();

function Account({ onUpdateUser, onLogout, onUpdateForm, onLoading }) {
  const currentUser = React.useContext(CurrenUserContext);

  const { register, formState: {errors} } = useForm({
    mode: 'all',
    resolver: joiResolver(schema)
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handlerChangeName(e) {
    setName(e.target.value);
  }

  function handlerChangeEmail(e) {
    setEmail(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleUpdateFrom(e) {
    e.preventDefault();
    onUpdateForm({
      name,
      email,
    });
  }

  function testFunction() {
    if((currentUser.email !== email) || (currentUser.name !== name)) {
      return 0;
    } 
    if((currentUser.email === email) && (currentUser.name === name)) {
      return 1;
    }
  }
   
  return(
    <main className='account'>
      <h2 className="account__title">Привет, {currentUser.name}</h2>
      <form className='account__form'>

        <section className="account__section">
          <input
            {...register("name")}
            type='text'
            className='account__input'
            autoComplete="off"
            value={name || ""} 
            onChange={handlerChangeName}
            required>
          </input>
          <label className='account__label'>Имя</label>
        </section>

        <section className="account__section">
          <input
            {...register("email")}
            type="email"
            className='account__input'
            autoComplete="off"
            value={email || ""}
            onChange={handlerChangeEmail}
            required>
          </input>
          <label className='account__label'>E-mail</label>
        </section>

        <span className='account__error'>{errors?.name?.message}</span>
        <span className='account__error'>{errors?.email?.message}</span>

        <button type='submit' className="account__button account__button_isUpdateUser" onClick={handleUpdateFrom} disabled={errors?.name || errors?.email || testFunction()  || onLoading}>{onLoading ? 'Сохранение...' : "Редактировать"}</button>
      </form>
      <button type='submit' className="account__button account__button_isLogout" onClick={onLogout}>Выйти из аккаунта</button>
    </main>
  )
}

export default Account;

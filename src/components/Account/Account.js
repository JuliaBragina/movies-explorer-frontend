import './account.css';
import { useForm } from "react-hook-form"; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required().email(),
}).required();

function Account() {

  const { register, handleSubmit, formState: {errors, isValid} } = useForm({
    mode: 'all',
    resolver: yupResolver(schema)
  });

  const onSubmit = () => {};
  
  return(
    <div className='account'>
      <h2 className="account__title">Привет, Юлия!</h2>
      <form className='account__form' onSubmit={handleSubmit(onSubmit)}>

        <section className="account__section">
          <input 
            {...register("nameText", {
              required: 'Поле обязательное для заплнения', 
              minLength: {value: 2, message: 'Длина поля должна быть больше 2-х символов.'},
              maxLength: {value: 30, message: 'Длина поля должна быть меньше 30-и символов.'}
            })}
            type='text'
            className='account__input'
            autoComplete="off">
          </input>
          <label className='account__label'>Имя</label>
        </section>

        <section className="account__section">
          <input 
            {...register("email", {
              required: 'Поле обязательное для заполнения.' }
            )} 
            type='email'
            className='account__input'
            autoComplete="off">
          </input>
          <label className='account__label'>E-mail</label>
        </section>

        <span className="account__error">{errors?.nameText?.message}</span>
        <span className="account__error">{errors?.email?.message}</span>

        <section className="account__buttons">
          <button type='onSubmit' className="account__button">Редактировать</button>
          <button className="account__button">Выйти из аккаунта</button>
        </section>
      </form>
    </div>
  )
}

export default Account;

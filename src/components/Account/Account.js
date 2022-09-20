import './account.css';
import { useForm } from "react-hook-form"; 
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().min(2).max(30),
  email: yup.string().email(),
}).required();

function Account() {

  const { register, handleSubmit, formState: {errors} } = useForm({
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
            {...register("name")}
            type='text'
            className='account__input'
            autoComplete="off">
          </input>
          <label className='account__label'>Имя</label>
        </section>

        <section className="account__section">
          <input 
            {...register("email")} 
            type='email'
            className='account__input'
            autoComplete="off">
          </input>
          <label className='account__label'>E-mail</label>
        </section>

        <span className="account__error">{errors?.name?.message}</span>
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

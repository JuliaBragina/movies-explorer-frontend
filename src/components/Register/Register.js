import logo from '../../images/logo.svg';
import PopupAuth from '../PopupAuth/PopupAuth';
import { useForm } from "react-hook-form"; 

function Register() {
  const { register, formState: {errors} } = useForm({
    mode: 'all'
  });
  return(
    <PopupAuth logo={logo} textWelcome='Добро пожаловать!' linkButton="/movies" link='/signin' linkText='Войти' buttonText='Зарегистрироваться' paragr='Уже зарегистрирваны?'>
      <section className='popupAuth__section'>
        <label className='popupAuth__placeholder'>Имя</label>
        <input 
          {...register("name", {
            required: 'Поле обязательное для заплнения', 
            minLength: {value: 2, message: 'Длина поля должна быть больше 2-х символов.'},
            maxLength: {value: 30, message: 'Длина поля должна быть меньше 30-и символов.'} })}
          type='text'
          className='popupAuth__input'
          autoComplete="off"
          required>
        </input>
        <span className='popupAuth__error'>{errors?.name?.message}</span>
      </section>
    </PopupAuth>
  ) 
}

export default Register;

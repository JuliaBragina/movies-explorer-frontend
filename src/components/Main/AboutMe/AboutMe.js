import './aboutMe.css';
import avatar from '../../../images/avatar.jpg';
import link from '../../../images/link.svg'

function AboutMe() {
  return(
    <div className="aboutMe" id="aboutMe">
      <h2 className="title">Студент</h2>
      <div className="aboutMe__aboutStudent">
        <section className="aboutMe__description">
          <p className="aboutMe__name">Юлия</p>
          <p className="aboutMe__position">Фронтенд-разработчик, 28 лет</p>
          <p className="aboutMe__text">Я живу в Москве, закончила СПбПУ им. Петра Великого Институт компьютерных наук и технологий по специальности Управление в технических системах. Я увлекаюсь фотографией, а ещё собираю личную библиотеку крупных фентези циклов. После прохождения курса по веб-разработе, начала активно искать работу в этой сфере.</p>
          <a href="https://github.com/JuliaBragina" target="blank" className="aboutMe__git">GitHub</a>
        </section>
        <img className="aboutMe__avatar" src={avatar} alt="Аватарка"></img>
      </div>
      <div className="aboutMe__portfolio">
        <h3 className="aboutMe__title">Портфолио</h3>
        <ul className="aboutMe__items">
          <li className="aboutMe__item">
            <a href="https://github.com/JuliaBragina/how-to-learn" className="aboutMe__itemLink" target="blank">
              <p className="aboutMe__sub-title">Статичный сайт</p>
              <img href="#" src={link} className="aboutMe__link" alt="link"></img>
            </a>
          </li>
          <li className="aboutMe__item">
            <a href="https://github.com/JuliaBragina/russian-travel" className="aboutMe__itemLink" target="blank">
              <p className="aboutMe__sub-title">Адаптивный сайт</p>
              <img href="#" src={link} className="aboutMe__link" alt="link"></img>
            </a>
          </li>
          <li className="aboutMe__item">
            <a href="https://github.com/JuliaBragina/react-mesto-api-full" className="aboutMe__itemLink" target="blank">
              <p className="aboutMe__sub-title">Одностраничное приложение</p>
              <img src={link} className="aboutMe__link" alt="link"></img>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default AboutMe;
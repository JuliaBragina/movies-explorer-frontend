import './promo.css';

function Promo() {
  return (
    <div className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <section className="promo__buttons">
        <a className="promo__button" href="#aboutProject">О проекте</a>
        <a className="promo__button" href="#techs">Технлогии</a>
        <a className="promo__button" href="#aboutMe">Студент</a>
      </section>
    </div>
  )
};

export default Promo;

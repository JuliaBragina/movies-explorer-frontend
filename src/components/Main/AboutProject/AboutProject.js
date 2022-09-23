import './aboutProject.css';
import './title.css';

function AboutProject() {
  return (
    <div className="aboutProject" id="aboutProject">
      <h2 className="title">О проекте</h2>
      <div className="aboutProject__description">
        <section className="aboutProject__section">
          <h3 className="aboutProject__sub-title">Дипломный проект включал 5 этапов</h3>
          <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </section>
        <section className="aboutProject__section">
          <h3 className="aboutProject__sub-title">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </section>
      </div>
      <div className="aboutProgect__infograpf">
        <section className="aboutProject__topic aboutProject__topic_isGreen">
          <h3 className="aboutProject__term aboutProject__term_isBlack">1 неделя</h3>
          <p className="aboutProject__theme">Back-end</p>
        </section>
        <section className="aboutProject__topic aboutProject__topic_isGrey">
          <h3 className="aboutProject__term">4 недели</h3>
          <p className="aboutProject__theme">Front-end</p>
        </section>
      </div>
    </div>
  )
};

export default AboutProject;
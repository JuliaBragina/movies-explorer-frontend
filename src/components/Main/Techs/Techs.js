import './techs.css';
import '../AboutProject/title.css';

function Techs() {
  return(
    <div className="techs" id="techs">
      <div className='techs__cont'>
        <h2 className="title">Технологии</h2>
        <p className="techs__title">7 технологий</p>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <section className="techs__stack">
          <p className="techs__tech">HTML</p>
          <p className="techs__tech">CSS</p>
          <p className="techs__tech">JS</p>
          <p className="techs__tech">React</p>
          <p className="techs__tech">Git</p>
          <p className="techs__tech">Express.js</p>
          <p className="techs__tech">moongoDb</p>
        </section>
      </div>
    </div>
  )
};

export default Techs;
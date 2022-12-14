import './footer.css';

function Footer({isMenuOpen}) {
  return (
    <footer className={`footer ${isMenuOpen && "footer_burgerMenuIsOpen"}`}>
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__links">
        <p className="footer__year">&copy; 2022</p>
        <section className="footer__cont">
          <a href="https://practicum.yandex.ru" target="blank" className="footer__link">Яндекс.Практикум</a>
          <a href="https://github.com/Yandex-Practicum" target="blank" className="footer__link">GitHub</a>
        </section>
      </div>
    </footer>
  )
}

export default Footer;
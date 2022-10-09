import React from "react";
import './popup.css';
import union from '../../images/Union2.svg';

//  <img className="popup__image" src={isRegister ? unionSucces : unionFalled}></img>

function InfoTooltip({ isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen && "popup_is_opened"}`}>
      <div className='popup__container'>
        <button type="button" className='popup__close' onClick={onClose}></button>
        <div className="popup__information">
          <img className="popup__image" src={union}></img>
          <p className="popup__description">{'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
      </div>
    </div>       
  );
};

export default InfoTooltip;
import React from "react";
import './popup.css';
import union2 from '../../images/Union2.svg';
import union from '../../images/Union.svg';

//  <img className="popup__image" src={isRegister ? unionSucces : unionFalled}></img>

function InfoTooltip({ isOpen, onClose, updateUserInf }) {
  return (
    <div className={`popup ${isOpen && "popup_is_opened"}`}>
      <div className='popup__container'>
        <button type="button" className='popup__close' onClick={onClose}></button>
        <div className="popup__information">
          <>
            {
              updateUserInf
              ? <img className="popup__image" src={union}></img>
              : <img className="popup__image" src={union2}></img>
            }
          </>
          <p className="popup__description">{updateUserInf ? "Изменения вненсены успешно." : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
      </div>
    </div>       
  );
};

export default InfoTooltip;
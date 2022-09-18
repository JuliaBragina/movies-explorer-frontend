import React from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import HeaderContainer from '../HeaderContainer/HeaderContainer';


function Header({ isMenuOpen, onOpenMenu }) {
  return (
    <>
      <BurgerMenu isMenuOpen={isMenuOpen} onOpenMenu={onOpenMenu} />
      <HeaderContainer onOpenMenu={onOpenMenu} />
    </>
  )
}

export default Header;

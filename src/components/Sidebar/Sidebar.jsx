import { useCallback, useEffect, useState } from 'react';
import useResizeHook from '../customHooks/useResizeHook';
import AddProject from './AddProject/AddProject';
import DisplayProjects from './DisplayProjects/displayProjects';
import './sidebar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
const Sidebar = () => {
  const [burgerMenu, setBurgerMenu] = useState(false);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const { width } = useResizeHook();

  useEffect(() => {
    if (width <= 800) {
      setBurgerMenu(true);
      return;
    }
    setBurgerMenu(false);
  }, [width]);

  const handleBurgerMenuIcon = useCallback(() => {
    setBurgerMenuOpen(true);
  }, []);
  const handleCancelBurgerMenu = useCallback(() => {
    setBurgerMenuOpen(false);
  }, []);
  return (
    <>
      <section
        className={`sidebar-container ${
          burgerMenu
            ? `burger-menu ${burgerMenuOpen ? 'burger-menu-open' : ''}`
            : ''
        }`}
      >
        <AddProject setBurgerMenuOpen={setBurgerMenuOpen} />
        <DisplayProjects setBurgerMenuOpen={setBurgerMenuOpen} />
        {width <= 800 && (
          <FontAwesomeIcon
            icon={faXmark}
            className="burger-menu-cancel"
            onClick={handleCancelBurgerMenu}
          />
        )}
      </section>
      {width <= 800 && (
        <FontAwesomeIcon
          icon={faBars}
          className="burger-menu-icon"
          onClick={handleBurgerMenuIcon}
        />
      )}
    </>
  );
};

export default Sidebar;

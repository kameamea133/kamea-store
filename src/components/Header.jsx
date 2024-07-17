import { useState, useContext } from 'react';
import './header.css';
import { AppContext } from '../App';

import navListData from '../data/navListData';
import NavListItem from './NavListItem';
import { Link } from 'react-router-dom';

function Header() {
  const { collection, bag, scroll, sectionRefs: refs } = useContext(AppContext);
  const [navList, setNavList] = useState(navListData);
  const [open, setOpen] = useState(false);

  const handleNavOnClick = id => {
    const newNavList = navList.map(nav => {
      nav.active = false;
      if (nav._id === id) nav.active = true;
      return nav;
    });

    setNavList(newNavList);
  };

  const handleToggleMenu = () => {
    setOpen(!open);
  };



  return (
    <header
      className={`${scroll > 100 ? 'scrolled' : undefined}`}
      ref={refs.header}
    >
      <a href="/" className="logo">
        Kamea Store
      </a>

      <ul className="nav">
        {navList.map(nav => (
          <NavListItem
            key={nav._id}
            nav={nav}
            navOnClick={handleNavOnClick}
            scroll={scroll}
            refs={refs}
          />
        ))}
      </ul>

      <div className="userItems">
        <Link to="/collection" className="icon">
          <i className="bi bi-heart-fill"></i>
          <span className="like">{collection.length}</span>
        </Link>
        <Link to="/bag" className="icon">
          <i className="bi bi-bag-fill"></i>
          <span className="bag">{bag.length}</span>
        </Link>
        <Link to="/login" className="icon">
          <i className="bi bi-box-arrow-in-right"></i>
        </Link>
        <Link to="/register" className="icon">
          <i className="bi bi-person-plus-fill"></i>
        </Link>
      </div>

      {open ? (
        <a className="menu" onClick={handleToggleMenu}>
          <i className="bi bi-x-lg"></i>
        </a>
      ) : (
        <a className="menu" onClick={handleToggleMenu}>
          <i className="bi bi-list"></i>
        </a>
      )}

      <ul className={`nav-mobile ${open ? 'active' : undefined}`}>
        {navList.map(nav => (
          <NavListItem
            key={nav._id}
            nav={nav}
            navOnClick={handleNavOnClick}
            scroll={scroll}
            refs={refs}
          />
        ))}
      </ul>
    </header>
  );
}

export default Header;

import { useState, useContext } from 'react';
import './header.css';
import { AppContext } from '../App';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Header() {
  const { collection, bag, scroll, sectionRefs: refs } = useContext(AppContext);
  const [navList, setNavList] = useState(navListData);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, username } = useAuth();

  

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

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header
      className={`${scroll > 100 ? 'scrolled' : undefined}`}
      ref={refs.header}
    >
      <Link to="/" className="logo">
        Kamea Store
      </Link>

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
        <Link to="/collection" className="icon " data-bs-toggle="tooltip" title="My Collection">
          <i className="bi bi-heart-fill"></i>
          <span className="like">{collection.length}</span>
        </Link>
        <Link to="/bag" className="icon" data-bs-toggle="tooltip" title="My Bag">
          <i className="bi bi-bag-fill"></i>
          <span className="bag">{bag.length}</span>
        </Link>
        {currentUser ? (
          <>
            <a className="icon" onClick={handleLogout} data-bs-toggle="tooltip" title="Logout">
              <i className="bi bi-box-arrow-in-right"></i>
            </a>
            <Link to="/profile" className="icon" data-bs-toggle="tooltip" title={username || currentUser.email}>
              <i className="bi bi-person-fill"></i>
            </Link>
          </>
        ) : (
          <Link to="/register" className="icon" data-bs-toggle="tooltip" title="Register">
            <i className="bi bi-person-plus-fill"></i>
          </Link>
        )}
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

import './navListItem.css';
import { Link, useLocation } from 'react-router-dom';

function NavListItem({ nav, navOnClick, scroll, refs }) {
  const location = useLocation();

  const handlePageScroll = (section, id) => e => {
    e.preventDefault();
    if (section === 'home') {
      navOnClick(id);
      window.scrollTo(0, 0);
      return;
    }
    navOnClick(id);
    if (refs[section] && refs[section].current) {
      window.scrollTo(0, refs[section].current.offsetTop);
    }
  };

  const handleActiveNav = (scroll, currentSection, nextSection) => {
    if (
      refs[currentSection] &&
      refs[currentSection].current &&
      refs[nextSection] &&
      refs[nextSection].current &&
      refs.header &&
      refs.header.current
    ) {
      if (
        scroll >= 0 &&
        scroll >= refs[currentSection].current.offsetTop - refs.header.current.offsetHeight &&
        scroll < refs[nextSection].current.offsetTop - refs.header.current.offsetHeight
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <li>
      {location.pathname === '/' ? (
        <Link
          onClick={handlePageScroll(nav.name, nav._id)}
          className={`${handleActiveNav(scroll, nav.current, nav.next) ? 'active' : undefined}`}
        >
          {nav.name === 'home' ? (
            <i className="bi bi-house-door"></i>
          ) : (
            nav.name
          )}
        </Link>
      ) : (
        <Link to="/" className={`${nav.active ? 'active' : undefined}`}>
          {nav.name === 'home' ? (
            <i className="bi bi-house-door"></i>
          ) : (
            nav.name
          )}
        </Link>
      )}
    </li>
  );
}

export default NavListItem;

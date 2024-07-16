import { useContext } from 'react';
import { AppContext } from '../App';
import './btnBackToTop.css';

function BackToTopBtn() {
  const { scroll } = useContext(AppContext);

  const backToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <a
      className={`back-to-top ${scroll > 100 ? 'active' : undefined}`}
      onClick={backToTop}
    >
      <i className="bi bi-arrow-up"></i>
    </a>
  );
}

export default BackToTopBtn;

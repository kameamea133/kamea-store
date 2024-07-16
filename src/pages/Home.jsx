import { useContext } from 'react';
import { AppContext } from '../App';
import Hero from '../components/Hero';
import Womens from '../components/Womens';
import Mens from '../components/Men';
import Kids from '../components/Kids';
import Footer from '../components/Footer';
import BtnBackToTop from '../components/BtnBackToTop';

function Home() {
  const { items, setItems } = useContext(AppContext);
  return (
    <>
      <Hero items={items} setItems={setItems} />
      <Womens items={items} setItems={setItems} />
      <Mens items={items} setItems={setItems} />
      <Kids items={items} setItems={setItems} />
      <Footer />
      <BtnBackToTop />
    </>
  );
}

export default Home;

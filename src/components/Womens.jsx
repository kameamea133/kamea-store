import { useContext } from 'react';
import { AppContext } from '../App';
import ItemCard from './ItemCard';

function Womens() {
  const { items, sectionRefs: refs } = useContext(AppContext);


  return (
    <section id="womens" className="womens" ref={refs.womens} style={{ zIndex: 5}}>
      <div className="container">
        <div className="row">
          <h4 className="section-title">Womens</h4>
        </div>
        <div className="row mt-5">
          {items.filter(item => item.category === 'womens').map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section> 
  );
}

export default Womens;

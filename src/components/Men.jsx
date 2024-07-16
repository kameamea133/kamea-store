import { useContext } from 'react';
import { AppContext } from '../App';
import ItemCard from './ItemCard';

function Mens() {
  const { items, sectionRefs: refs } = useContext(AppContext);
  return (
    <section id="mens" className="mens" ref={refs.mens}>
      <div className="container">
        <div className="row">
          <h4 className="section-title">Mens</h4>
        </div>
        <div className="row mt-5">
          {items.filter(item => item.category === 'mens').map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mens;

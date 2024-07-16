import { useContext } from 'react';
import { AppContext } from '../App';
import ItemCard from './ItemCard';

function Kids() {
  const { items, sectionRefs: refs } = useContext(AppContext);
  return (
    <section id="kids" className="kids" ref={refs.kids}>
      <div className="container">
        <div className="row">
          <h4 className="section-title">Kids</h4>
        </div>
        <div className="row mt-5">
          {items.filter(item => item.category === 'kids').map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Kids;

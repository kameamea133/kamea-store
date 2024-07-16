import { useContext } from 'react';
import { AppContext } from '../App';
import ItemCard from '../components/ItemCard';

import './collections.css';

function Collection() {

  const { collection: items } = useContext(AppContext);

  return (
    <div className="collection">
      <div className="container">
        <div className="row mb-3">
          <h1>My Collections</h1>
        </div>
        <div className="row">
          {items.length === 0 ? (
            <h2>You have no collections</h2>
          ) : (
            items.map(item => <ItemCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;

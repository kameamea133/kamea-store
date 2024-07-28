import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import ItemCard from '../components/ItemCard';
import { useAuth } from '../AuthProvider';
import './collections.css';

function Collection() {

  const { collection: items } = useContext(AppContext);
  const { username } = useAuth();
   
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="collection">
      <div className="container">
        <div className="row mb-3">
          <h1>My Collections</h1>
        </div>
        <div className="row">
          {items.length === 0 ? (
            <h2>You have no collections {username}</h2>
          ) : (
            items.map(item => <ItemCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default Collection;

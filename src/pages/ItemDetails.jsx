import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

import './itemDetails.css';

function ItemDetails() {
  const { bag, setBag } = useContext(AppContext);
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1); 
  const [itemAdded, setItemAdded] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  const sizesList = [
    { id: 1, name: 'XS', active: false },
    { id: 2, name: 'S', active: false },
    { id: 3, name: 'M', active: true },
    { id: 4, name: 'L', active: false },
    { id: 5, name: 'XL', active: false },
  ];

  const [sizes, setSizes] = useState(sizesList);

  
  const fetchData = async () => {
    try {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const item = { id: docSnap.id, ...docSnap.data() };
        setItem(item);
        setItemAdded({ ...item, qty: 1, size: 'M' });
      } else {
        console.error('No such item!');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const increaseQty = () => {
    if (qty > 99) {
      setQty(99);
      return;
    }
    const newQty = qty + 1;
    setQty(newQty);
    setItemAdded(prevItem => ({ ...prevItem, qty: newQty }));
  };

  const decreaseQty = () => {
    if (qty < 2) {
      setQty(1);
      return;
    }
    const newQty = qty - 1;
    setQty(newQty);
    setItemAdded(prevItem => ({ ...prevItem, qty: newQty }));
  };

  const handleSizeChange = id => {
    const newSizeList = sizes.map(size => {
      size.active = false;
      if (size.id === id) {
        size.active = true;
        setItemAdded({ ...itemAdded, size: size.name });
      }
      return size;
    });

    setSizes(newSizeList);
  };

  const handleAddToBag = item => {
    if (bag.includes(item)) return;
    setBag([...bag, item]);
  };
 
  if (loading) {
    return <div className="display-4 text-danger">Loading...</div>; 
  }

  if (!item) {
    return <div>No item found.</div>;
  }

  return (
    <div className="itemDetails">
      <div className="content">
        <div className="container-fluid">
          <div className="row p-5">
            <div className="col-lg-5">
              <img className="img-fluid itemImg" src={item.bgImg} alt={item.title} />
            </div>
            <div className="col-lg-5">
              <h2>{item.title}</h2>
              <div className="itemPrice">
                <h4 className="price">
                  Price: €{item.price && item.price.toLocaleString('en-FR')}
                </h4>
                {item.discount !== 0 && (
                  <>
                    <h4 className="discount">
                      <i>{item.discount * 100}% OFF</i>
                    </h4>
                    <h4 className="currentPrice">
                      Now: €{((1 - item.discount) * item.price).toFixed(2)}
                    </h4>
                  </>
                )}
              </div>
              <h4>Details</h4>
              <p>{item.description}</p>
              <h4>Size</h4>
              <div className="size">
                {sizes.map(size => (
                  <span
                    key={size.id}
                    onClick={() => handleSizeChange(size.id)}
                    className={`sizeItem ${size.active ? 'active' : undefined}`}
                  >
                    {size.name}
                  </span>
                ))}
              </div>
              <h4>Quantity</h4>
              <div className="quantity">
                <a href="#" className="qtyButton" onClick={decreaseQty}>
                  <i className="bi bi-dash"></i>
                </a>
                <span className="qty">{qty}</span>
                <a href="#" className="qtyButton" onClick={increaseQty}>
                  <i className="bi bi-plus"></i>
                </a>
              </div>
              <a
                href="#"
                className="addButton me-3"
                onClick={() => handleAddToBag(itemAdded)}
              >
                Add to Bag
              </a>
              <Link to="/" className="addButton">
                Keep Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;

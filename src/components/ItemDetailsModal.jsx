/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './itemDetailsModal.css';
import { Link } from 'react-router-dom';

function ItemDetailsModal({ item, show, onHide }) {
  const { bag, setBag } = useContext(AppContext);
  const [itemDetails, setItemDetails] = useState(null);
  const [qty, setQty] = useState(1);
  const [sizes, setSizes] = useState([
    { id: 1, name: 'XS', active: false },
    { id: 2, name: 'S', active: false },
    { id: 3, name: 'M', active: true },
    { id: 4, name: 'L', active: false },
    { id: 5, name: 'XL', active: false },
  ]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'items', item.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const itemData = { id: docSnap.id, ...docSnap.data() };
          setItemDetails(itemData);
        } else {
          console.error('No such item!');
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item.id]);

  const increaseQty = () => {
    if (qty > 99) {
      setQty(99);
      return;
    }
    setQty(qty + 1);
  };

  const decreaseQty = () => {
    if (qty < 2) {
      setQty(1);
      return;
    }
    setQty(qty - 1);
  };

  const handleSizeChange = id => {
    const newSizeList = sizes.map(size => {
      size.active = false;
      if (size.id === id) {
        size.active = true;
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

  if (!itemDetails) {
    return <div>No item found.</div>;
  }

  return (
    <Modal show={show} onHide={onHide} size="xl" className='mod' centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{itemDetails.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="itemContainer">
             
                <div className='imgContainer'>
                  <img className="itemImg" src={itemDetails.bgImg} alt={itemDetails.title} />
                </div>
                <div >
                  <h2>{itemDetails.title}</h2>
                  <div className="itemPrice">
                    <h4 className="price">
                      Price: €{itemDetails.price && itemDetails.price.toLocaleString('en-FR')}
                    </h4>
                    {itemDetails.discount !== 0 && (
                      <>
                        <h4 className="discount">
                          <i>{itemDetails.discount * 100}% OFF</i>
                        </h4>
                        <h4 className="currentPrice">
                          Now: €{((1 - itemDetails.discount) * itemDetails.price).toFixed(2)}
                        </h4>
                      </>
                    )}
                  </div>
                  <h4>Details</h4>
                  <p>{itemDetails.description}</p>
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
                    <Link href="#" className="qtyButton" onClick={decreaseQty}>
                      <i className="bi bi-dash"></i>
                    </Link>
                    <span className="qty">{qty}</span>
                    <Link href="#" className="qtyButton" onClick={increaseQty}>
                      <i className="bi bi-plus"></i>
                    </Link>
                  </div>
                  <Button
                    variant="primary"
                    className=" addButtonModal"
                    onClick={() => handleAddToBag({ ...itemDetails, qty })}
                  >
                    Add to Bag
                  </Button>
                  <Button variant="secondary" onClick={onHide} className="addButtonModal">
                    Keep Browsing
                  </Button>
                </div>
              
            </div>
          
        
      </Modal.Body>
    </Modal>
  );
}

export default ItemDetailsModal;

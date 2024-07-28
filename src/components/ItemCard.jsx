/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { AppContext } from '../App';
import './itemCard.css';
import ItemDetailsModal from './ItemDetailsModal';

function ItemCard({ item }) {
  const { collection, setCollection } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const handleAddToCollection = prod => {
    setCollection([...collection, prod]);
  };

  const handleRemoveFromCollection = prod => {
    setCollection(collection.filter(item => item.id !== prod.id));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="itemCard">
        <img src={item.bgImg} alt={item.title} className="img-fluid" />
        <button
          className={`like ${collection.includes(item) ? 'active' : undefined}`}
          onClick={
            collection.includes(item)
              ? () => handleRemoveFromCollection(item)
              : () => handleAddToCollection(item)
          }
        >
          <i className="bi bi-bookmark-fill"></i>
        </button>
        <div className="itemFeature">
          <span className="itemType">{item.category}</span>
          <span className="itemPromotion">{item.promotion}</span>
        </div>
        <h4 className="itemTitle mt-4 mb-3">{item.title}</h4>
        <div className="itemPrice">
          {item.discount !== 0 && (
            <>
              <span className="discount">
                <i>{item.discount * 100}%</i>
              </span>
              <span className="prevPrice">${item.price.toFixed(2)}</span>
            </>
          )}
          <span className="currentPrice">
            ${((1 - item.discount) * item.price).toFixed(2)}
          </span>
        </div>
        <button className="addBag" onClick={handleShowModal}>
          <i className="bi bi-bag-plus-fill"></i>
        </button>

        {showModal && (
          <ItemDetailsModal item={item} show={showModal} onHide={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default ItemCard;

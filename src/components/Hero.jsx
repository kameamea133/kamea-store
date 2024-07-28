/* eslint-disable react/prop-types */
import { useContext } from 'react';
import SwiperHero from './SwiperHero';
import { AppContext } from '../App';

import './hero.css';
import { Link } from 'react-router-dom';

function Hero({ items, setItems }) {
  const {
    collection,
    setCollection,
    sectionRefs: refs,
  } = useContext(AppContext);

  const handleAddToCollection = prod => {
    setCollection([...collection, prod]);
  };

  const handleRemoveFromCollection = prod => {
    setCollection(collection.filter(item => item._id !== prod._id));
  };

  const handleSlideChange = id => {
    const newItems = items.map(item => {
      item.active = false;
      if (item.id === id) {
        item.active = true;
      }
      return item;
    });
    setItems(newItems);
  };


  return (
    <div className="banner" ref={refs.hero}>
      {items &&
        items.length > 0 &&
        items.map(item => (
          <div className="item" key={item.id}>
            <img
              src={item.bgImg}
              alt="photo"
              className={`bgImg ${item.active ? 'active' : undefined}`}
            />
            <div className={`content ${item.active ? 'active' : undefined}`}>
              <p>
                {item.description}
              </p>
              <h1>{item.title}</h1>
              <p>{item.price}€</p>
              <Link to={`/items/${item.id}`} className="mainButton">
                Shop Now <i className="bi bi-cart2"></i>
              </Link>
              <Link
                className={`markButton ${
                  collection.includes(item) ? 'active' : undefined
                }`}
                onClick={
                  collection.includes(item)
                    ? () => handleRemoveFromCollection(item)
                    : () => handleAddToCollection(item)
                }
              >
                <i className="bi bi-bookmark-plus-fill"></i>
              </Link>
            </div>
            <div className="subtitle">
             
              <span className={`number ${item.active ? 'active' : undefined}`}>
                {item.id}
              </span>
            </div>
          </div>
        ))}

      {items && items.length > 0 && (
        <SwiperHero slides={items} slideChange={handleSlideChange} />
      )}
    </div>
  );
}

export default Hero;

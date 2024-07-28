import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import Header from './components/Header';
import Bag from './pages/Bag';
import Collection from './pages/Collection';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './AuthProvider';
import PrivateRoute from './PrivateRoute';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';


export const AppContext = React.createContext();


function App() {
  const [items, setItems] = useState([]);
  const [collectionData, setCollection] = useState([]); 
  const [bag, setBag] = useState([]);
  const [scroll, setScroll] = useState(0);

  const headerRef = useRef();
  const heroRef = useRef();
  const womensRef = useRef();
  const mensRef = useRef();
  const kidsRef = useRef();
  const footerRef = useRef();

  const sectionRefs = {
    header: headerRef,
    hero: heroRef,
    womens: womensRef,
    mens: mensRef,
    kids: kidsRef,
    footer: footerRef,
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY);
    });
    return () => {
      window.removeEventListener('scroll', () => {
        setScroll(window.scrollY);
      });
    };
  }, [scroll]);

 

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching items from Firebase: ", error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    const storedCollection = JSON.parse(localStorage.getItem('collectionData'));
    if (storedCollection) {
      setCollection(storedCollection);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('collectionData', JSON.stringify(collectionData));
  }, [collectionData]);


  return (
    <>
      <AppContext.Provider
        value={{
          items,
          setItems,
          collection: collectionData,
          setCollection,
          bag,
          setBag,
          scroll,
          sectionRefs,
        }}
      >
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route element={<PrivateRoute />}>
              <Route path="/bag" element={<Bag />} />
              <Route path="/collection" element={<Collection />} />
            </Route>
          </Routes>
        </AuthProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;

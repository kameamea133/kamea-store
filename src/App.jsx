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
import { db } from './firebase'; // Importer Firestore
import { collection, getDocs } from 'firebase/firestore';

export const AppContext = React.createContext();

function App() {
  const [items, setItems] = useState([]);
  const [collectionData, setCollection] = useState([]); // Renommer pour éviter les conflits
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

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
    } catch (e) {
      console.error('Error fetching data: ', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          items,
          setItems,
          collection: collectionData, // Renommer pour éviter les conflits
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
            </Route>
          </Routes>
        </AuthProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;

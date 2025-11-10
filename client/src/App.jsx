import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Prediccion from './components/Prediccion';

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState('home');

  const handleAddToCart = (product) => setCart([...cart, product]);
  const handleRemoveFromCart = (index) =>
    setCart(cart.filter((_, i) => i !== index));

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar cartCount={cart.length} onNavigate={setPage} />

      {page === 'home' && <Home onAddToCart={handleAddToCart} />}
      {page === 'cart' && <Cart cartItems={cart} onRemove={handleRemoveFromCart} />}
      {page === 'prediccion' && <Prediccion />}

      <Footer />
    </div>
  );
}

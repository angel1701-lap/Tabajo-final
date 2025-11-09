import React from 'react';
import ProductList from './ProductList';

function Home() {
  return (
    <>
      <div className="bg-light py-5 text-center">
        <h1 className="fw-bold">Bienvenido a ZapaStore 👟</h1>
        <p className="text-muted">Encuentra tus zapatillas favoritas al mejor precio</p>
      </div>
      <ProductList />
    </>
  );
}

export default Home;

import React from 'react';
import ProductCard from './ProductCard';

function ProductList() {
  const productos = [
    { image: 'https://via.placeholder.com/300x200', name: 'Nike Air Zoom', price: 359 },
    { image: 'https://via.placeholder.com/300x200', name: 'Adidas Ultraboost', price: 420 },
    { image: 'https://via.placeholder.com/300x200', name: 'Puma RS-X', price: 310 },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Nuestros Productos</h2>
      <div className="row">
        {productos.map((p, index) => (
          <ProductCard key={index} image={p.image} name={p.name} price={p.price} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

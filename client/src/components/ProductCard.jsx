import React from 'react';

function ProductCard({ image, name, price }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={image} className="card-img-top" alt={name} />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
          <p className="card-text fw-bold text-success">S/ {price}</p>
          <button className="btn btn-primary">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

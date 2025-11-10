import React from 'react';

function Navbar({ cartCount, onNavigate }) {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a
          className="navbar-brand fs-3 fw-bold"
          href="#"
          onClick={() => onNavigate('home')}
        >
          ZapaStore
        </a>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-light"
            onClick={() => onNavigate('prediccion')}
          >
             Predicción
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
             Dashboard
          </button>

          <button
            className="btn btn-outline-light position-relative"
            onClick={() => onNavigate('cart')}
          >
             Carrito
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

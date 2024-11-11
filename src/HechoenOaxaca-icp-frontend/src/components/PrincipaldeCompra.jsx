// PrincipaldeCompra.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PrincipaldeCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    // Si no hay producto seleccionado, redirige al usuario de vuelta a la página principal
    navigate('/');
    return null;
  }

  return (
    <div className="container mt-5">
      <h2>Confirmación de Compra</h2>
      <div className="card">
        <div className="card-body">
          <h3>{product.nombre}</h3>
          <p><strong>Artesano:</strong> {product.artesano}</p>
          <p><strong>Descripción:</strong> {product.descripcion}</p>
          <p><strong>Tipo:</strong> {product.tipo}</p>
          <p><strong>Precio:</strong> ICP {product.precio}</p>
        </div>
      </div>
      {/* Aquí puedes agregar opciones de pago o confirmar la compra */}
      <button onClick={() => navigate('/')} className="btn btn-secondary mt-3">Cancelar</button>
      <button onClick={() => alert('Compra confirmada')} className="btn btn-primary mt-3">Confirmar Compra</button>
    </div>
  );
};

export default PrincipaldeCompra;

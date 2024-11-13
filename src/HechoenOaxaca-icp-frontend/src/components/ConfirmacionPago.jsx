import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmacionPago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, shippingAddress } = location.state || {};

  if (!product || !shippingAddress) {
    // Redirigir si no hay datos
    navigate('/');
    return null;
  }

  const handleConfirm = () => {
    alert('Pago confirmado. Gracias por tu compra.');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/compra');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card mt-4">
            <div className="card-body">
              <h2 className="text-center mb-4">Confirmación de Pago</h2>
              <div className="mb-4">
                <h4>Detalles del Producto</h4>
                <dl className="row row-cols-1 row-cols-md-2 g-3">
                  <dt className="col-sm-4">Nombre:</dt>
                  <dd className="col-sm-8">{product.nombre}</dd>
                  <dt className="col-sm-4">Artesano:</dt>
                  <dd className="col-sm-8">{product.artesano}</dd>
                  <dt className="col-sm-4">Descripción:</dt>
                  <dd className="col-sm-8">{product.descripcion}</dd>
                  <dt className="col-sm-4">Tipo:</dt>
                  <dd className="col-sm-8">{product.tipo}</dd>
                  <dt className="col-sm-4">Precio:</dt>
                  <dd className="col-sm-8">ICP {product.precio}</dd>
                </dl>
              </div>
              <div className="mb-4">
                <h4>Dirección de Envío</h4>
                <dl className="row row-cols-1 row-cols-md-2 g-3">
                  <dt className="col-sm-4">Nombre:</dt>
                  <dd className="col-sm-8">{shippingAddress.name}</dd>
                  <dt className="col-sm-4">Dirección:</dt>
                  <dd className="col-sm-8">{shippingAddress.street}</dd>
                  <dt className="col-sm-4">Ciudad:</dt>
                  <dd className="col-sm-8">{shippingAddress.city}</dd>
                  <dt className="col-sm-4">Estado:</dt>
                  <dd className="col-sm-8">{shippingAddress.state}</dd>
                  <dt className="col-sm-4">Código Postal:</dt>
                  <dd className="col-sm-8">{shippingAddress.zip}</dd>
                  <dt className="col-sm-4">País:</dt>
                  <dd className="col-sm-8">{shippingAddress.country}</dd>
                  <dt className="col-sm-4">Teléfono:</dt>
                  <dd className="col-sm-8">{shippingAddress.phoneNumber}</dd>
                </dl>
              </div>
              <div className="d-grid gap-2 d-sm-flex justify-content-sm-end">
                <button className="btn btn-outline-secondary me-2" onClick={handleCancel}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-x-circle" width="18" height="18" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M8 2a6 6 0 1 1 12 12L2 18l6-3-6-3zm0 7a7 7 0 0 1 7 7V8H3V5a2 2 0 0 0-2-2H5v7a2 2 0 0 0 2 2h1.5v1.5a3.5 3.5 0 1 0 3-3.5H14V14h-1v-1.5a3.5 3.5 0 0 0-3-3.5h-.5a2 2 0 0 0-2-2V9a7 7 0 0 1 7-7zM6 8v8l4-3-4-3zm4 .5V5h1.5v1.5a2 2 0 0 0 2 2h1.5v1.5a3.5 3.5 0 1 0 3-3.5H14V14h-1v-1.5a3.5 3.5 0 0 0-3-3.5h-.5a2 2 0 0 0-2-2V9a7 7 0 0 1 7-7z"/>
                  </svg>
                </button>
                <button className="btn btn-primary" onClick={handleConfirm}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-check-circle" width="18" height="18" viewBox="0 0 16 16">
                    <path fill="currentColor" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 1a8 8 0 0 1 0 16z"/>
                  </svg> Confirmar y Pagar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionPago;
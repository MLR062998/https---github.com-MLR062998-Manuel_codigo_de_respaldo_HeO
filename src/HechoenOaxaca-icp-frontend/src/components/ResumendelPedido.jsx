// ResumenPedido.jsx
import React from 'react';

const ResumenPedido = ({ products, totalCost }) => {
  return (
    <div>
      <h2>Resumen del Pedido</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.nombre} - {product.precio} ICP
          </li>
        ))}
      </ul>
      <p>Total: {totalCost} ICP</p>
    </div>
  );
};

export default ResumenPedido;

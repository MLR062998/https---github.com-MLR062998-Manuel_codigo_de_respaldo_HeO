// ConfirmacionPago.jsx
import React from 'react';

const ConfirmacionPago = ({ totalCost, onConfirm, onCancel }) => {
  return (
    <div>
      <h2>Confirmación de Compra</h2>
      <p>Total a pagar: {totalCost} ICP</p>
      <button onClick={onConfirm}>Confirmar y Pagar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default ConfirmacionPago;

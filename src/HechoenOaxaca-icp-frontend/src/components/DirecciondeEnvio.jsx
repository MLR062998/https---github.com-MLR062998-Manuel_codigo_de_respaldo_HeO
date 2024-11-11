// DireccionEnvio.jsx
import React, { useState } from 'react';

const DireccionEnvio = ({ onAddressChange }) => {
  const [address, setAddress] = useState('');

  const handleChange = (e) => {
    setAddress(e.target.value);
    onAddressChange(e.target.value);
  };

  return (
    <div>
      <h3>Dirección de Envío</h3>
      <input
        type="text"
        value={address}
        onChange={handleChange}
        placeholder="Ingresa tu dirección"
      />
    </div>
  );
};

export default DireccionEnvio;

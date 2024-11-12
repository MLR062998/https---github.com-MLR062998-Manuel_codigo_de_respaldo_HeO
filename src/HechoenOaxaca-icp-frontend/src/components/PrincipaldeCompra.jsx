import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PrincipaldeCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState({});

  if (!product) {
    navigate('/');
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!shippingAddress.name.trim()) newErrors.name = 'Nombre es requerido';
    if (!shippingAddress.street.trim()) newErrors.street = 'Calle es requerida';
    if (!shippingAddress.city.trim()) newErrors.city = 'Ciudad es requerida';
    if (!shippingAddress.state.trim()) newErrors.state = 'Estado/Provincia es requerido';
    if (!shippingAddress.zip.trim() || !/^\d{5}$/.test(shippingAddress.zip)) {
      newErrors.zip = 'Código postal debe ser un número de 5 dígitos';
    }
    if (!shippingAddress.country.trim()) newErrors.country = 'País es requerido';
    if (!shippingAddress.phoneNumber.trim() || !/^\d{9,10}$/.test(shippingAddress.phoneNumber)) {
      newErrors.phoneNumber = 'Número de teléfono debe ser un número de 9 o 10 dígitos';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      navigate('/ConfirmacionPago', { state: { product, shippingAddress } });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dirección de Envío</h2>
      <div className="card mt-4">
        <div className="card-body">
          <form>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </li>
              <li className="list-group-item">
                <label htmlFor="street" className="form-label">Calle y Número</label>
                <input
                  type="text"
                  className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                  id="street"
                  name="street"
                  value={shippingAddress.street}
                  onChange={handleChange}
                />
                {errors.street && <div className="invalid-feedback">{errors.street}</div>}
              </li>
              <li className="list-group-item">
                <label htmlFor="city" className="form-label">Ciudad</label>
                <input
                  type="text"
                  className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                />
                {errors.city && <div className="invalid-feedback">{errors.city}</div>}
              </li>
              <li className="list-group-item">
                <label htmlFor="state" className="form-label">Estado/Provincia</label>
                <input
                  type="text"
                  className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                  id="state"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                />
                {errors.state && <div className="invalid-feedback">{errors.state}</div>}
              </li>
              <li className="list-group-item">
                <label htmlFor="zip" className="form-label">Código Postal</label>
                <input
                  type="text"
                  className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
                  id="zip"
                  name="zip"
                  value={shippingAddress.zip}
                  onChange={handleChange}
                />
                {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
              </li>
              <li className="list-group-item">
                <label htmlFor="country" className="form-label">País</label>
                <input
                  type="text"
                  className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleChange}
                />
                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
              </li>
              <li className="list-group-item">
                <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
                <input
                  type="text"
                  className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                  id="phoneNumber"
                  name="phoneNumber"
                  value={shippingAddress.phoneNumber}
                  onChange={handleChange}
                />
                {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary me-3" onClick={() => navigate('/')}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleNextStep}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PrincipaldeCompra;
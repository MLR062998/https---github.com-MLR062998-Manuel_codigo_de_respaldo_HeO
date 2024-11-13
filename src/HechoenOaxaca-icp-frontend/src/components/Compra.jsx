import React from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';

const Compra = ({ show, onClose, product, onPurchase }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{product.nombre}</h4>
        <p><strong>Artesano:</strong> {product.artesano}</p>
        <p><strong>Descripción:</strong> {product.descripcion}</p>
        <p><strong>Tipo:</strong> {product.tipo}</p>
        <p><strong>Precio:</strong> ICP {product.precio}</p>

        {product.imagenes && product.imagenes.length > 0 && (
          <Carousel>
            {product.imagenes.map((imagen, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={imagen}
                  alt={`Imagen ${index + 1} de ${product.nombre}`}
                  style={{ maxHeight: '300px', objectFit: 'cover' }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        <Button variant="primary" onClick={() => onPurchase(product)}>Comprar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Compra;

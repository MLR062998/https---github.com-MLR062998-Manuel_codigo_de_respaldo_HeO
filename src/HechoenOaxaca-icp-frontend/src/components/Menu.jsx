// Menu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useConnect, ConnectDialog, ConnectButton } from '@connect2ic/react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Menu = () => {
  const { principal, isConnected, disconnect } = useConnect();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleLogoutClick = () => setShowConfirmModal(true);
  const handleConfirmLogout = () => {
    setShowConfirmModal(false);
    disconnect();
  };
  const handleCloseModal = () => setShowConfirmModal(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Mercado</Link>
          {isConnected && principal ? (
            <>
              <Link to="/nuevo-producto" className="navbar-brand">Nuevo Producto</Link>
              <Link to="/productos" className="navbar-brand">Productos</Link>
              <div className="d-flex ms-auto">
                <Link to="/wallet" className="btn btn-secondary me-2" id="btnWallet">Wallet</Link>
                <button className="btn btn-danger me-2" onClick={handleLogoutClick}>Salir</button>
              </div>
            </>
          ) : (
            <div className="d-flex ms-auto">
              <ConnectButton className="btn btn-primary me-2" />
            </div>
          )}
        </div>
      </nav>
      <ConnectDialog />

      <Modal show={showConfirmModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que quiere salir?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmLogout}>Sí</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Menu;

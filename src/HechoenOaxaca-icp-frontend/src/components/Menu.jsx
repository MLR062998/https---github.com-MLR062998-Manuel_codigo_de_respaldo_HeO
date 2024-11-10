import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../index.scss";  // Asegúrate de que esta ruta es correcta

const Menu = () => {
  const { principal, isConnected, disconnect } = useConnect();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Mercado</Link>
          {isConnected && principal ? (
            <>
              <Link to="/nuevo-producto" className="navbar-brand">Nuevo Producto</Link>
              <Link to="/productos" className="navbar-brand">Productos</Link>
              <div className="d-flex ms-auto">
                <Link to="/wallet" className="btn btn-secondary me-2" id="btnWallet">Wallet</Link>
                <button className="btn btn-danger" onClick={() => setShowLogoutModal(true)}>Salir</button>
              </div>
            </>
          ) : (
            <div className="d-flex ms-auto">
              <ConnectButton />
            </div>
          )}
        </div>
      </nav>

      {/* Modal de confirmación de salida */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Está seguro de que quiere salir?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDisconnect}>
            Salir
          </Button>
        </Modal.Footer>
      </Modal>

      <ConnectDialog />
    </div>
  );
};

export default Menu;

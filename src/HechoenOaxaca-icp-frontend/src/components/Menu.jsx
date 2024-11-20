// Menu.jsx
import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ConnectButton, ConnectDialog, useConnect } from '@connect2ic/react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../index.scss";
import WalletComponent from './WalletComponent';  // Importa WalletComponent

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
                {/* Enlace a Wallet */}
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
    <Button
      variant="danger"
      onClick={() => {
        setShowLogoutModal(false); // Cierra el modal
        handleDisconnect();        // Ejecuta la lógica de desconexión
      }}
    >
      Salir
    </Button>
  </Modal.Footer>
</Modal>


      {/* Diálogo de conexión */}
      <ConnectDialog />

      {/* Rutas para los componentes */}
      <Routes>
        <Route path="/wallet" element={<WalletComponent />} />
        {/* Agrega aquí otras rutas, si es necesario */}
      </Routes>
    </div>
  );
};

export default Menu;

import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Wallet from "./Wallet.jsx"; // Componente de Wallet
import { AuthClient } from "@dfinity/auth-client"; // Auth Client de NFID
import "../index.scss";

const Menu = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [principalId, setPrincipalId] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Maneja la autenticación con NFID
  const handleLogin = async () => {
    const authClient = await AuthClient.create();
    const APP_NAME = "Hecho en Oaxaca";
    const APP_LOGO = "https://example.com/logo.png"; // Cambia por la URL de tu logo
    const identityProvider = `https://nfid.one/authenticate?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

    authClient.login({
      identityProvider,
      onSuccess: () => {
        const principal = authClient.getIdentity().getPrincipal().toText();
        setPrincipalId(principal);
        setIsConnected(true);
        alert(`Bienvenido. Tu Principal ID: ${principal}`);
      },
      onError: (error) => {
        console.error("Error de autenticación:", error);
      },
    });
  };

  // Maneja la desconexión
  const handleDisconnect = () => {
    setIsConnected(false);
    setPrincipalId(null);
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Mercado
          </Link>
          {isConnected ? (
            <>
              <Link to="/nuevo-producto" className="navbar-brand">
                Nuevo Producto
              </Link>
              <Link to="/productos" className="navbar-brand">
                Productos
              </Link>
              <div className="d-flex ms-auto">
                {/* Enlace a Wallet */}
                <Link
                  to="/wallet"
                  className="btn btn-secondary me-2"
                  id="btnWallet"
                >
                  Wallet
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Salir
                </button>
              </div>
            </>
          ) : (
            <div className="d-flex ms-auto">
              <button className="btn btn-primary" onClick={handleLogin}>
                Artesanos
              </button>
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
          <Button
            variant="secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowLogoutModal(false); // Cierra el modal
              handleDisconnect(); // Desconectar al usuario
            }}
          >
            Salir
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Rutas para los componentes */}
      <Routes>
        <Route
          path="/wallet"
          element={
            <Wallet
              principalId={principalId}
              isConnected={isConnected}
            />
          }
        />
        {/* Agrega aquí otras rutas, si es necesario */}
      </Routes>
    </div>
  );
};

export default Menu;

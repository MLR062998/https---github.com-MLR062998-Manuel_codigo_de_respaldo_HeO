// src/Menu.jsx
import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom'; 
import { ConnectButton, ConnectDialog, useConnect, Connect2ICProvider } from "@connect2ic/react";
import Product from "./Product";
import UserProduct from "./UserProduct";
import WalletComponent from "./WalletComponent";
import Home from "./Home";
import * as usuarios_backend from "declarations/HechoenOaxaca-icp-backend";
import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";

// Configuración del cliente de conexión
const client = createClient({
  canisters: {
    "HechoenOaxaca-icp-backend": usuarios_backend,
  },
  providers: [
    new InternetIdentity({
      providerUrl: "http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/",
    }),
  ],
  globalProviderConfig: {
    dev: true,
  },
});

const Menu = () => {
  const { principal, isConnected } = useConnect(); // Estado de conexión y principal.

  useEffect(() => {
    const applyCustomStyles = (selector, styles) => {
      const element = document.querySelector(selector);
      if (element) Object.assign(element.style, styles);
    };

    applyCustomStyles('.connect-button', {
      backgroundColor: 'blue',
      fontSize: '17px',
    });

    applyCustomStyles('.ii-styles', {
      color: 'red',
      backgroundColor: 'blue',
      padding: '3px',
      marginLeft: '4px',
    });
  }, [isConnected]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        {isConnected && principal ? (
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Mercado</Link>
            <Link to="/nuevo-producto" className="navbar-brand">Nuevo Producto</Link>
            <Link to="/usuarios" className="navbar-brand" id="btnUserList">Usuarios</Link>
            <div className="d-flex ms-auto">
              <Link to="/wallet" className="btn btn-secondary me-2" id="btnWallet">Wallet</Link>
              <ConnectButton /> {/* Botón para conectar/desconectar */}
            </div>
            <ConnectDialog /> {/* Diálogo de conexión */}
          </div>
        ) : (
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Mercado</a>
            <ConnectButton />
            <ConnectDialog />
          </div>
        )}
      </nav>

      {/* Rutas del sistema */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-producto" element={<UserProduct />} />
        <Route path="/usuarios" element={<Product />} />
        <Route path="/wallet" element={<WalletComponent />} />
      </Routes>
    </div>
  );
};

// Exportación del componente con el cliente `Connect2ICProvider`
export default () => (
  <Connect2ICProvider client={client}>
    <Menu />
  </Connect2ICProvider>
);

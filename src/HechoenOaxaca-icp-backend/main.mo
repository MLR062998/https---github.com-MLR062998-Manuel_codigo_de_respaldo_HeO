// src/Menu.jsx
import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom'; // No importes `BrowserRouter` aquí.
import { ConnectButton, ConnectDialog, useConnect, Connect2ICProvider } from "@connect2ic/react";
import Home from "./Home";
import Product from "./Product";
import UserProduct from "./UserProduct";
import WalletComponent from "./WalletComponent";
import * as usuarios_backend from "declarations/HechoenOaxaca-icp-backend";
import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";

// Configuración del cliente de conexión
const client = createClient({
  canisters: {
    "HechoenOaxaca-icp-backend": usuarios_backend,
  },
  providers: [
    new InternetIdentity({ providerUrl: "http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943/" }),
  ],
  globalProviderConfig: {
    dev: true,
  },
});

const Menu = () => {
  const { principal, isConnected } = useConnect();

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
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      {isConnected && principal ? (
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">Mercado</Link>
          <Link to='/nuevo-producto' className="navbar-brand">Nuevo</Link>
          <Link to='/usuarios' className="navbar-brand" id="btnUserList">Usuarios</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"></a>
              </li>
            </ul>
            <div className="d-flex ms-auto">
              <Link to='/wallet' className="btn btn-secondary me-2" id="btnWallet">Wallet</Link>
              <ConnectButton />
            </div>
            <ConnectDialog />
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Mercado</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"></a>
              </li>
            </ul>
            <ConnectButton />
            <ConnectDialog />
          </div>
        </div>
      )}
    </nav>
  );
};

// Exportación del componente App con Connect2ICProvider
const App = () => (
  <Connect2ICProvider client={client}>
    <Menu />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Producto" element={<Product />} />
      <Route path="/nuevo-producto" element={<UserProduct />} />
      <Route path="/wallet" element={<WalletComponent />} />
    </Routes>
  </Connect2ICProvider>
);

export default App;

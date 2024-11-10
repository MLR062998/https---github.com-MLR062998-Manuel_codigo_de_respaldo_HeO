import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ConnectButton, ConnectDialog, useConnect, Connect2ICProvider } from '@connect2ic/react';
import Productos from './productos';
import WalletComponent from './WalletComponent';
import Home from './Home';
import * as Productos_backend from 'declarations/HechoenOaxaca-icp-backend';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import CrearProducto from './CrearProducto';

const client = createClient({
  canisters: {
    'HechoenOaxaca-icp-backend': Productos_backend,
  },
  providers: [new InternetIdentity({ providerUrl: 'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/' })],
  globalProviderConfig: {
    dev: true,
  },
});

const Menu = () => {
  const { principal, isConnected, disconnect } = useConnect();
  const navigate = useNavigate();

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
                <button className="btn btn-danger" onClick={handleDisconnect}>Salir</button>
              </div>
            </>
          ) : (
            <div className="d-flex ms-auto">
              <ConnectButton />
            </div>
          )}
        </div>
      </nav>
      <ConnectDialog />
      <Routes>
        <Route path="/" element={<Home />} />
        {isConnected && principal && (
          <>
            <Route path="/nuevo-producto" element={<CrearProducto />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/wallet" element={<WalletComponent />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default () => (
  <Connect2ICProvider client={client}>
    <Menu />
  </Connect2ICProvider>
);
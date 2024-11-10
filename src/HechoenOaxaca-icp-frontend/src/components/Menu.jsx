import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ConnectButton, ConnectDialog, useConnect, Connect2ICProvider } from '@connect2ic/react';
import Productos from './productos';
import WalletComponent from './WalletComponent';
import Home from './Home';
import * as Productos_backend from 'declarations/HechoenOaxaca-icp-backend';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import CrearProducto from './CrearProducto';

// Configuración del cliente para Connect2IC
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
  const { principal, isConnected } = useConnect();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Mostrar siempre el botón de Mercado */}
          <Link to="/" className="navbar-brand">Mercado</Link>

          {/* Mostrar las rutas solo si el usuario está conectado */}
          {isConnected && principal ? (
            <>
              <Link to="/nuevo-producto" className="navbar-brand">Nuevo Producto</Link>
              <Link to="/productos" className="navbar-brand">Productos</Link>
              <div className="d-flex ms-auto">
                <Link to="/wallet" className="btn btn-secondary me-2" id="btnWallet">Wallet</Link>
                <ConnectButton />
              </div>
            </>
          ) : (
            /* Mostrar solo el botón de conexión si no está conectado */
            <div className="d-flex ms-auto">
              <ConnectButton />
            </div>
          )}
        </div>
      </nav>

      {/* Mostrar el diálogo de conexión */}
      <ConnectDialog />

      {/* Definir rutas */}
      <Routes>
        {/* Siempre mostrar Home como página principal */}
        <Route path="/" element={<Home />} />

        {/* Rutas protegidas: Solo accesibles si está autenticado */}
        {isConnected && principal && (
          <>
            <Route path="/nuevo-producto" element={<CrearProducto />} />  {/* Ajustado a UserProduct */}
            <Route path="/productos" element={<Productos />} />
            <Route path="/wallet" element={<WalletComponent />} />
          </>
        )}
      </Routes>
    </div>
  );
};

// Exportar el componente envuelto en Connect2ICProvider
export default () => (
  <Connect2ICProvider client={client}>
    <Menu />
  </Connect2ICProvider>
);
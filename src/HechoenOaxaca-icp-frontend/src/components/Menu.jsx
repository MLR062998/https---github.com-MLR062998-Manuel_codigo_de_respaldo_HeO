import React, { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { ConnectButton, ConnectDialog, useConnect, Connect2ICProvider } from '@connect2ic/react'; // <-- Asegúrate de esta importación
import Product from './Product';
import UserProduct from './UserProduct';
import WalletComponent from './WalletComponent';
import Home from './Home';
import * as Productos_backend from 'declarations/HechoenOaxaca-icp-backend';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
//// Actor principal para gestionar productos
//actor HechoenOaxacaBackend 
// Configuración del cliente
const client = createClient({
  canisters: {
    'HechoenOaxaca-icp-backend': Productos_backend,
  },
  providers: [new InternetIdentity({ providerUrl: 'http://a4tbr-q4aaa-aaaaa-qaafq-cai.localhost:4943/' })],
  globalProviderConfig: {
    dev: true,
  },
});

const Menu = () => {
  const { principal, isConnected } = useConnect();

  // Función para detectar cuando un elemento está disponible y modificar su estilo
  function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        callback();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Aplicar estilos personalizados a los botones de conexión
  useEffect(() => {
    onElementAvailable(".ii-styles", () => {
      const btn2 = Array.from(document.getElementsByClassName('ii-styles'));
      const custom_style = {
        "color": "red",
        "background-color": "blue",
        "padding": "3px",
        "margin-left": "4px"
      };
      Object.assign(btn2[0].style, custom_style);

      const texto = Array.from(document.getElementsByClassName('button-label'));
      if (texto[0]) texto[0].remove();

      const img = Array.from(document.getElementsByClassName('img-styles'));
      if (img[0]) img[0].style.height = "25px";
    });

    onElementAvailable(".connect-button", () => {
      const btn = Array.from(document.getElementsByClassName('connect-button'));
      const custom_style = {
        "background-color": "blue",
        "font-size": "17px",
      };
      Object.assign(btn[0].style, custom_style);

      if (btn[0].textContent === 'Connect' || btn[0].textContent === 'Conectar II') {
        btn[0].textContent = 'Conectar II';
      } else {
        btn[0].textContent = 'Desconectar II';
      }
    });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Mercado
          </Link>
          {isConnected && principal && (
            <>
              <Link to="/nuevo-producto" className="navbar-brand">
                Nuevo Producto
              </Link>
              <Link to="/Productos" className="navbar-brand" id="btnProductList">
                Productos 
              </Link>
            </>
          )}
          <div className="d-flex ms-auto">
            <Link to="/wallet" className="btn btn-secondary me-2" id="btnWallet">
              Wallet
            </Link>
            <ConnectButton />
          </div>
        </div>
      </nav>

      <ConnectDialog />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nuevo-producto" element={<UserProduct />} />
        <Route path="/usuarios" element={<Product />} />
        <Route path="/wallet" element={<WalletComponent />} />
      </Routes>
    </div>
  );
};

// Exportación del componente con Connect2ICProvider
export default () => (
  <Connect2ICProvider client={client}>
    <Menu />
  </Connect2ICProvider>
);

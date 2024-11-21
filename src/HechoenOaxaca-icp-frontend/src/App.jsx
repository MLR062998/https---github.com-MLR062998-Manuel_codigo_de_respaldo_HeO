// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import CrearProducto from './components/CrearProducto';
import Products from './components/productos';
import Home from './components/Home';
import { Connect2ICProvider } from '@connect2ic/react';
import * as Productos_backend from 'declarations/HechoenOaxaca-icp-backend';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import PrincipaldeCompra from './components/PrincipaldeCompra';
import ConfirmacionPago from './components/ConfirmacionPago';
import Wallet from './components/Wallet.jsx';
import { AuthClient } from "@dfinity/auth-client"; // Agregar AuthClient para autenticación

const client = createClient({
  canisters: {
    'HechoenOaxaca-icp-backend': Productos_backend,
  },
  providers: [new InternetIdentity({ providerUrl: 'http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/' })],
  globalProviderConfig: {
    dev: true,
  },
});

function App() {
  const [principalId, setPrincipalId] = useState(null);

  // Inicializar AuthClient y obtener principalId
  useEffect(() => {
    const initAuthClient = async () => {
      const authClient = await AuthClient.create();
      if (authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        setPrincipalId(identity.getPrincipal().toText());
      }
    };
    initAuthClient();
  }, []);

  return (
    <Connect2ICProvider client={client}>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo-producto" element={<CrearProducto />} />
          <Route path="/productos" element={<Products />} />
          <Route path="/compra" element={<PrincipaldeCompra />} /> {/* Ruta para PrincipaldeCompra */}
          <Route path="/ConfirmacionPago" element={<ConfirmacionPago />} />
          <Route path="/Wallet" element={<Wallet principalId={principalId} />} />
          {/* Otras rutas necesarias */}
        </Routes>
      </Router>
    </Connect2ICProvider>
  );
}

export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import CrearProducto from './components/CrearProducto';
import Products from './components/productos';
import Home from './components/Home';
import { Connect2ICProvider } from '@connect2ic/react';
import * as Productos_backend from 'declarations/HechoenOaxaca-icp-backend';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';


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
  return (
    <Connect2ICProvider client={client}>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo-producto" element={<CrearProducto />} />
          <Route path="/productos" element={<Products />} />
          {/* Otras rutas necesarias */}
        </Routes>
      </Router>
    </Connect2ICProvider>
  );
}

export default App;
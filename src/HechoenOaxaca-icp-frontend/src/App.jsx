import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu'; // Menú de navegación
import WalletComponent from './components/WalletComponent'; // Componente Wallet
import Home from './components/Home'; // Componente Home
import './index.scss'; // Estilos

function App() {
  return (
    <div className="container">
      <Router>
        {/* Menu que maneja la navegación */}
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<WalletComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

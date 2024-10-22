import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu'; // Menú de navegación
import ProductCreate from './components/UserProduct'; // Componente para crear productos
import Products from './components/Product'; // Componente para listar productos
import Home from './components/Home'; // Componente de inicio

function App() {
  return (
    <div className="container">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nuevo-producto" element={<ProductCreate />} />
          <Route path="/productos" element={<Products />} /> {/* Ruta corregida */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

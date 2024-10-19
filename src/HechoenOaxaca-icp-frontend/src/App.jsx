// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import WalletComponent from './components/WalletComponent'; 
import Home from './components/Home';
import './index.scss';

function App() {
  return (
    <div className='container'>
      <Router>
        <Menu />  {/* No mover este Router al interior de Menu.jsx */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<WalletComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

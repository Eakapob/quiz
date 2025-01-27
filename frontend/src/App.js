import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Document from './component/Document'; 
import Cart from './component/Cart';     // นำเข้า Cart จาก components

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Document</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </nav>
        </header> */}

        <main>
          <Routes>
            <Route path="/" element={<Document />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
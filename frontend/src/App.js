import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Document from './component/Document'; 
import Create from './component/Create'; // นำเข้า Create จาก components
import Cart from './component/Cart';     // นำเข้า Cart จาก components

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Document</Link> {/* ลิงค์ไปที่หน้า Document */}
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Document />} /> {/* ให้ Document เป็นหน้าแรก */}
            <Route path="/create" element={<Create />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
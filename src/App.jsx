import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/items" element={<SearchResults/>} />
          <Route path="/item/:id" element={<ProductDetail/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';
import bazarIcon from '../assets/bazarIcon.png'; // Asegúrate de reemplazar esto con la ruta correcta a tu imagen o icono

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${searchTerm}`);
  };

  return (
    <div className="text-center mt-5">
      <img src={bazarIcon} alt="Bazar Icon" style={{ maxWidth: '150px', marginBottom: '20px' }} />
      <h1>Bazar Universal</h1> {/* o Bazar Online según prefieras */}
      <Form className="d-flex justify-content-center mt-3" onSubmit={handleSearch}>
        <FormControl
          type="text"
          placeholder="Buscar productos..."
          className="me-2"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-success" type="submit">Buscar</Button>
      </Form>
    </div>
  )
}

export default Home;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, ListGroup, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './ProductDetail.css';

import { Form, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); // Estado para la imagen seleccionada
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/items?search=${searchTerm}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://www.bazarapi.somee.com/api/items/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]); // Establece la primera imagen como la seleccionada por defecto
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  const ratingStars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < product.rating ? '#ffc107' : '#e4e5e9'} />
  ));

  return (
    <Container>
  <Form className="d-flex justify-content-center mt-5 mb-3 my-5" onSubmit={handleSearch}>
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
      <br />
      <Row className="mt-5 my-5">
        <Col md={6}>
          {/* Imagen principal */}
          <Image src={selectedImage} alt={product.title} className="img-fluid mb-3 main-image" />

          {/* Miniaturas de imágenes */}
          <div className="thumbnails">
            {product.images.map((image, index) => (
              <Image 
                key={index} 
                src={image} 
                alt={`${product.title} image ${index}`} 
                className={`img-thumbnail ${image === selectedImage ? 'selected' : ''}`} 
                onClick={() => setSelectedImage(image)} // Actualizar la imagen seleccionada al hacer clic
              />
            ))}
          </div>
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <div className="d-flex align-items-center mb-3">
            {ratingStars}
            <span className="ml-2">{product.rating}</span>
          </div>
          <ListGroup variant="flush">
            <ListGroup.Item>Precio: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Descuento: {product.discountPercentage}%</ListGroup.Item>
            <ListGroup.Item>Stock: {product.stock > 0 ? 'En stock' : 'Agotado'}</ListGroup.Item>
            <ListGroup.Item>Marca: {product.brand}</ListGroup.Item>
            <ListGroup.Item>Categoría: {product.category}</ListGroup.Item>
            <ListGroup.Item>Descripción: {product.description}</ListGroup.Item>
          </ListGroup>
          <Button variant="primary" className="mt-3">Añadir al carrito</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;

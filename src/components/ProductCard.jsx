import React from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  // Generar estrellas de calificación
  const ratingStars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} color={index < product.rating ? '#ffc107' : '#e4e5e9'} />
  ));

  return (
    <Card className="shadow-sm bg-white rounded" style={{ maxWidth: '18rem', margin: 'auto', marginBottom: '1rem' }}>
      <Card.Img variant="top" src={product.thumbnail} alt={product.title} style={{ objectFit: 'cover', height: '250px' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-0 font-weight-bold text-truncate">{product.title}</Card.Title>
        <span className="text-muted">${product.price}</span>
        <Card.Text className="text-secondary mt-2">
          {product.description.slice(0, 100)}...
        </Card.Text>
        <ListGroup className="list-group-flush my-3">
          <ListGroupItem className="px-2 py-1">Descuento: {product.discountPercentage}%</ListGroupItem>
          <ListGroupItem className="px-2 py-1">Calificación: <div className="d-flex align-items-center">{ratingStars}</div></ListGroupItem>
          <ListGroupItem className="px-2 py-1">Stock: {product.stock > 0 ? 'En stock' : 'Agotado'}</ListGroupItem>
          <ListGroupItem className="px-2 py-1">Marca: {product.brand}</ListGroupItem>
          <ListGroupItem className="px-2 py-1">Categoría: {product.category}</ListGroupItem>
        </ListGroup>
        <Button className="mt-auto btn-sm" variant="success" href={`/item/${product.id}`}>Ver más</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

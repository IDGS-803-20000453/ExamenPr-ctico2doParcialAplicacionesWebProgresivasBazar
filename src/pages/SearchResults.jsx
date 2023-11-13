import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Form, FormControl, Pagination, Row, Col } from 'react-bootstrap';

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const { search } = useLocation();
  const navigate = useNavigate();
  const productsPerPage = 12;

  useEffect(() => {
    const query = new URLSearchParams(search).get('search') || '';
    setSearchTerm(query);
    fetchProducts();
  }, [search]);

  useEffect(() => {
    filterAndPaginateProducts(searchTerm, products);
  }, [searchTerm, products, currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://www.bazarapi.somee.com/api/items`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterAndPaginateProducts = (query, data) => {
    const filteredData = query
      ? data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : data;
    setFilteredProducts(
      filteredData.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
    );
    setTotalPages(Math.ceil(filteredData.length / productsPerPage));
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    navigate(`/items?search=${e.target.value}`);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let active = currentPage;
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={() => handlePageClick(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Form className="d-flex justify-content-center mt-5">
        <FormControl
          type="text"
          placeholder="Buscar productos..."
          className="me-2"
          name="search"
          value={searchTerm}
          onChange={handleChange}
        />
      </Form>
      <Pagination className="justify-content-center">{items}</Pagination>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProducts.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center">{items}</Pagination>
    </div>
  );
}

export default SearchResults;

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import bazarIcon from '../assets/bazarIcon.png'; // Asegúrate de tener la ruta correcta a tu imagen

function MyNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <Image src={bazarIcon} alt="Bazar Icon" style={{ width: '30px', marginRight: '10px' }} />
            Bazar Universal
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {/* Aquí podrías tener otros enlaces o contenido si lo necesitas */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;

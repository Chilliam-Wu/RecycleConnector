import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function Header() {
  return (
    <header>
      <Navbar bg='primary' expand='lg' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>RecConnector</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav '
            className='justify-content-end'
          >
            <Nav>
              <Nav.Link href='/products'>All Products</Nav.Link>
              <Nav.Link href='/login' className='mx-4'>
                <i className='fas fa-user' /> Login
              </Nav.Link>
              <Nav.Link href='/register'>
                <i class='fas fa-solid fa-arrow-pointer'></i> Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

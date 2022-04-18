import React, { Fragment } from 'react';
import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const clickHandler = () => {
    dispatch(logout());
  };

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
              <Nav.Link href='/' className='me-4'>
                Home
              </Nav.Link>
              <Nav.Link href='/products' className='me-4'>
                All Products
              </Nav.Link>
              {userInfo ? (
                <Fragment>
                  <Nav.Link href='/message' className='me-3'>
                    <i className='fas fa-envelope' /> Message
                  </Nav.Link>
                  <Nav.Link href='/cart' className='me-3'>
                    <i className='fas fa-shopping-cart' /> Cart
                  </Nav.Link>
                  <NavDropdown
                    title={
                      <span>
                        <Image
                          className='avatar me-1'
                          src={
                            userInfo &&
                            `data:image/*;base64,${btoa(
                              userInfo.avatar.data.data
                                .map((c) => String.fromCharCode(c))
                                .join('')
                            )}`
                          }
                          style={{ height: '25px' }}
                        />
                        {userInfo.username}
                      </span>
                    }
                    id='basic-nav-dropdown'
                    className='me-3'
                  >
                    <NavDropdown.Item href='/profile'>
                      View profile
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/order'>
                      Order history
                    </NavDropdown.Item>
                    <NavDropdown.Item href='/post'>Your post</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={() => clickHandler()}>
                    <i className='fas fa-sign-out-alt'></i> Logout
                  </Nav.Link>
                </Fragment>
              ) : (
                <Fragment>
                  <Nav.Link href='/login' className='me-4'>
                    <i className='fas fa-user' /> Login
                  </Nav.Link>
                  <Nav.Link href='/register'>
                    <i className='fas fa-solid fa-arrow-pointer'></i> Register
                  </Nav.Link>
                </Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

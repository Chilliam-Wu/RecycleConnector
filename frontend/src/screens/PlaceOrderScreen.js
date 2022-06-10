import React, { useEffect } from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartDetails = useSelector((state) => state.cartDetails);
  const { cartItems } = cartDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 style={{ paddingTop: '2rem', color: '#78c2ad' }}>Shipping</h2>
              <p>
                <strong>Address:</strong> University of Waterloo
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2 style={{ paddingTop: '2rem', color: '#78c2ad' }}>
                Payment Method
              </h2>
              <p>
                <strong>Method:</strong> Paypal
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 style={{ paddingTop: '2rem', color: '#78c2ad' }}>
                Order Items
              </h2>
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className='align-items-center'>
                      <Col md={3}>
                        <Link to={`/products/clothes/${item.product}`}>
                          <Image
                            style={{ height: '150px', width: '120px' }}
                            // src={item.image}
                            src={
                              typeof item.image === 'string'
                                ? item.image
                                : `data:image/png;base64,${btoa(
                                    item.image.data.data
                                      .map((c) => String.fromCharCode(c))
                                      .join('')
                                  )}`
                            }
                          ></Image>
                        </Link>
                      </Col>
                      <Col>
                        <Link
                          to={`/products/clothes/${item.product}`}
                          style={{ color: '#212529' }}
                        >
                          {' '}
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${Number(item.price).toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2 style={{ paddingTop: '2rem' }}>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>$0.00</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>$0.00</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>$0.00</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>$0.00</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item className='d-grid'>
              <Button
                className='btn-block'
                type='button'
                // when no items in cart, we disable the button
                disabled={cartItems.length === 0}
                // everytime we click the button, it triggers checkoutHandler()
                // onClick={placeOrder}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;

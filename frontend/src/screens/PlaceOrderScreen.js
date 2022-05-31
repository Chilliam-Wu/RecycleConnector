import React from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen() {
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
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;

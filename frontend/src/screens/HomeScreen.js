import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';

function HomeScreen() {
  return (
    <div>
      <h1>TOP VIEWS</h1>
      <ProductCarousel />

      {/* Display top views by category */}
      <h3>
        Clothes{' '}
        <span>
          <Link to='/clothes' style={{ fontSize: '0.9rem' }}>
            MORE
          </Link>
        </span>
      </h3>

      {/* products.map card */}
      <div>
        <Row>
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard />
          </Col>
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomeScreen;

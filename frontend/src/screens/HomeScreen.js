import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { getAllProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

function HomeScreen() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);
  const { loading, error, products } = allProducts;

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <h1>TOP VIEWS</h1>
      <ProductCarousel />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <div>
          {/* Display top views by category */}
          <h3>
            Clothes{' '}
            <span>
              <Link to='/clothes' style={{ fontSize: '0.9rem' }}>
                MORE
              </Link>
            </span>
          </h3>

          <div>
            <Row>
              {products.map((product, index) => (
                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeScreen;

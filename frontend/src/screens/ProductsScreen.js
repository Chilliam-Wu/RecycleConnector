import React, { useEffect } from 'react';
import { Tab, Row, Col, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';

function ProductsScreen() {
  const location = useLocation();
  const entry = location.search ? location.search.split('=')[1] : '';

  const navigate = useNavigate();

  const allProducts = useSelector((state) => state.allProducts);
  const { loading, error, products } = allProducts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>ALL PRODUCTS</h1>
      {/* go back to previous page */}
      <Button className='btn btn-light mt-5' onClick={() => navigate(-1)}>
        {' '}
        Go back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <div className='mt-4'>
          <Tab.Container
            id='left-tabs-example'
            defaultActiveKey={
              entry ? entry : products.map((product) => product.category)[0]
            }
          >
            <Row>
              <Col sm={3}>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link eventKey='disabled' disabled>
                      All Categories
                    </Nav.Link>
                  </Nav.Item>
                  {products
                    .map((product) => product.category)
                    .filter(
                      (category, index) =>
                        products
                          .map((product) => product.category)
                          .indexOf(category) === index
                    )
                    .map((category, index) => (
                      <Nav.Item key={index}>
                        <Nav.Link
                          eventKey={category}
                          href={`/products?category=${category}`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  {products
                    .map((product) => product.category)
                    .filter(
                      (category, index) =>
                        products
                          .map((product) => product.category)
                          .indexOf(category) === index
                    )
                    .map((category, index) => (
                      <Tab.Pane key={index} eventKey={category}>
                        <Row>
                          {products
                            .filter((product) => product.category === category)
                            .sort((p1, p2) => (p1.views < p2.views ? 1 : -1))
                            .map((product, index) => (
                              <Col key={index} sm={12} md={6} lg={4}>
                                <ProductCard product={product} />
                              </Col>
                            ))}
                        </Row>
                      </Tab.Pane>
                    ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      )}
    </div>
  );
}

export default ProductsScreen;

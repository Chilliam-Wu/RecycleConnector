import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

function ProductDetailsScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  return (
    <div>
      {/* <Link to='/' className='btn btn-light my-5'>
        Go Back
      </Link> */}
      <Button className='btn btn-light my-5' onClick={() => navigate(-1)}>
        {' '}
        Go back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={5}>
              <Image src={product && product.image} alt='product' fluid />
            </Col>
            <Col md={7}>
              <ListGroup variant='flush' className='ms-5 mb-5'>
                <ListGroupItem className='mb-4'>
                  <h1>{product && product.name}</h1>
                </ListGroupItem>
                <ListGroupItem className='mb-4' style={{ color: '#888' }}>
                  <h5>Price: ${product && product.price}</h5>
                </ListGroupItem>
                <ListGroupItem className='mb-4' style={{ color: '#888' }}>
                  <h5>Description: {product && product.description}</h5>
                </ListGroupItem>
                <ListGroupItem className='mb-4' style={{ color: '#888' }}>
                  <h5>
                    Seller:{' '}
                    {product && product.userInfo && product.userInfo.username}{' '}
                    <span>
                      <Image
                        className='avatar me-1'
                        src={
                          product && product.userInfo && product.userInfo.avatar
                        }
                        style={{ height: '25px' }}
                      />
                    </span>
                  </h5>
                </ListGroupItem>
                <ListGroupItem className='mt-4'>
                  <Link
                    to='/cart'
                    className='btn btn-primary btn-lg'
                    style={{ display: 'block' }}
                  >
                    <i className='fas fa-shopping-cart' /> Add To Cart
                  </Link>
                  <Button
                    className='btn btn-light btn-lg btn-block'
                    style={{ width: '100%' }}
                    onClick={() => setShow(!show)}
                  >
                    <i className='fas fa-envelope' /> Message To Seller
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
          {show && (
            <Row className='mt-5'>
              <Col>
                <Form>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as='textarea'
                      placeholder='Leave a message...'
                      rows={5}
                    />
                    <Button style={{ float: 'right' }} className='mt-3'>
                      Send
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductDetailsScreen;

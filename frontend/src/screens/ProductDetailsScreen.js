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
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetails } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart } from '../actions/cartActions';
import { ADD_TO_CART_RESET } from '../constants/cartConstants';

function ProductDetailsScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [msgShow, setMsgShow] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const cartAdd = useSelector((state) => state.cartAdd);
  const { success: add_success, error: add_error } = cartAdd;

  const addHandler = () => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (add_error) {
      setErrorMsg(add_error);
      setTimeout(() => {
        setMsgShow(false);
        setErrorMsg('');
        setMsgShow(true);
      }, 3000);
      dispatch({ type: ADD_TO_CART_RESET });
    }
    if (add_success) {
      setSuccessMsg(add_success);
      setTimeout(() => {
        setMsgShow(false);
        setSuccessMsg('');
        setMsgShow(true);
      }, 3000);
      dispatch({ type: ADD_TO_CART_RESET });
    }
  }, [id, dispatch, add_error, add_success]);

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
          {errorMsg && (
            <Message variant='secondary' show={msgShow}>
              {errorMsg}
            </Message>
          )}
          {successMsg && (
            <Message variant='success' show={msgShow}>
              {successMsg}
            </Message>
          )}
          <Row>
            <Col md={5}>
              {/* <Image src={product && product.image} alt='product' fluid /> */}
              <Image
                src={
                  product &&
                  product.image &&
                  (typeof product.image === 'string'
                    ? product.image
                    : `data:image/png;base64,${btoa(
                        product.image.data.data
                          .map((c) => String.fromCharCode(c))
                          .join('')
                      )}`)
                }
                alt='product'
                fluid
              />
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
                  <Button
                    className='btn btn-primary btn-lg'
                    style={{ display: 'block', width: '100%' }}
                    onClick={() => addHandler()}
                  >
                    <i className='fas fa-shopping-cart' /> Add To Cart
                  </Button>
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

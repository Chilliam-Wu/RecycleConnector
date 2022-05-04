import React, { useEffect, useState } from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, getCartDetails } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { DELETE_FROM_CART_RESET } from '../constants/cartConstants';

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartDetails = useSelector((state) => state.cartDetails);
  const { loading, cartItems, error, cartLength } = cartDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartDelete = useSelector((state) => state.cartDelete);
  const { success: delete_success } = cartDelete;

  // init checkState
  const [checkState, setCheckState] = useState(new Array(100).fill(true));

  const [total, setTotal] = useState(-1);
  const [count, setCount] = useState(-1);

  const checkHandler = (position) => {
    // change checked state of specific item
    checkState.length = cartLength;
    const updatedCheckedState = checkState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckState(updatedCheckedState);

    // update total price
    const totalPrice = updatedCheckedState.reduce((sum, cur, index) => {
      if (cur === true) {
        return sum + cartItems[index].price;
      }
      return sum;
    }, 0);
    setTotal(Number(totalPrice).toFixed(2));

    // update count
    const items = updatedCheckedState.reduce((sum, cur, index) => {
      if (cur === true) {
        return sum + 1;
      }
      return sum;
    }, 0);
    setCount(items);
  };

  const deleteHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (delete_success) {
      dispatch({ type: DELETE_FROM_CART_RESET });
    }

    dispatch(getCartDetails());
  }, [dispatch, navigate, userInfo, delete_success]);

  return (
    <div>
      <h1>Your Cart</h1>
      <Button className='btn btn-light my-5' onClick={() => navigate(-1)}>
        Go back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : cartItems.length === 0 ? (
        <Message variant='info'>
          <h6 style={{ color: 'white' }}>
            Your cart is empty.{' '}
            <Link to='/' className='mx-3'>
              Add items
            </Link>{' '}
          </h6>
        </Message>
      ) : (
        <div>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row className='align-items-center'>
                      <Col md={1}>
                        {' '}
                        <input
                          type='checkbox'
                          id={index}
                          checked={checkState[index]}
                          onChange={() => checkHandler(index)}
                        ></input>
                      </Col>
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
                      <Col md={5}>
                        <Link
                          to={`/products/clothes/${item.product}`}
                          style={{ color: '#212529' }}
                        >
                          {' '}
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>${Number(item.price).toFixed(2)}</Col>
                      <Col md={1}>
                        <Button
                          variant='light'
                          onClick={() => deleteHandler(item.product)}
                        >
                          <i className='fas fa-trash'></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroup.Item>
                  <h4 className='my-2' style={{ color: 'gray' }}>
                    <em>
                      SUBTOTAL ({count === -1 ? cartItems.length : count} items)
                    </em>
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className='my-2'>
                    <Col md={6}>
                      <h5>Total: </h5>
                    </Col>
                    <Col>
                      <h5>
                        $
                        {total === -1
                          ? cartItems
                              .map((item) => item.price)
                              .reduce((prev, cur) => prev + cur)
                              .toFixed(2)
                          : total}
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Button
                        className='mt-2 btn btn-primary'
                        style={{ display: 'block', width: '100%' }}
                      >
                        Proceed to Checkout
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default CartScreen;

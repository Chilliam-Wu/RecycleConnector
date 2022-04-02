import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

function CartScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartDetails = useSelector((state) => state.cartDetails);
  const { loading, cartItems, error } = cartDetails;

  useEffect(() => {
    dispatch(getCartDetails());
  }, [dispatch]);

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
          <h6 style={{ color: 'white' }}>Your cart is empty.</h6>
        </Message>
      ) : (
        <Table responsive striped>
          <thead>
            <tr>
              <td>NO.</td>
              <td>IMAGE</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>DESCRIPTION</td>
              <td></td>
            </tr>
          </thead>
          <tbody></tbody>
        </Table>
      )}
    </div>
  );
}

export default CartScreen;

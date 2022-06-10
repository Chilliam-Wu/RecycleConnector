import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

function ShippingScreen() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/payment');
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <FormContainer>
      <CheckoutSteps step1 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-4' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type='text'
            name='address'
            placeholder='Enter Address'
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group className='mb-4' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type='text'
            name='city'
            placeholder='Enter City'
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group className='mb-4' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type='text'
            name='postalCode'
            placeholder='Enter Postal Code'
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>

        <Form.Group className='mb-4' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type='text'
            name='country'
            placeholder='Enter Country'
            onChange={(e) => changeHandler(e)}
          />
        </Form.Group>
        <Button style={{ float: 'right' }} type='submit'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;

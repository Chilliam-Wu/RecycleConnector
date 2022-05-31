import React from 'react';
import { Button, Col, Form, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

function PaymentScreen() {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <FormGroup className='my-4'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              checked
            ></Form.Check>
          </Col>
        </FormGroup>

        <Button type='submit'>Continue</Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;

import React, { useState } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading } = userLogin;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    navigate('/');
  };

  return (
    <div>
      <FormContainer>
        <h2>Sign In</h2>
        {loading && <Loader />}
        {error && <Message variant='secondary'>{error}</Message>}
        <Form onSubmit={(e) => submitHandler(e)}>
          <FormGroup className='my-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter Email'
              name='email'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
          <FormGroup className='my-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Enter Password'
              name='password'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
          <Button variant='primary' type='submit'>
            Sign In
          </Button>
        </Form>

        <Row>
          <Col className='my-3'>
            Don't have an account? <Link to='/register'>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default LoginScreen;

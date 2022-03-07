import React, { useState, useEffect } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import { REGISTER_RESET } from '../constants/userConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

function ResgisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { success, loading, error } = userRegister;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { username, email, password, confirmPassword } = formData;
  const [message, setMessage] = useState('');

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password does not match');
    } else {
      dispatch(register(username, email, password));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: REGISTER_RESET });
      navigate('/');
    }
  }, [navigate, success, dispatch]);

  return (
    <div>
      <FormContainer>
        <h2>Register</h2>
        {loading && <Loader />}
        {message && <Message variant='secondary'>{message}</Message>}
        {error && <Message variant='secondary'>{error}</Message>}
        <Form onSubmit={(e) => submitHandler(e)}>
          <FormGroup className='my-3' controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type='name'
              placeholder='Enter Username'
              name='username'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
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
          <FormGroup className='my-3' controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
          <Button variant='primary' type='submit'>
            Register
          </Button>
        </Form>

        <Row>
          <Col className='my-3'>
            Already have an account? <Link to='/login'>Sign In</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
}

export default ResgisterScreen;

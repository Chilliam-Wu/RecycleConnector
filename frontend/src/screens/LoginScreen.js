import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { LOGIN_RESET } from '../constants/userConstants';

function LoginScreen() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // navigate('/');
  };

  // set timeout to Alert
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    if (error) {
      setMessage(error);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: LOGIN_RESET });
    }
  }, [error, show, dispatch, navigate, userInfo]);

  return (
    <div>
      <FormContainer>
        <h2>Sign In</h2>
        {loading && <Loader />}
        {message && (
          <Message show={show} variant='secondary'>
            {message}
          </Message>
        )}
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

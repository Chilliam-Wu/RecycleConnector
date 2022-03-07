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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { username, email, password, confirmPassword } = formData;
  const [confirm, setConfirm] = useState('');

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirm('Password does not match');
    } else {
      dispatch(register(username, email, password));
    }
  };

  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
    if (success) {
      dispatch({ type: REGISTER_RESET });
      navigate('/');
    }
    if (error) {
      setMessage(error);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: REGISTER_RESET });
    }
    if (confirm) {
      setTimeout(() => {
        setShow(false);
        setConfirm('');
        setShow(true);
      }, 3000);
    }
  }, [navigate, success, error, show, dispatch, confirm]);

  return (
    <div>
      <FormContainer>
        <h2>Register</h2>
        {loading && <Loader />}
        {confirm && (
          <Message show={show} variant='secondary'>
            {confirm}
          </Message>
        )}
        {message && <Message variant='secondary'>{message}</Message>}
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
              minLength='6'
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
              minLength='6'
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

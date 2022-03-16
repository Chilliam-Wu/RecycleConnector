import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { editProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { EDIT_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const id = userInfo && userInfo.id;

  const userProfileEdit = useSelector((state) => state.userProfileEdit);
  const {
    loading: edit_loading,
    error: edit_error,
    success: edit_success,
  } = userProfileEdit;

  const [formData, setFormData] = useState({
    user_name: '',
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const { user_name, old_password, new_password, confirm_password } = formData;

  // set timeout to Alert
  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // const [oldPasswordShown, setOldPasswordShown] = useState(false);
  // const [newPasswordShown, setNewPasswordShown] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setFormData({ user_name: userInfo.username });
    }
    if (edit_error) {
      setErrorMessage(edit_error);
      setTimeout(() => {
        setShow(false);
        setErrorMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: EDIT_PROFILE_RESET });
    }
    if (edit_success) {
      setSuccessMessage('Edit successfully!');
      setTimeout(() => {
        setShow(false);
        setSuccessMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: EDIT_PROFILE_RESET });
    }
  }, [userInfo, navigate, edit_error, dispatch, edit_success]);

  const profileSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(id, user_name));
  };

  return (
    <div>
      <Button className='btn btn-light mt-5' onClick={() => navigate(-1)}>
        {' '}
        Go back
      </Button>
      <h3>Basic Info</h3>
      <FormContainer>
        {edit_loading && <Loader />}
        {errorMessage && (
          <Message show={show} variant='secondary'>
            {errorMessage}
          </Message>
        )}
        {successMessage && (
          <Message show={show} variant='success'>
            {successMessage}
          </Message>
        )}
        <Form onSubmit={(e) => profileSubmit(e)}>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>Avatar:</Form.Label>
            <Row>
              <Col className='mx-5' md={3}>
                <Image
                  className='avatar'
                  src='http://www.gravatar.com/avatar/79670b45df1b452326c80247831a6cd6?s=200&r=rg&d=robohash'
                  alt='Avatar'
                  style={{ height: '100px' }}
                />
              </Col>
              <Col className='d-flex  align-items-center justify-content-center'>
                <Form.Control type='file' size='sm'></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='username' className='mb-3'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type='text'
              name='user_name'
              value={user_name}
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Button style={{ float: 'right' }} type='submit'>
            Edit
          </Button>
        </Form>
      </FormContainer>

      <h3 className='mt-3'>Change Password</h3>
      <FormContainer>
        <Form>
          <Form.Group controlId='oldPassword' className='mb-3'>
            <Form.Label>Please enter old password:</Form.Label>
            <Form.Control
              type='password'
              name='old_password'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Button style={{ float: 'right' }} type='submit'>
            Confirm
          </Button>
          {/* <Form.Group controlId='newPassword' className='mb-3'>
            <Form.Label>New Password:</Form.Label>
            <Row>
              <Col md={11}>
                <Form.Control
                  type={newPasswordShown ? 'text' : 'password'}
                  name='new_password'
                  onChange={(e) => changeHandler(e)}
                ></Form.Control>
              </Col>
              <Col className='d-flex  align-items-center justify-content-center'>
                <i
                  className={
                    newPasswordShown ? 'fas fa-eye-slash' : 'fas fa-eye'
                  }
                  onClick={() => setNewPasswordShown(!newPasswordShown)}
                ></i>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='mb-3'>
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              name='confirm_password'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </Form.Group>
          <Button style={{ float: 'right' }}>Update</Button> */}
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProfileScreen;

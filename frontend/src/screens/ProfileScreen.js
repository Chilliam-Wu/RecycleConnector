import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import {
  changePassword,
  confirmPassword,
  editProfile,
} from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  CHANGE_PASSWORD_RESET,
  CONFIRM_PASSWORD_RESET,
  EDIT_PROFILE_RESET,
} from '../constants/userConstants';

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

  const userConfirmPassword = useSelector((state) => state.userConfirmPassword);
  const {
    loading: confirm_loading,
    error: confirm_error,
    success: confirm_success,
  } = userConfirmPassword;

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const {
    loading: change_loading,
    error: change_error,
    success: change_success,
  } = userChangePassword;

  const [formData, setFormData] = useState({
    user_name: '',
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const { user_name, old_password, new_password, confirm_password } = formData;

  // set timeout to Alert
  const [show, setShow] = useState(true);
  const [editErrorMessage, setEditErrorMessage] = useState('');
  const [editSuccessMessage, setEditSuccessMessage] = useState('');
  const [confirmErrorMessage, setConfirmErrorMessage] = useState('');
  const [confirmSuccessMessage, setConfirmSuccessMessage] = useState(false);
  const [matchMessage, setMatchMessage] = useState('');
  const [changeErrorMessage, setChangeErrorMessage] = useState('');
  const [changeSuccessMessage, setChangeSuccesswMessage] = useState('');

  // show the password or not
  const [newPasswordShown, setNewPasswordShown] = useState(false);

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
      setEditErrorMessage(edit_error);
      setTimeout(() => {
        // after 3s, alert disappears and message gets cleared
        setShow(false);
        setEditErrorMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: EDIT_PROFILE_RESET });
    }
    if (edit_success) {
      setEditSuccessMessage('Edit profile successfully!');
      setTimeout(() => {
        setShow(false);
        setEditSuccessMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: EDIT_PROFILE_RESET });
    }
    if (confirm_error) {
      setConfirmErrorMessage(confirm_error);
      setTimeout(() => {
        setShow(false);
        setConfirmErrorMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: CONFIRM_PASSWORD_RESET });
    }
    if (confirm_success) {
      setConfirmSuccessMessage(true);
      dispatch({ type: CONFIRM_PASSWORD_RESET });
    }
    if (change_error) {
      setChangeErrorMessage(change_error);
      setTimeout(() => {
        setShow(false);
        setChangeErrorMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
    if (change_success) {
      setChangeSuccesswMessage(change_success);
      setTimeout(() => {
        setShow(false);
        setChangeSuccesswMessage('');
        setShow(true);
      }, 3000);
      dispatch({ type: CHANGE_PASSWORD_RESET });
      setFormData({ new_password: '', confirm_password: '' });
    }
  }, [
    userInfo,
    navigate,
    edit_error,
    dispatch,
    edit_success,
    confirm_error,
    confirm_success,
    change_error,
    change_success,
  ]);

  const profileSubmit = (e) => {
    e.preventDefault();
    dispatch(editProfile(id, user_name));
  };

  const confirmSubmit = (e) => {
    e.preventDefault();
    dispatch(confirmPassword(id, old_password));
  };

  const changeSubmit = (e) => {
    e.preventDefault();
    if (new_password !== confirm_password) {
      setMatchMessage('Passwords do not match');
      setTimeout(() => {
        setShow(false);
        setMatchMessage('');
        setShow(true);
      }, 3000);
    } else {
      dispatch(changePassword(id, new_password));
    }
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
        {editErrorMessage && (
          <Message show={show} variant='secondary'>
            {editErrorMessage}
          </Message>
        )}
        {editSuccessMessage && (
          <Message show={show} variant='success'>
            {editSuccessMessage}
          </Message>
        )}
        <Form onSubmit={(e) => profileSubmit(e)}>
          <Form.Group controlId='formFile' className='mb-3'>
            <Form.Label>Avatar:</Form.Label>
            <Row>
              <Col className='mx-5' xs={3}>
                <Image
                  className='avatar'
                  src={userInfo && userInfo.avatar}
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
        {confirm_loading && <Loader />}
        {confirmErrorMessage && (
          <Message show={show} variant='secondary'>
            {confirmErrorMessage}
          </Message>
        )}
        {confirmSuccessMessage ? (
          <Form onSubmit={(e) => changeSubmit(e)}>
            {change_loading && <Loader />}
            {matchMessage && (
              <Message show={show} variant='secondary'>
                {matchMessage}
              </Message>
            )}
            {changeErrorMessage && (
              <Message show={show} variant='secondary'>
                {changeErrorMessage}
              </Message>
            )}
            {changeSuccessMessage && (
              <Message show={show} variant='success'>
                {changeSuccessMessage}
              </Message>
            )}
            <Form.Group controlId='newPassword' className='mb-3'>
              <Form.Label>Please enter new password:</Form.Label>
              <Row>
                <Col xs={10}>
                  <Form.Control
                    type={newPasswordShown ? 'text' : 'password'}
                    name='new_password'
                    value={new_password}
                    minLength='6'
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
              <Form.Label>Please confirm password:</Form.Label>
              <Form.Control
                type='password'
                name='confirm_password'
                value={confirm_password}
                minLength='6'
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>
            <Button
              style={{ float: 'right' }}
              className='btn-light'
              onClick={() => setConfirmSuccessMessage(false)}
            >
              Cancel
            </Button>
            <Button style={{ float: 'right' }} className='mx-3' type='submit'>
              Update
            </Button>
          </Form>
        ) : (
          <Form onSubmit={(e) => confirmSubmit(e)}>
            <Form.Group controlId='oldPassword' className='mb-3'>
              <Form.Label>Please confirm old password:</Form.Label>
              <Form.Control
                type='password'
                name='old_password'
                onChange={(e) => changeHandler(e)}
              ></Form.Control>
            </Form.Group>
            <Button style={{ float: 'right' }} type='submit'>
              Confirm
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProfileScreen;

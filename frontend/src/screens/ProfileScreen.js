import React from 'react';
import { Button, Col, Form, Card, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

function ProfileScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <Button className='btn btn-light mt-5' onClick={() => navigate(-1)}>
        {' '}
        Go back
      </Button>
      <h3>Basic Info</h3>
      <FormContainer>
        <Form>
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
              <Col className='d-flex  align-items-center justify-content-center '>
                <Form.Control type='file' size='sm'></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId='username' className='mb-3'>
            <Form.Label>Username:</Form.Label>

            <Form.Control type='text'></Form.Control>
          </Form.Group>
          <Form.Group controlId='email' className='mb-3'>
            <Form.Label>Email:</Form.Label>

            <Form.Control type='email'></Form.Control>
          </Form.Group>
          <Button style={{ float: 'right' }}>Edit</Button>
        </Form>
      </FormContainer>

      <h3 className='mt-3'>Change Password</h3>
      <FormContainer>
        <Form>
          <Form.Group controlId='oldPassword' className='mb-3'>
            <Form.Label>Old Password:</Form.Label>

            <Form.Control type='password'></Form.Control>
          </Form.Group>
          <Form.Group controlId='newPassword' className='mb-3'>
            <Form.Label>New Password:</Form.Label>

            <Form.Control type='password'></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword' className='mb-3'>
            <Form.Label>Confirm Password:</Form.Label>

            <Form.Control type='password'></Form.Control>
          </Form.Group>
          <Button style={{ float: 'right' }}>Update</Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ProfileScreen;

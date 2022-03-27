import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../actions/postActions';
import FormContainer from '../components/FormContainer';
import { ADD_POST_RESET } from '../constants/postConstants';

function PostAddScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
  });

  const { name, category, price, description } = formData;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postAdd = useSelector((state) => state.postAdd);
  const { error, success } = postAdd;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(addPost(name, category, price, description));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (success) {
      dispatch({ type: ADD_POST_RESET });
      navigate(-1);
    }
  }, [navigate, success, userInfo, dispatch]);

  return (
    <div>
      <FormContainer>
        <h2>Add Post</h2>
        <Form onSubmit={(e) => submithandler(e)}>
          <FormGroup className='my-3' controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type='name'
              name='name'
              placeholder='Enter Name'
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
          <FormGroup className='my-3'>
            <Form.Label>Image</Form.Label>
            <Form.Control type='file'></Form.Control>
          </FormGroup>
          <FormGroup className='my-3'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              type='number'
              name='price'
              placeholder='Enter Price'
              step={0.01}
              precision={2}
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
          <FormGroup className='my-3'>
            <Form.Label>Category</Form.Label>
            <Form.Select
              defaultValue='default'
              name='category'
              onChange={(e) => changeHandler(e)}
            >
              <option value='default' disabled hidden>
                Please Select Category
              </option>
              <option value='Clothes'>Clothes</option>
              <option value='Jewelery'>Jewelery</option>
              <option value='Electronics'>Electronics</option>
              <option value='Cosmetics'>Cosmetics</option>
              <option value='Shoes'>Shoes</option>
              <option value='Bag'>Bag</option>
              <option value='Stationery'>Stationery</option>
            </Form.Select>
          </FormGroup>
          <FormGroup>
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type='text'
              as='textarea'
              name='description'
              placeholder='Enter Description'
              rows={5}
              onChange={(e) => changeHandler(e)}
            ></Form.Control>
          </FormGroup>
          <Row>
            <Col>
              <Button
                className='btn btn-light mt-3'
                style={{ float: 'right' }}
                onClick={() => navigate(-1)}
              >
                <i className='fas fa-xmark'></i> Cancel
              </Button>
              <Button
                className='mt-3 me-3'
                style={{ float: 'right' }}
                type='submit'
              >
                <i className='fas fa-plus'></i> Add
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
}

export default PostAddScreen;

import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EdiText from 'react-editext';

function PostScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postInfo = useSelector((state) => state.postInfo);
  const { loading, error, posts } = postInfo;

  const [value, setValue] = useState('');
  const [editing, setEditing] = useState(false);
  const [textIndex, setTextIndex] = useState(-1);

  const [details, setDetails] = useState({
    name: '',
    price: '',
    category: '',
  });

  const { name, price, category } = details;

  const saveHandler = (value) => {
    setValue(value);
  };

  console.log(value);
  console.log('name:' + name);

  const editHandler = (index) => {
    setTextIndex(index);
    setEditing((value) => !value);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <h1>Your post</h1>
      <Button className='btn btn-light my-5' onClick={() => navigate(-1)}>
        Go back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>NO.</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Image style={{ height: '150px' }} src={post.image}></Image>
                </td>
                <td>
                  <EdiText
                    index={index}
                    showButtonsOnHover
                    startEditingOnFocus
                    value={post.name}
                    name='name'
                    type='text'
                    onSave={() => saveHandler()}
                    editing={textIndex === index && editing}
                  ></EdiText>
                </td>
                {/* <td>${post.price}</td> */}
                <td>
                  <EdiText
                    index={index}
                    showButtonsOnHover
                    startEditingOnFocus
                    value={post.price}
                    type='text'
                    onSave={() => saveHandler()}
                    editing={textIndex === index && editing}
                  ></EdiText>
                </td>
                {/* <td>
                  {post.category.charAt(0).toUpperCase() +
                    post.category.slice(1)}
                </td> */}
                <td>
                  <EdiText
                    index={index}
                    showButtonsOnHover
                    startEditingOnFocus
                    value={post.category}
                    type='text'
                    onSave={() => saveHandler()}
                    editing={textIndex === index && editing}
                  ></EdiText>
                </td>
                <td>
                  <Button className='me-2' onClick={() => editHandler(index)}>
                    <i className='fas fa-edit'></i>
                  </Button>
                  <Button variant='secondary'>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <Button className='btn btn-primary my-5'>
            {' '}
            <i className='fas fa-plus'></i> Add post
          </Button>
        </Table>
      )}
    </div>
  );
}

export default PostScreen;

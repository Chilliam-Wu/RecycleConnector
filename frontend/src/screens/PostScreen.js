import React, { useEffect, useState } from 'react';
import { Button, Image, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPosts, editPost, deletePost } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EdiText from 'react-editext';
import { DELETE_POST_RESET } from '../constants/postConstants';

function PostScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postInfo = useSelector((state) => state.postInfo);
  const { loading, error, posts } = postInfo;

  const postEdit = useSelector((state) => state.postEdit);
  const { loading: edit_loading, error: edit_error } = postEdit;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const { success: delete_success } = postDelete;

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [click, setClick] = useState(true);
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const editHandler = (
    post_id,
    post_name,
    post_price,
    post_category,
    post_description
  ) => {
    setId(post_id);
    setName(post_name);
    setPrice(post_price);
    setCategory(post_category);
    setDescription(post_description);
    setEditing((value) => !value);
  };

  // use DOM to trigger save-button
  const triggerSaveClick = () => {
    document.getElementsByClassName('name')[0].click();
    document.getElementsByClassName('price')[0].click();
    document.getElementsByClassName('category')[0].click();
    document.getElementsByClassName('description')[0].click();
  };

  const confirmHandler = () => {
    setEditing((value) => !value);
    triggerSaveClick();
    setClick((click) => !click);
  };

  const trashHandler = (post_id) => {
    dispatch(deletePost(post_id));
  };

  const xmarkHandler = () => {
    setEditing((value) => !value);
  };

  useEffect(() => {
    dispatch({ type: DELETE_POST_RESET });
    if (!userInfo) {
      navigate('/login');
    }
    if (edit_error) {
      setMessage(edit_error);
      setTimeout(() => {
        setShow(false);
        setMessage('');
        setShow(true);
      }, 3000);
    }
    if (!click) {
      if (message) {
        setTimeout(() => {
          setShow(false);
          setMessage('');
          setShow(true);
        }, 3000);
      } else {
        dispatch(editPost(name, price, category, description, id));
      }
      setClick((click) => !click);
    }
    if (delete_success) {
      setSuccessMessage(delete_success);
      setTimeout(() => {
        setShow(false);
        setSuccessMessage('');
        setShow(true);
      }, 3000);
    }
    dispatch(getPosts());
  }, [userInfo, navigate, dispatch, click, delete_success]);

  return (
    <div>
      <h1>Your Post</h1>
      <Button className='btn btn-light my-5' onClick={() => navigate(-1)}>
        Go back
      </Button>
      <Link className='btn btn-primary my-5 mx-3' to='/post/add'>
        {' '}
        <i className='fas fa-plus'></i> Add post
      </Link>
      {message && (
        <Message show={show} variant='secondary'>
          {message}
        </Message>
      )}
      {successMessage && (
        <Message show={show} variant='success'>
          {successMessage}
        </Message>
      )}
      {loading ? (
        <Loader />
      ) : edit_loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : posts.length === 0 ? (
        <Message variant='info'>
          <h6 style={{ color: 'white' }}>You have no posts.</h6>
        </Message>
      ) : (
        <Table responsive striped>
          <thead>
            <tr>
              <th style={{ width: 50 }}>NO.</th>
              <th style={{ width: 200 }}>IMAGE</th>
              <th style={{ width: 200 }}>NAME</th>
              <th style={{ width: 100 }}>PRICE</th>
              <th style={{ width: 125 }}>CATEGORY</th>
              <th style={{ width: 550 }}>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                <td style={{ verticalAlign: 'middle' }}>
                  <Image
                    style={{ height: '150px', width: '120px' }}
                    src={post.image}
                  ></Image>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <EdiText
                    value={post.name}
                    saveButtonClassName='name'
                    type='textarea'
                    inputProps={{
                      rows: 3,
                      style: {
                        resize: 'none',
                      },
                    }}
                    onSave={(value) => setName(value)}
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <EdiText
                    value={'$' + post.price.toFixed(2)}
                    saveButtonClassName='price'
                    type='textarea'
                    inputProps={{
                      rows: 3,
                      style: {
                        resize: 'none',
                      },
                    }}
                    onSave={(value) => {
                      !isNaN(Number(value.slice(1)))
                        ? setPrice(Number(value.slice(1)).toFixed(2))
                        : setMessage('Invalid price');
                    }}
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <EdiText
                    value={
                      post.category.charAt(0).toUpperCase() +
                      post.category.slice(1)
                    }
                    saveButtonClassName='category'
                    type='textarea'
                    inputProps={{
                      rows: 3,
                      style: {
                        resize: 'none',
                      },
                    }}
                    onSave={(value) =>
                      setCategory(
                        value.charAt(0).toLowerCase() + value.slice(1)
                      )
                    }
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <EdiText
                    value={post.description}
                    saveButtonClassName='description'
                    type='textarea'
                    inputProps={{
                      rows: 3,
                      style: {
                        resize: 'none',
                      },
                    }}
                    onSave={(value) => setDescription(value)}
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                {/* non-editing mode and editing mode */}
                {!editing ? (
                  <td style={{ verticalAlign: 'middle' }}>
                    <Button
                      style={{ display: 'block' }}
                      onClick={() =>
                        editHandler(
                          post._id,
                          post.name,
                          post.price,
                          post.category,
                          post.description
                        )
                      }
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={() => trashHandler(post._id)}
                      className='mt-2'
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                ) : editing && id === post._id ? (
                  <td style={{ verticalAlign: 'middle' }}>
                    <Button
                      onClick={() => confirmHandler(post._id)}
                      style={{ display: 'block' }}
                    >
                      <i className='fas fa-check'></i>
                    </Button>
                    <Button
                      variant='secondary'
                      className='mt-2'
                      onClick={() => xmarkHandler()}
                    >
                      <i className='fa fa-xmark'></i>
                    </Button>
                  </td>
                ) : (
                  <td style={{ verticalAlign: 'middle' }}>
                    <Button disabled style={{ display: 'block' }}>
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button variant='secondary' disabled className='mt-2'>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default PostScreen;

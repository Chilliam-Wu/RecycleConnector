import React, { useEffect, useState } from 'react';
import { Button, Col, Image, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPosts, editPost } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import EdiText from 'react-editext';

function PostScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postInfo = useSelector((state) => state.postInfo);
  const { loading, error, posts } = postInfo;

  const postEdit = useSelector((state) => state.postEdit);
  const { loading: edit_loading, error: edit_error, success } = postEdit;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [click, setClick] = useState(true);

  // save-button
  // const saveNameHandler = (value) => {
  //   setName(value);
  // };

  // const savePriceHandler = (value) => {
  //   setPrice(Number(value.slice(1)).toFixed(2));
  // };

  // const saveCategoryHandler = (value) => {
  //   setCategory(value.charAt(0).toLowerCase() + value.slice(1));
  // };

  const editHandler = (post_id, post_name, post_price, post_category) => {
    setId(post_id);
    setName(post_name);
    setPrice(post_price);
    setCategory(post_category);
    setEditing((value) => !value);
  };

  // use DOM to trigger save-button
  const triggerSaveClick = () => {
    document.getElementsByClassName('name')[0].click();
    document.getElementsByClassName('price')[0].click();
    document.getElementsByClassName('category')[0].click();
  };

  const confirmHandler = () => {
    setEditing((value) => !value);
    triggerSaveClick();
    setClick((click) => !click);
  };

  const trashHandler = (post_id) => {};

  const xmarkHandler = () => {
    setEditing((value) => !value);
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!click) {
      dispatch(editPost(name, price, category, id));
      setClick((click) => !click);
    }
    dispatch(getPosts());
  }, [userInfo, navigate, dispatch, click]);

  return (
    <div>
      <h1>Your post</h1>
      <Button className='btn btn-light my-5' onClick={() => navigate(-1)}>
        Go back
      </Button>
      {edit_error && <Message variant='secondary'>{edit_error}</Message>}
      {loading ? (
        <Loader />
      ) : edit_loading ? (
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
                    value={post.name}
                    saveButtonClassName='name'
                    type='text'
                    onSave={(value) => setName(value)}
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                <td>
                  <EdiText
                    value={'$' + post.price.toFixed(2)}
                    saveButtonClassName='price'
                    type='text'
                    onSave={(value) =>
                      setPrice(Number(value.slice(1)).toFixed(2))
                    }
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                <td>
                  <EdiText
                    value={
                      post.category.charAt(0).toUpperCase() +
                      post.category.slice(1)
                    }
                    saveButtonClassName='category'
                    type='text'
                    onSave={(value) =>
                      setCategory(
                        value.charAt(0).toLowerCase() + value.slice(1)
                      )
                    }
                    editing={id === post._id && editing}
                  ></EdiText>
                </td>
                {/* non-editing mode and editing mode */}
                {!editing ? (
                  <td>
                    <Button
                      className='me-2'
                      onClick={() =>
                        editHandler(
                          post._id,
                          post.name,
                          post.price,
                          post.category
                        )
                      }
                    >
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={() => trashHandler(post._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                ) : editing && id === post._id ? (
                  <td>
                    <Button
                      className='me-2'
                      onClick={() => confirmHandler(post._id)}
                    >
                      <i className='fas fa-check'></i>
                    </Button>
                    <Button variant='secondary' onClick={() => xmarkHandler()}>
                      <i className='fas fa-xmark'></i>
                    </Button>
                  </td>
                ) : (
                  <td>
                    <Button className='me-2' disabled>
                      <i className='fas fa-edit'></i>
                    </Button>
                    <Button variant='secondary' disabled>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                )}
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

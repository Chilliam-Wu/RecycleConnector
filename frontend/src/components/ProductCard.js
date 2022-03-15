import React from 'react';
import { Card, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const {
    userInfo,
    image,
    name,
    price,
    category,
    description,
    views,
    _id: id,
  } = product;

  return (
    <div>
      <Card>
        <i className='fas fa-shopping-cart fs-5'></i>
        <a href={`/products/${category}/${id}`}>
          <Card.Img variant='top' src={image} />
        </a>
        <Card.Body>
          <a
            href={`/products/${category}/${id}`}
            style={{ textDecoration: 'none' }}
          >
            <Card.Title>{name}</Card.Title>
          </a>
          <Card.Subtitle style={{ color: '#212529', fontSize: '1.3rem' }}>
            ${price}
          </Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Link to={`/products/${category}/${id}`}>
            <Button style={{ float: 'right' }}>View Details</Button>
          </Link>
        </Card.Body>

        <ListGroup className='list-group-flush'>
          <ListGroupItem style={{ textAlign: 'right', color: '#888' }}>
            Posted by {userInfo && userInfo.username}{' '}
            <span>
              <Image
                className='avatar me-1'
                src={userInfo && userInfo.avatar}
                style={{ height: '25px' }}
              />
            </span>
            <p style={{ fontSize: '0.7rem', marginBottom: '0' }}>
              {views} views
            </p>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default ProductCard;

import React from 'react';
import { Card, ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';

function ProductCard({ product }) {
  const { userInfo, image, name, price, description, views } = product;

  return (
    <div>
      <Card>
        <i className='fas fa-star fs-5'></i>
        <a href='/product'>
          <Card.Img variant='top' src={image} />
        </a>
        <Card.Body>
          <a href='/product' style={{ textDecoration: 'none' }}>
            <Card.Title>{name}</Card.Title>
          </a>
          <Card.Subtitle style={{ color: '#212529' }}>${price}</Card.Subtitle>
          <Card.Text className='justify-content-space-between'>
            {description}
          </Card.Text>
          <Button style={{ float: 'right' }}>View Details</Button>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem style={{ textAlign: 'right', color: '#888' }}>
            Post by {userInfo && userInfo.username}{' '}
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

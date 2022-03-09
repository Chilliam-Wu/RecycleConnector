import React from 'react';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';

// function ProductCard({products}) {
function ProductCard() {
  return (
    <div>
      <Card>
        <i className='fas fa-star fs-5'></i>
        <a href='/product'>
          <Card.Img
            variant='top'
            src='http://www.gravatar.com/avatar/79670b45df1b452326c80247831a6cd6?s=200&r=rg&d=robohash'
          />
        </a>
        <Card.Body>
          <a href='/product' style={{ textDecoration: 'none' }}>
            <Card.Title>Product Name</Card.Title>
          </a>
          <Card.Subtitle style={{ color: '#212529' }}>$1.00</Card.Subtitle>
          <Card.Text>
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.
          </Card.Text>
        </Card.Body>
        <ListGroup className='list-group-flush'>
          <ListGroupItem style={{ textAlign: 'right', color: '#888' }}>
            Post by user{' '}
            <span>
              <Image
                className='avatar me-1'
                src='http://www.gravatar.com/avatar/79670b45df1b452326c80247831a6cd6?s=200&r=rg&d=robohash'
                style={{ height: '25px' }}
              />
            </span>
            <p style={{ fontSize: '0.7rem', marginBottom: '0' }}>3 views</p>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export default ProductCard;

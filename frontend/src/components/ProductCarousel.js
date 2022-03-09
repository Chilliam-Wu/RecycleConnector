import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// function ProductCarousel({products}) {
function ProductCarousel() {
  return (
    <div>
      <Carousel pause='hover' className='mt-3'>
        <Carousel.Item interval={3000}>
          <Link to='/product'>
            <Image
              src='http://www.gravatar.com/avatar/79670b45df1b452326c80247831a6cd6?s=200&r=rg&d=robohash'
              alt='First slide'
            />
            <Carousel.Caption>
              <h3>Product Name</h3>
              <p>
                Description: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <Image
            src='http://www.gravatar.com/avatar/79670b45df1b452326c80247831a6cd6?s=200&r=rg&d=robohash'
            alt='Second slide'
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <Image
            src='http://www.gravatar.com/avatar/79670b45df1b452326c80247831a6cd6?s=200&r=rg&d=robohash'
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ProductCarousel;

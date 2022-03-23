import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCarousel({ products }) {
  return (
    <div>
      <Carousel pause='hover' className='mt-3'>
        {products
          .sort((p1, p2) => (p1.views < p2.views ? 1 : -1))
          .slice(0, 5)
          .map((product, index) => (
            <Carousel.Item interval={3000} key={index}>
              <Link to={`/products/${product.category}/${product._id}`}>
                <Image src={product.image} alt='First slide' />
                <Carousel.Caption>
                  <h3>{product.name}</h3>
                  <p>Description: {product.description}</p>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

export default ProductCarousel;

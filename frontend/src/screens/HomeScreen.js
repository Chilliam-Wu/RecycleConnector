import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { getAllProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function HomeScreen() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);
  const { loading, error, products } = allProducts;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>TOP VIEWS</h1>
      <ProductCarousel />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='secondary'>{error}</Message>
      ) : (
        <div>
          {/* Display top views by category */}
          {/* Remove duplicate items  */}
          {products
            .map((product) => product.category)
            .filter(
              (category, index) =>
                products
                  .map((product) => product.category)
                  .indexOf(category) === index
            )
            .map((category, index) => (
              <div key={index}>
                <h3>
                  {/* Capitalize the first letter */}
                  {category.charAt(0).toUpperCase() + category.slice(1)}{' '}
                  <span>
                    <Link
                      to={`/products/${category}`}
                      style={{ fontSize: '0.9rem' }}
                    >
                      MORE
                    </Link>
                  </span>
                </h3>
                <div>
                  <Row>
                    {/* slice(0,5) -- get the first 5 items */}
                    {/* sort((p1, p2) => (p1.views < p2.views ? 1 : -1)) -- decreasing order */}
                    <Carousel responsive={responsive} autoPlaySpeed={5000}>
                      {products
                        .filter((product) => product.category === category)
                        .slice(0, 5)
                        .sort((p1, p2) => (p1.views < p2.views ? 1 : -1))
                        .map((product, index) => (
                          <Col key={index}>
                            <ProductCard product={product} />
                          </Col>
                        ))}
                    </Carousel>
                  </Row>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;

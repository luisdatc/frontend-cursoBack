import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <main>
        <Carousel controls={false} fade={true}>
          <Carousel.Item>
            <img src="./slide1.webp" alt="" className="img-fluid" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="./slide5.jpg" alt="" className="img-fluid" />
          </Carousel.Item>
        </Carousel>
      </main>
      <section className="some-products">
        <Container>
          <h1 className="some-products-title">Algunos de nuestros productos</h1>
          <Row className="text-center mt-3 mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic1.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic2.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic3.jpeg" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic4.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic5.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic6.jpeg" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row>
            <img src="./slide6.jpg" className="img-fluid" alt="" />
          </Row>
          <Row className="text-center mt-3 mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic7.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic8.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic9.jpeg" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic10.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic11.jpeg" alt="" className="img-fluid" />
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} xl={4}>
              <img src="./comic12.jpeg" alt="" className="img-fluid" />
            </Col>
          </Row>
          <Row>
            <img src="./slide7.jpg" className="img-fluid" alt="" />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;

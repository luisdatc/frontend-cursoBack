import React, { useState, useRef } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getCookiesByName } from "../../utils/formUtils";

const NewProduct = () => {
  const [validated, setValidated] = useState(false);

  const newProductFormRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datForm = new FormData(newProductFormRef.current);
    const data = Object.fromEntries(datForm);
    const token = getCookiesByName("jwtCookie");
    console.log(token);
    const response = await fetch("https://backend-coderhouse-ncbs.onrender.com/api/products", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status == 200) {
      const datos = await response.json();
      console.log(datos);
      navigate("/products");
    } else {
      const datos = await response.json();
      console.log(datos);
    }
  };

/*   return (

      <form className="row g-3 needs-validation" novalidate>
  <div className="">
    <label htmlFor="validationCustom01" className="form-label">Titulo</label>
    <input type="text" className="form-control" id="validationCustom01" required name="title"/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="">
    <label htmlFor="validationCustom02" className="form-label">Descripcion</label>
    <input type="text" className="form-control" id="validationCustom02" required name="description"/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="">
    <label htmlFor="validationCustomUsername" className="form-label">Precio</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">$</span>
      <input type="number" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required name="price"/>
      <div className="invalid-feedback">
        Please write the price.
      </div>
    </div>
  </div>
  <div className="">
    <label htmlFor="validationCustom03" className="form-label">Code</label>
    <input type="text" className="form-control" id="validationCustom03" required name="code"/>
    <div className="invalid-feedback">
      Please provide a valid code.
    </div>
  </div>
  <div className="">
    <label htmlFor="validationCustom04" className="form-label">Stock</label>
    <input type="number" className="form-control" id="validationCustom04" required name="stock"/>
    <div className="invalid-feedback">
      Please select a valid state.
    </div>
  </div>
  <div className="">
    <label htmlFor="validationCustom05" className="form-label">Categoria</label>
    <input type="text" className="form-control" id="validationCustom05" required name="category"/> 
    <div className="invalid-feedback">
      Please provide a valid zip.
    </div>
  </div>
  <div className="col-12">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="invalidCheck" required/>
      <label className="form-check-label" htmlFor="invalidCheck">
        Agree to terms and conditions
      </label>
      <div className="invalid-feedback">
        You must agree before submitting.
      </div>
    </div>
  </div>
  <div className="">
    <button className="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
    
    
  ) */

  return (
    <Container className="container-form mt-3">
      <h1 className="text-center m-3">Registro de Comic</h1>
      <Form
        onSubmit={handleSubmit}
        className=""
        ref={newProductFormRef}
      >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom01">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Titulo"
              name="title"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom02">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Descripción"
              name="description"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustomUsername">
            <Form.Label>Precio</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
              <Form.Control
                type="number"
                name="price"
                placeholder="Precio"
                aria-describedby="inputGroupPrepend"
                required
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom03">
            <Form.Label>Codigo</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Codigo"
              name="code"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom04">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Stock"
              name="stock"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom05">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Categoria"
              name="category"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Button type="submit" className="mt-3 mb-3 w-100">
              Registrar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default NewProduct;

/* clase 15 03:31:37 */
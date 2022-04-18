import Button from "react-bootstrap/Button";
import React from "react";
import * as Icon from "react-feather";
import { Card, Col, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ContactForm = (props) => {
  const restForm = ()=>{
    Array.from(document.querySelectorAll("input")).forEach(
      input => { 
        input.value = '';
      }   
    );
    Array.from(document.querySelectorAll("select")).forEach(
      input => { 
        input.value="Choose...";
      }   
    );
    props.handleClear();
  };
  return (
    <Card>
      <Card.Header>
        <h5 className="card-title">Contact Form</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                onChange={props.titleChangeHandler}
              >
                <option>Choose...</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss.</option>
                <option>Dr.</option>
                <option>Prof.</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"                            
                placeholder="Enter first name"
                onChange={props.firstNameChangedHandler}
                onBlur={props.firstNameBlureHandler}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="middleName">
              <Form.Label>Middle Name</Form.Label>
              <Form.Control
                type="text"                
                placeholder="Enter middle name (O)"
                onChange={props.middleNameChangeHandler}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                onChange={props.lastNameChangeHandler}
                onBlur={props.lastNameBlurHandler}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col xs={1}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                onChange={props.genderChangeHandler}
              >
                 <option>Choose...</option>                
                <option value="Male">Male</option>
                <option value="Female">Femal</option>
                <option value="TGender">TGender</option>
              </Form.Select>
            </Col>
            <Col xs={2}>
              <Form.Label>Birth date</Form.Label>
              <Form.Control type="date" onChange={props.birthDateChangeHandler} />
            </Col>
            <Col xs={1}>
              <Form.Label>Married</Form.Label>
              <Form.Select defaultValue="No" onChange={props.marriageChangeHandler}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </Form.Select>
            </Col>
            <Col xs={2}>
              <Form.Label>Wedding date</Form.Label>
              <Form.Control type="date" onChange={props.weddingDateChangeHandler} />
            </Col>
            <Col xs={2}>
              <Form.Label>Occupation </Form.Label>
              <Form.Control
                type="text"                
                placeholder="Occupation"
                onChange={props.occupationChangeHandler}
              />
            </Col>
            <Col>
              <Form.Label>Socializability </Form.Label>
              <Form.Control
                type="text"              
                placeholder="How is person in socializing..."
                onChange={props.socializabilityChangeHandler}
              />
            </Col>
          </Row>

          <div className="form-button-group">
            <div className="row top-gap-between-component">
              <div className="col-md-5 mb-2">
                <NavLink to="/"><Button variant="outline-secondary">Go Home</Button></NavLink>
              </div>
              <div className="col-md-7 mb-2">
                <div className="row">
                  <div className="col-md-5">
                    <Button variant="outline-warning" onClick={restForm}>Clear Form</Button>
                  </div>
                  <div className="col-md-7 pull-right">
                    <Button
                      variant="outline-primary"
                      className="float-end"
                      onClick={props.submitContactForm}
                    >
                      <Icon.Save className="feather feathre-save" /> Save
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ContactForm;

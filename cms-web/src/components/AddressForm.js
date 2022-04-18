import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";

const AddressForm = (props) => {
  const [isDisabled, setISDisabled] = useState(true);
  
  useEffect(() => {
    if (props.isEnabled === false) {
      setISDisabled(true);
    } else {
      setISDisabled(false);
    }
  }, [props.isEnabled]);
  return (
    <Fragment>
      <Card>
        <Card.Header className="cardheader">         
            <h5 className="card-title">Add Address for - &nbsp;&nbsp; </h5>
            <Form.Group className="col-md-3 mb-2" controlId="addressFor">
              <Form.Select
                onChange={props.contactChangeHandler}
                defaultValue="Choose..." key='contactId'
              >
                <option>Choose...</option>
                {props.contacts.map((contact) => {
                  return (
                    <option key={contact.id} value={contact.id}>
                      {contact.title} {contact.firstName} {contact.lastName}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>  
        </Card.Header>
        <Card.Body>
          <Form>
            <div className="row">
              <Form.Group className="col-md-2 mb-1" controlId="addressType">
                <Form.Label>Address Type</Form.Label>
                <Form.Select defaultValue={"Choose..."} disabled={isDisabled} key='addressType' onChange={props.addressTypeChangeHandler}>
                  <option key='atype-0'>Choose...</option>
                  <option key='atype-1'>Home</option>
                  <option key='atype-2'>Office</option>
                  <option key='atype-3'>Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="col-md-5 mb-2" controlId="address1">
                <Form.Label>Address 1</Form.Label>
                <Form.Control
                key='address1'
                  type="text"
                  placeholder="House/Flat No, Village/Society"
                  disabled={isDisabled}
                  onChange={props.address1ChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-5 mb-2" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control key='address2'
                  type="text"
                  placeholder="Street, Lane, Locality"
                  disabled={isDisabled}
                  onChange={props.address2ChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col-md-3 mb-1" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                key='city'
                  type="text"
                  placeholder="City"
                  required
                  disabled={isDisabled}
                  onChange={props.cityChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-3 mb-1" controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                key='state'
                  type="text"
                  placeholder="State"
                  disabled={isDisabled}
                  onChange={props.stateChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-3 mb-1" controlId="zip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                key='zip'
                  type="text"
                  placeholder="Zip/PIN"
                  disabled={isDisabled}
                  onChange={props.zipChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-3 mb-1" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                key='country'
                  type="text"
                  placeholder="Country"
                  disabled={isDisabled}
                  onChange={props.countryChangeHandler}
                />
              </Form.Group>
            </div>
            <div className="row">
              <Form.Group className="col-md-3 mb-1" controlId="homePhone">
                <Form.Label>Home Phone</Form.Label>
                <Form.Control
                key='homePhone'
                  type="text"
                  placeholder="Home Phone"
                  disabled={isDisabled}
                  onChange={props.homePhoneChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-2 mb-1" controlId="mobile">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control
                key='mobileNo'
                  type="text"
                  placeholder="Mobile"
                  disabled={isDisabled}
                  onChange={props.mobileNoChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-2 mb-1" controlId="alternateMobile">
                <Form.Label>Mobile No -2</Form.Label>
                <Form.Control
                key='mobileNo2'
                  type="text"
                  placeholder="Moible 2"
                  disabled={isDisabled}
                  onChange={props.alternateMobileNoChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-2 mb-1" controlId="officePhone">
                <Form.Label>Office Phone</Form.Label>
                <Form.Control
                key='officePhone'
                  type="text"
                  placeholder="Office Phone"
                  disabled={isDisabled}
                  onChange={props.officePhoneChangeHandler}
                />
              </Form.Group>
              <Form.Group className="col-md-3 mb-1" controlId="officePhone">
                <Form.Label>@Email</Form.Label>
                <Form.Control
                key='emailId'
                  type="email"
                  placeholder="Email@domain.com"
                  disabled={isDisabled}
                  onChange={props.emailIdChangeHandler}
                />
              </Form.Group>
            </div>

            <div className="form-button-group">
              <div className="row top-gap-between-component">
                <div className="col-md-5 mb-2">
                  <NavLink to="/">
                    <Button variant="outline-secondary">Go Home</Button>
                  </NavLink>
                </div>
                <div className="col-md-7 mb-2">
                  {!isDisabled && (
                    <div className="row">
                      <div className="col-md-5">
                        <Button variant="outline-warning" onClick={props.handleClear}>Clear Form</Button>
                      </div>
                      <div className="col-md-7 pull-right">
                        <Button variant="outline-primary" className="float-end" onClick={props.submitFormHandler}>
                          <Icon.Save className="feather feathre-save"/> Save
                          Address
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default AddressForm;

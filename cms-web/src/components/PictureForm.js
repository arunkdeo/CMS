import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as Icon from "react-feather";

const PictureForm = (props) => {
  const [isDisabled, setISDisabled] = useState(false);
  useEffect(() => {
    setISDisabled(!props.isEnabled);
  }, [props.isEnabled]);
  const clearFormData = ()=>{
    Array.from(document.querySelectorAll("input")).forEach(
      input => { 
        input.value = '';
      }   
    );
    Array.from(document.querySelectorAll("textarea")).forEach(
      input => { 
        input.value = '';
      }   
    );
   props.clearForm(); 
  }
  return (
    <Fragment>
      <Card>
        <Card.Header className="cardheader">
          <h5 className="card-title">Add Photos for - &nbsp;&nbsp; </h5>
          <Form.Group className="col-md-3 mb-2" controlId="addressFor">
            <Form.Select
              onChange={props.contactChangeHandler}
              defaultValue="Choose..."
              key="contactId"
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
              <div className="col-md-6">
                <Form.Group className="col-md-12 mb-2 w-50" controlId="pictureTitle">
                  <Form.Label>Picture Title</Form.Label>
                  <Form.Control
                  disabled={isDisabled}
                    key="title"
                    type="text"
                    placeholder="Picture Caption"
                    onBlur={props.titleChangeHnadler}
                    maxLength='50'
                    className="mb-2"
                  />
                </Form.Group>
                <Form.Group
                  className="col-md-12 mb-2"
                  controlId="pictureDescription"                  
                >
                  <Form.Label>Picture Description</Form.Label>
                  <Form.Control
                  disabled={isDisabled}
                    key="pictureDesc"
                    as="textarea"
                    col="80"
                    row="5"
                    size="fixed"                    
                    placeholder="Picture Description"
                    onBlur={props.descriptionChangeHnadler}
                  />
                </Form.Group>
                <Form.Group
                  className="col-md-12 mb-2 w-50"
                  controlId="pictureFile" 
                >
                  <Form.Label>Select a picture to upload</Form.Label>
                  <Form.Control
                  disabled={isDisabled}
                    key="pictureFile"
                    type="file"                    
                    accept=".png,.jpg,.jpeg"
                    onChange={props.imageChangeHnadler}
                  />
                </Form.Group>
                <div className="form-button-group">
                  <div className="row top-gap-between-component">
                    <div className="col-md-4 mb-2">
                      <NavLink to="/">
                        <Button variant="outline-secondary">Go Home</Button>
                      </NavLink>
                    </div>
                    {!isDisabled && (
                      <>
                        <div className="col-md-3">
                          <Button variant="outline-warning" onClick={clearFormData}>Clear</Button>
                        </div>
                        <div className="col-md-5 pull-right">
                          <Button
                            variant="outline-primary"
                            className="float-end"
                            onClick={props.submitHandler}
                          >
                            <Icon.Upload className="feather feathre-upload" />
                            Upload Photo
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="uploadimagediv">
                    {(props.preview !== null && props.preview !==undefined&& props.preview !== '' && !isDisabled) && <img id='previewImg' src={props.preview} className="previewimg"/>}                    
                </div>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default PictureForm;

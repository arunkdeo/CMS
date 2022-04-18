import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import * as Icon from "react-feather";
import { isNonEmpty } from "../libs/utils";

const REGISTER_URL = "http://ramarun-aio:8080/cms/authenticate/register";

const UserRegistration = (props) => {
  const [showError, setShowError] = useState(false);
  const [password, setPassword] = useState(null);
  const [rePassword, setRePassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [messageVairant, setMessageVariant] = useState("danger");
  const rePasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const fullNameRef = useRef(null);
  const userNameRef = useRef(null);
  const dateOfBirthRef = useRef(null);

  useEffect(()=>{
    setShowError(false);
    setErrorMessage(null);
  },[]);
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const isValidPassword = validatePasswords();
    if (!isValidPassword) return;
    
    const refreshPage = () =>{
      window.location.reload();
    }

    const resgistrationData = JSON.stringify({
      userName: userNameRef.current.value,
      credential:password,
      fullName: fullNameRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
      active: true
    });
   
    const requestOptions = {
      method: 'POST',
      body: resgistrationData,
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(REGISTER_URL, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setErrorMessage(
            "Your registration request accepted. Use same username/email and password to login which you registred."
          );
          setMessageVariant("success");
          setShowError(true);
          setTimeout(refreshPage, 5000);          
        } else {
          setErrorMessage(
            "Encountered and error while registring. Please try again after sometime."
          );
          setShowError(true);
          setMessageVariant("danger");
        }
      })
      .catch((error) => {
        setErrorMessage(
          "Encountered and error while registring. Please try again after sometime." +
            error
        );
        setShowError(true);
        setMessageVariant("danger");
      });
  };

  const validatePasswords = () => {
    if (
      isNonEmpty(password) &&
      isNonEmpty(rePassword) &&
      password === rePassword
    ) {
      setShowError(false);
      return true;
    } else {
      setMessageVariant("danger");
      setShowError(true);
      setErrorMessage(
        "Passwords entered do not match. Please enter same values in both fields."
      );
      return false;
    }
  };
  const rePasswordBlurHandler = (event) => {
    setPassword(passwordRef.current.value);
    setRePassword(rePasswordRef.current.value);
    validatePasswords();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose} backdrop="static">
      <Modal.Header closeButton>
        <h5>New User Self Registration From</h5>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p>
            To start using online <u>Contact Management System</u> you need to
            have an account first. To create account please provide below
            information. Make sure the information passed is correct and you
            remember it for future use and authenticate yourself.
          </p>
        </div>
        <Alert show={showError} variant={messageVairant}>
          {messageVairant === "success" ? (
            <Icon.Check />
          ) : (
            <Icon.AlertTriangle />
          )}
          {errorMessage}
        </Alert>
        <Form>
          <Form.Group controlId="userName">
            <Form.Label>EmailId as UserName:</Form.Label>
            <Form.Control
              key="userName"
              type="email"
              placeholder="email@domain.com"
              ref={userNameRef}
            />
          </Form.Group>
          <Form.Group className="col-md-6 mb-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              key="password"
              type="password"
              ref={passwordRef}
              placeholder="********"
            />
          </Form.Group>
          <Form.Group className="col-md-6 mb-2" controlId="rePassword">
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              key="rePassword"
              type="password"
              ref={rePasswordRef}
              placeholder="********"
              onBlur={rePasswordBlurHandler}
            />
          </Form.Group>
          <Form.Group controlId="fullName">
            <Form.Label>Full name:</Form.Label>
            <Form.Control
              key="fullName"
              type="text"
              placeholder="Firstname Lastname"
              ref={fullNameRef}
            />
          </Form.Group>
          <Form.Group controlId="dob" className="col-md-6 mb-2">
            <Form.Label>Birth Date:</Form.Label>
            <Form.Control key="dob" type="date" ref={dateOfBirthRef}/>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button className="w-50 btn btn-primary float-sm-end" type="submit" onClick={handleOnSubmit}>
          Sign in
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRegistration;

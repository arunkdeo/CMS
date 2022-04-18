import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { loginUser } from "./CMSActions";
import "./loginForm.css";
import UserRegistration from "./UserRegistration";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState("");
  const [showRegForm, setShowRegForm] = useState(false);
  
  const handleUserNameChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setCredential(event.target.value);
  };
  const handleUserRegistration = () => {
    setShowRegForm(true);
  };
  const hideRegForm = () => {
    setShowRegForm(false);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const payload = { userName: email, credential };
    try {
      let response = await loginUser(payload);
      if (!response.userName) return;
      const logedInUser= {
        userName: response.userName,
        token: response.token,
      };
      props.handleUserLogin(logedInUser);
      
      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Container login-form">
      <Card className="login-card">
        <Card.Header>
          <h5 className="h3 mb-3 fw-normal">Please sign in</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <label>Email Address:</label>
            <input
              className="form-control"
              type="text"
              key="userEmail"
              onChange={handleUserNameChange}
            />
            <label>Password:</label>
            <input
              key="userPwd"
              className="form-control"
              type="password"
              onChange={handlePasswordChange}
            />
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </Form>
          <button
            variant="outline-secondary"
            className="w-100 btn btn-lg btn-secondary"
            onClick={handleUserRegistration}
          >
            Register yourself
          </button>
        </Card.Body>
      </Card>
      <UserRegistration show={showRegForm} handleClose={hideRegForm} />
    </div>
  );
};
export default LoginForm;

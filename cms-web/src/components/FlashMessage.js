import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import FlashMessage from "react-flash-message";
import * as Icon from "react-feather";

export const SuccessMessage = (props) => {
  const [message, setMessage] = useState();
  useEffect(()=>{
    setMessage(props.message);
  },[props.message]);
  return (
    <FlashMessage duration={props.duration} persistOnHover={props.persistOnHover}>
      <Alert variant='success'>{message}</Alert>
    </FlashMessage>
  );
};

export const FailedMessage = (props) => {
  const [message, setMessage] = useState();
  useEffect(()=>{
    setMessage(props.message);
  },[props.message]);

  return (
    <FlashMessage duration={props.duration} persistOnHover={props.persistOnHover}>
      <Alert variant='danger'>
          <Icon.AlertTriangle className="feather feathre-alerttrianle"/> {message}</Alert>
    </FlashMessage>
  );
};

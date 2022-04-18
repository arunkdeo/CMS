import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const AlertPopup = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Modal show={props.showDialog} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Save changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.bodymessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={ props.handleConfirm}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertPopup;

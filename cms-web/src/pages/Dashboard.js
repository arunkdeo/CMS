import React, { Fragment } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ContactDashboard from "../components/ContactDashboard";

const Dashboard = () => {
  return (
    <Fragment>
      <ContactDashboard pageTitle="Dashboard" />
      <Fragment>
        <Row>
          <Col className="col-md-3">
            <Card className="dashboard-card">
              <Card.Img variant="top" src="../images/contact.jpg" />
              <Card.Body>
                <Card.Title>Contacts</Card.Title>
                <Card.Text>
                  View and Manage you contacts' demographic information here like Name,
                  Dates and Socials.
                </Card.Text>
                <NavLink
                  activeClassName="active"
                  to="/cms/contact"
                  className="nav-link"
                >
                  <Button variant="outline-primary" className="float-end">
                    Manage Contact
                  </Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-md-3">
            <Card className="dashboard-card">
              <Card.Img variant="top" src="../images/address.jpg"/>
              <Card.Body>
                <Card.Title>Address</Card.Title>
                <Card.Text>
                  View and Manage your contacts' Address information here like address,
                  city, email, Phone etc.
                </Card.Text>
                <NavLink
                  activeClassName="active"
                  to="/cms/address"
                  className="nav-link"
                >
                  <Button variant="outline-primary" className="float-end">
                    Manage Address
                  </Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col className="col-md-3">
            <Card className="dashboard-card">
              <Card.Img variant="top" src="../images/picture.png" />
              <Card.Body>
                <Card.Title>Photos</Card.Title>
                <Card.Text>
                  Manage you contact's Photos, you may upload new photo, and delete or update old photos.
                </Card.Text>
                <NavLink
                  activeClassName="active"
                  to="/cms/photos"
                  className="nav-link"
                >
                  <Button variant="outline-primary" className="float-end">
                    Manage Photos
                  </Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Fragment>
    </Fragment>
  );
};

export default Dashboard;

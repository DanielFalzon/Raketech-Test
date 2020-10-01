import React, { Component } from "react";
import { Form } from "react-bootstrap";

export default class ContactForm extends Component {
  render() {
    return (
      <Form>
          {/* Implement e-mail validation*/}
        <Form.Group controlId="contactFormName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control required type="name" name="fullname" placeholder="Enter your full name" />
        </Form.Group>

        <Form.Group controlId="contactFormNameEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" name="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group controlId="contactFormNameEmail">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="name" name="email" placeholder="Enter email's subject" />
        </Form.Group>
        <Form.Group controlId="contactFormMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control required as="textarea" rows="4" />
        </Form.Group>
      </Form>

    );
  }
}

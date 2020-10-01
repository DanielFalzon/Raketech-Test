import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";

function ContactForm() {
    //Set up the schema used by form to validate when data is changed.
  const validationSchema = Yup.object({
    fullname: Yup.string().required(),
    email: Yup.string().email().required(),
    subject: Yup.string().required(),
    message: Yup.string().required(),
  });

  return (
      //Formik package utilized to handle events by form and error viewing.
    <Formik
      initialValues={{ fullname: "", email: "", subject: "", message: "" }}
      validationSchema={validationSchema}
      onSubmit={console.log}
    >
      {/* Initialise call-back functions used when user handles data */}
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="mt-4">
          {/* Implement e-mail validation*/}
          <Form.Group controlId="contactFormName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="name"
              name="fullname"
              placeholder="Enter your full name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname}
              isValid={touched.fullname && !errors.fullname}
              isInvalid={!!errors.fullname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactFormNameEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              isValid={touched.email && !errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="contactFormNameEmail">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              placeholder="Enter email's subject"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.subject}
              isValid={touched.subject && !errors.subject}
              isInvalid={!!errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {errors.subject}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="contactFormMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              name="message"
              as="textarea"
              rows="4"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
              isValid={touched.message && !errors.message}
              isInvalid={!!errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;

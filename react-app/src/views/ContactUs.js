import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../components/ContactForm.js";
import ContactInfo from "../components/ContactInfo.js";
import Loader from "../components/Loader";
import { useAxiosGet } from "../hooks/useAxiosGet";

function ContactUs() {
  const url = `${process.env.REACT_APP_NODE_API}/page/5`;
  const page = useAxiosGet(url);

  let content, title;

  if (page.error) {
    content = <p>There was an error please refresh or try again later..</p>;
  }

  if (page.loading) {
    content = <Loader />;
  }

  if (page.data) {
    title = page.data.title;
    content = <ContactInfo content={page.data.content} />;
  }

  return (
    <Container className="mt-3 mt-md-5 jumbotron py-3 text-white" style={ { backgroundColor:  "#020202a3"} }>
      {/*

                Extend bootstrap h1 class to include the CSS in the below tag.

                Get invoke the axios.get from this file and pass the relevant 
                information to the ContactInfo component as a prop.
            */}
      <Row className="text-center text-md-left">
          <Col>
          <h1>{title}</h1>
          </Col>
        
      </Row>
      <Row>
        <Col md>
          <ContactForm />
        </Col>

        <Col md>{content}</Col>
      </Row>
    </Container>
  );
}

export default ContactUs;

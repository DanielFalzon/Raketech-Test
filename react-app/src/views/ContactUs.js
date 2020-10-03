import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../components/ContactForm.js";
import ContactInfo from "../components/ContactInfo.js";
import Loader from "../components/Loader";
import { useAxiosGet } from "../hooks/useAxiosGet";

function ContactUs() {
  const url = `${process.env.REACT_APP_NODE_API}page/5`;
  const page = useAxiosGet(url);

  let content, title;

  //Utilises error message retrieved by api for more information about the error on the screen.
  if (page.error) {
    content = <p>There was an error ({page.data.error}). Please refresh or try again later..</p>;
  }

  //While data is still being loaded, a spinner is shown in place of text.
  if (page.loading) {
    content = <Loader />;
  }


  //After data is loaded, assign the info component to the conntent variable.
  if (page.data && !page.data.error) {
    title = page.data.title;
    content = <ContactInfo content={page.data.content} />;
  } 

  //Render the component withe variables assigned as above.
  return (
    <Container className="mt-3 mt-md-5 jumbotron py-3 text-white" style={ { backgroundColor:  "#020202a3"} }>

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

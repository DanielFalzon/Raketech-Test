import React from 'react';
import { Container } from "react-bootstrap";
import ContactForm from '../components/ContactForm.js';
import ContactInfo from '../components/ContactInfo.js';

function ContactUs() {
    return (
        <Container>
            {/*
                Title must come from wordpress.
                Extend bootstrap h1 class to include the CSS in the below tag.

                Get invoke the axios.get from this file and pass the relevant 
                information to the ContactInfo component as a prop.
            */}
            <h1 className=" mt-3 mt-md-5 text-center text-md-left">GET IN TOUCH</h1>
        </Container>
    )
}

export default ContactUs

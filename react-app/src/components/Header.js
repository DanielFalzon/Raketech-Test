import React from 'react';
import { Navbar } from 'react-bootstrap';

function Header() {
    return (
        <Navbar bg="light">
            {/* 
                Consider using react-render-dom to get the title of the header
                dynamically, matching the slug in URL. Will be passed from the App.js file.
            */}
            <Navbar.Brand href="#">CONTACT FORM</Navbar.Brand>
        </Navbar>
    )
}

export default Header

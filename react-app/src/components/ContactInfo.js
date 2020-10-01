import React from 'react';
import Loader from './Loader';
import { useAxiosGet } from '../hooks/useAxiosGet';

function ContactInfo(props) {
    //Get URL from environment variable.
    const url = "http://localhost:7000/page/contact-us";
    const page = useAxiosGet(url);

    var content = null;

    if (page.error) {
        content = <p>There was an error please refresh or try again later..</p>;
    }
    
    if(page.loading){
        content = (<Loader />)
    }

    if(page.data){
        content = (
        <h1>{page.data.title}</h1>
        )
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default ContactInfo

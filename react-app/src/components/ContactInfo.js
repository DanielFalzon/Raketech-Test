import React, { Component } from "react";

export class ContactInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.content
    };
  }
  
  render() {

    return <div className="mt-5 mt-md-5 entry-content">
        {/*HTML is being rendered without the wordpress styling*/}
        <div dangerouslySetInnerHTML = { { __html: this.state.content } }></div>
    </div>

  }
}

export default ContactInfo;

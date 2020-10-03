import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { setNestedObjectValues } from "formik";

export class ContactAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      sentBy: null,
    };
  }

  //Handle update of state from parent component. Re-renders alert to be made visible.
  componentDidUpdate() {
    if (this.props.content != null) {
      const { response, sentBy } = this.props.content.data;

      if (response !== this.state.response && sentBy !== this.state.sentBy) {
        console.log(response);
        this.setState({
          response: response,
          sentBy: sentBy,
        });
      }
    }
  }

  //Create an alert element which is set to visible after a message has been submitted.
  render() {
    const { response, sentBy } = this.state;
    if (response == null) {
      return <div></div>;
    } else {
      return (
        <div>
          <Alert
            show={true}
            variant="success"
            className="mt-4 d-flex justify-content-between align-items-center"
          >
            <div>{response}</div>
          </Alert>
          <p>Sent to {sentBy}</p>
        </div>
      );
    }
  }
}

export default ContactAlert;
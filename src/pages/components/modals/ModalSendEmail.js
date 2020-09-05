import React from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";

class ModalSendEmail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        show={this.props.showSendEmail}
        onHide={this.props.handleSendEmailClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Send email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label for="subject">Subject</label>
          <input type="text" name="subject" id="subject" />
          <br />
          <label for="message">Message</label>
          <input type="text" name="message" id="message" />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleSendEmailClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleSendEmailClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalSendEmail;

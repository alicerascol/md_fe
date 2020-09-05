import React from "react";
import {
  Button,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
} from "reactstrap";
import { Modal } from "react-bootstrap";

class ModalSendEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      message: "",
    };
  }

  handleChangeEmail = (e) => {
    this.setState({ subject: e.target.value });
  };

  handleChangeMessage = (e) => {
    this.setState({ message: e.target.value });
  };

  handleSaveChanges = () => {
    const body = {
      subject: this.state.subject,
      message: this.state.message,
    };
    this.props.handleSendEmailSave(body);
    this.setState({ message: "Message", subject: "Subject" });
  };

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
          <FormGroup className="mt">
            <Label for="subject">Subject</Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-user text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="subject"
                className="input-transparent pl-3"
                value={this.state.subject}
                onChange={this.handleChangeEmail}
                type="text"
                required
                name="subject"
                placeholder="Subject"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className="mt">
            <Label for="Message">Message</Label>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="la la-send text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                id="message"
                className="input-transparent pl-3"
                value={this.state.message}
                onChange={this.handleChangeMessage}
                type="textarea"
                required
                name=""
                placeholder="Message"
              />
            </InputGroup>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            color="danger"
            className="auth-btn"
            size="sm"
            style={{ color: "#fff" }}
            variant="secondary"
            onClick={this.props.handleSendEmailClose}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="success"
            className="auth-btn"
            size="sm"
            variant="primary"
            onClick={this.handleSaveChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalSendEmail;

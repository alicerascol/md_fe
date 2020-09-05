import React from "react";
import { Button, FormGroup, Label, InputGroup, Input } from "reactstrap";
import { Modal } from "react-bootstrap";

class ModalChangeStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
    };
  }

  handleChangeStatus = (e) => {
    this.setState({ status: e.target.value });
  };

  handleSaveChanges = (e) => {
    this.props.handleChangeStatusSave(this.state.status);
    this.setState({ status: "" });
  };

  render() {
    return (
      <Modal
        show={this.props.showChangeStatus}
        onHide={this.props.handleChangeStatusClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            If the documents are incomplete, set the status to:{" "}
            <strong>NEED_WORK</strong>
          </p>
          <br />
          <p>
            If the documents are were verified and they are alright, set the
            status to: <strong>VERIFIED</strong>
          </p>
          <br />
          <p>
            If the student was addmited to the faculty, set the status to:
            <strong>ADMITTED</strong>
          </p>
          <br />
          <FormGroup className="mt">
            <Label for="message" className="">
              <p>
                <strong> New status</strong>
              </p>
            </Label>
            <InputGroup className="input-group-no-border">
              <Input
                id="status"
                className="input-transparent pl-3"
                value={this.state.status}
                onChange={this.handleChangeStatus}
                type="text"
                required
                name="Status"
                placeholder="new status"
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
            onClick={this.props.handleChangeStatusClose}
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

export default ModalChangeStatus;

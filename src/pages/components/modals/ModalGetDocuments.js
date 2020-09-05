import React from "react";
import { Button, FormGroup, Label, InputGroup, Input } from "reactstrap";
import { Modal } from "react-bootstrap";

class ModalGetDocuments extends React.Component {
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
          <Modal.Title>Student Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

export default ModalGetDocuments;

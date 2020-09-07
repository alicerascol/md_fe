import React from "react";
import { Button, FormGroup, Label, InputGroup, Input } from "reactstrap";
import { Modal } from "react-bootstrap";

class ShowCurrentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      value: "",
    };
  }

  handleChangeKey = (e) => {
    this.setState({ key: e.target.value });
  };

  handleChangeValue = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSaveChanges = () => {
    const body = {
      key: this.state.key,
      value: this.state.value,
    };
    this.props.handleSaveCurrentInfo(body);
    this.setState({ key: "Key", value: "Value" });
  };
  render() {
    return (
      <Modal
        show={this.props.showCurrentInfo}
        onHide={this.props.handleCloseCurrentInfo}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Faculty details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup className="mt">
            <Label for="key">Key</Label>
            <InputGroup className="input-group-no-border">
              <Input
                id="key"
                className="input-transparent pl-3"
                value={this.state.key}
                onChange={this.handleChangeKey}
                type="text"
                required
                name="key"
                placeholder="Key"
              />
            </InputGroup>
          </FormGroup>
          <FormGroup className="mt">
            <Label for="value">Value</Label>
            <InputGroup className="input-group-no-border">
              <Input
                id="value"
                className="input-transparent pl-3"
                value={this.state.value}
                onChange={this.handleChangeValue}
                type="textarea"
                required
                name="value"
                placeholder="Value"
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
            onClick={this.props.handleCloseCurrentInfo}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="success"
            className="auth-btn"
            size="sm"
            style={{ color: "#fff" }}
            variant="secondary"
            onClick={this.handleSaveChanges}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ShowCurrentInfo;

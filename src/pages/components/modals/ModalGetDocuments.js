import React from "react";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";

class ModalGetDocuments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        show={this.props.showGetDocs}
        onHide={this.props.handleGetDocsClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Student Documents <span>{this.props.studentEmail}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {this.props.studentDocs &&
              Object.keys(this.props.studentDocs).map((key, index) => (
                <div key={index}>
                  <span>
                    <strong>
                      <a href={this.props.studentDocs[key]}>{key}</a>
                    </strong>
                  </span>
                  <br />
                </div>
              ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            color="success"
            className="auth-btn"
            size="sm"
            style={{ color: "#fff" }}
            variant="secondary"
            onClick={this.props.handleGetDocsClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalGetDocuments;

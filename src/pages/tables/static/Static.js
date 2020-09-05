import React from "react";
import { Row, Col, Table, Button } from "reactstrap";
import { Dropdown } from "react-bootstrap";

import Widget from "../../../components/Widget";
import ModalSendEmail from "../../components/modals/ModalSendEmail";
import ModalChangeStatus from "../../components/modals/ModalChangeStatus";
import ModalGetDocuments from "../../components/modals/ModalGetDocuments";
import s from "./Static.module.scss";
import axios from "axios";

class Static extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      showSendEmail: false,
      showChangeStatus: false,
      showGetDocs: false,
    };
    this.setSendEmailShow = this.setSendEmailShow.bind(this);
    this.setChangeStatusShow = this.setChangeStatusShow.bind(this);
    this.setGetDocsShow = this.setGetDocsShow.bind(this);

    // send email
    this.state.handleSendEmailClose = this.handleSendEmailClose.bind(this);
    this.state.handleSendEmailShow = this.handleSendEmailShow.bind(this);
    this.state.handleSendEmailSave = this.handleSendEmailSave.bind(this);
    this.handleSendEmailClose = this.handleSendEmailClose.bind(this);
    this.handleSendEmailShow = this.handleSendEmailShow.bind(this);
    this.handleSendEmailSave = this.handleSendEmailSave.bind(this);
    // get documents

    // change status
    this.state.handleChangeStatusClose = this.handleChangeStatusClose.bind(
      this
    );
    this.state.handleChangeStatusShow = this.handleChangeStatusShow.bind(this);
    this.state.handleChangeStatusSave = this.handleChangeStatusSave.bind(this);
    this.handleChangeStatusClose = this.handleChangeStatusClose.bind(this);
    this.handleChangeStatusShow = this.handleChangeStatusShow.bind(this);
    this.handleChangeStatusSave = this.handleChangeStatusSave.bind(this);
  }

  componentDidMount() {
    const facultyId = localStorage.getItem("faculty_id");
    axios
      .get("http://localhost:8080/students/" + facultyId + "/filtered/all")
      .then((response) => {
        this.setState({ students: response.data });
        console.log("Successfully retrieved students");
      })
      .catch(() => {
        console.log("Something was wrong. Try again");
      });
  }

  sortStudents(status) {
    const facultyId = localStorage.getItem("faculty_id");
    axios
      .get(
        "http://localhost:8080/students/" + facultyId + "/filtered/" + status
      )
      .then((response) => {
        this.setState({ students: response.data });
      })
      .catch(() => {
        console.log("Something was wrong. Try again");
      });
  }

  sort(event, status) {
    event.preventDefault();
    this.setState({ students: [] });
    this.sortStudents(status);
  }

  exportStudents() {
    const facultyId = localStorage.getItem("faculty_id");
    axios
      .get("http://localhost:8080/students/" + facultyId + "/export")
      .then(() => {
        console.log("Successfully exported students");
      })
      .catch(() => {
        console.log("Something was wrong. Try again");
      });
  }

  // send email
  setSendEmailShow(status) {
    this.setState({ showSendEmail: status });
  }
  handleSendEmailClose() {
    this.setSendEmailShow(false);
    localStorage.removeItem("student_id");
  }
  handleSendEmailShow(studentId) {
    localStorage.setItem("student_id", studentId);
    this.setSendEmailShow(true);
  }
  handleSendEmailSave(body) {
    this.setSendEmailShow(false);
    const studentId = localStorage.getItem("student_id");
    axios
      .post("http://localhost:8080/students/" + studentId + "/email", body)
      .then(() => {
        console.log("Successfully sent email");
        localStorage.removeItem("student_id");
      })
      .catch(() => {
        console.log("Something was wrong. Try again");
        alert("Something was wrong. Try again to send the email!");
        localStorage.removeItem("student_id");
      });
  }

  // change status
  setChangeStatusShow(status) {
    this.setState({ showChangeStatus: status });
  }
  handleChangeStatusShow(studentId) {
    localStorage.setItem("student_id", studentId);
    this.setChangeStatusShow(true);
  }
  handleChangeStatusClose() {
    this.setChangeStatusShow(false);
    localStorage.removeItem("student_id");
  }
  handleChangeStatusSave(status) {
    this.setChangeStatusShow(false);
    const studentId = localStorage.getItem("student_id");
    axios
      .post("http://localhost:8080/students/" + studentId + "/update/" + status)
      .then(() => {
        console.log("Successfully updated status");
        localStorage.removeItem("student_id");
        this.sortStudents("all");
      })
      .catch(() => {
        console.log("Something was wrong. Try again");
        alert("Wrong status!");
        localStorage.removeItem("student_id");
      });
  }

  // get documents
  setGetDocsShow(status) {
    this.setState({ showGetDocs: status });
  }
  handleGetDocsShow() {
    this.setGetDocsShow(true);
  }
  handleGetDocsClose() {
    this.setChangeStatusShow(false);
  }
  handleGetDocsSave() {
    const studentId = localStorage.getItem("student_id");
    const facultyId = localStorage.getItem("faculty_id");
    axios
      .get(
        "http://localhost:8080/students/" +
          facultyId +
          "/" +
          studentId +
          "/documents"
      )
      .then(() => {
        console.log("Successfully retired documents");
        localStorage.removeItem("student_id");
      })
      .catch(() => {
        console.log("Something was wrong. Try again!");
        localStorage.removeItem("student_id");
      });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">
          <span>Students</span>
        </h2>
        <Row>
          <Col>
            <Widget bodyClass={s.mainTableWidget}>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic"
                  color="inverse"
                  className="mr-xs"
                  size="sm"
                >
                  Sort
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={(event) => this.sort(event, "all")}>
                    ALL
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => this.sort(event, "REGISTERED")}
                  >
                    REGISTERED
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => this.sort(event, "NEED_WORK")}
                  >
                    NEED_WORK
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => this.sort(event, "VERIFIED")}
                  >
                    VERIFIED
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(event) => this.sort(event, "ACCEPTED")}
                  >
                    ACCEPTED
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Table striped className="table-hover">
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">Id</th>
                    <th className="hidden-sm-down">Email</th>
                    <th className="hidden-sm-down">First name</th>
                    <th className="hidden-sm-down">Last name</th>
                    <th className="hidden-sm-down">Father initials</th>
                    <th className="hidden-sm-down">Citizenship</th>
                    <th className="hidden-sm-down">Status</th>
                    <th className="hidden-sm-down"></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.students.map((student) => (
                    <tr key={student.id}>
                      <td className="text-muted">{student.id}</td>
                      <td className="text-muted">{student.email}</td>
                      <td className="text-muted">{student.firstName}</td>
                      <td className="text-muted">{student.lastName}</td>
                      <td className="text-muted">{student.father_initials}</td>
                      <td className="text-muted">{student.citizenship}</td>
                      <td className="text-muted">{student.status}</td>
                      <td className="text-muted">
                        <Button
                          variant="primary"
                          size="xs"
                          color="success"
                          className="mr-1"
                          onClick={() =>
                            this.handleChangeStatusShow(student.id)
                          }
                        >
                          Change Status
                        </Button>
                        <ModalChangeStatus
                          showChangeStatus={this.state.showChangeStatus}
                          handleChangeStatusClose={
                            this.state.handleChangeStatusClose
                          }
                          handleChangeStatusSave={
                            this.state.handleChangeStatusSave
                          }
                        ></ModalChangeStatus>
                      </td>
                      <td className="text-muted">
                        <Button
                          variant="primary"
                          size="xs"
                          color="success"
                          className="mr-1"
                          onClick={() => this.handleSendEmailShow(student.id)}
                        >
                          Send Email
                        </Button>
                        <ModalSendEmail
                          showSendEmail={this.state.showSendEmail}
                          handleSendEmailClose={this.state.handleSendEmailClose}
                          handleSendEmailSave={this.state.handleSendEmailSave}
                        ></ModalSendEmail>
                      </td>
                      <td className="text-muted">
                        <Button
                          size="xs"
                          color="success"
                          className="mr-1"
                          onClick={(event) =>
                            this.openGetDocumentsModal(event, student.id)
                          }
                        >
                          Get documents
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                variant="primary"
                size="xs"
                color="success"
                className="mr-1"
                onClick={() => this.exportStudents()}
              >
                Export students
              </Button>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Static;

import React from "react";
import { JSONToHTMLTable } from "@kevincobain2000/json-to-html-table";
import axios from "axios";
import Widget from "../../components/Widget";
import s from "./Dashboard.module.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initially, no file is selected
      selectedFile: null,
      showCurrentInfo: false,
      facultyDetails: this.getCurrentInfo(),
      facultyObject: this.getFacultyObject(),
    };

    this.setShowCurrentInfo = this.setShowCurrentInfo.bind(this);

    this.state.handleCloseCurrentInfo = this.handleCloseCurrentInfo.bind(this);
    this.state.handleShowCurrentInfo = this.handleShowCurrentInfo.bind(this);
    this.state.handleSaveCurrentInfo = this.handleSaveCurrentInfo.bind(this);
    this.handleCloseCurrentInfo = this.handleCloseCurrentInfo.bind(this);
    this.handleShowCurrentInfo = this.handleShowCurrentInfo.bind(this);
    this.handleSaveCurrentInfo = this.handleSaveCurrentInfo.bind(this);
  }

  // send email
  setShowCurrentInfo(status) {
    this.setState({ showCurrentInfo: status });
  }
  handleCloseCurrentInfo() {
    this.setShowCurrentInfo(false);
  }
  handleShowCurrentInfo() {
    this.setShowCurrentInfo(true);
  }
  handleSaveCurrentInfo() {}

  getCurrentInfo() {
    if (localStorage.getItem("loadedDocs") === "false") return;
    const facultyId = localStorage.getItem("faculty_id");
    axios
      // .get("http://localhost:8080/faculties/" + facultyId + "/details/download")
      .get(
        "http://backend.westeurope.azurecontainer.io:8080/faculties/" +
          facultyId +
          "/details/download"
      )
      .then(() => {
        axios
          // .get("http://localhost:8080/faculties/" + facultyId + "/details")
          .get(
            "http://backend.westeurope.azurecontainer.io:8080/faculties/" +
              facultyId +
              "/details"
          )
          .then((response) => {
            this.setState({ facultyDetails: response.data });
            console.log("Successfully retrieved details");
          })
          .catch(() => {
            console.log("Something was wrong. Try again!");
            localStorage.removeItem("student_id");
          });
        console.log("Successfully retrieved details");
      })
      .catch(() => {
        console.log("Something was wrong. Try again!");
        localStorage.removeItem("student_id");
      });
  }

  getFacultyObject() {
    const facultyId = localStorage.getItem("faculty_id");
    axios
      // .get("http://localhost:8080/faculties/" + facultyId)
      .get(
        "http://backend.westeurope.azurecontainer.io:8080/faculties/" +
          facultyId
      )
      .then((response) => {
        this.setState({ facultyObject: response.data });
        console.log("Successfully retrieved faculty object");
      })
      .catch(() => {
        console.log("Something was wrong. Try again!");
        localStorage.removeItem("student_id");
      });
  }

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "detailsFacultyFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    const facultyId = localStorage.getItem("faculty_id");
    axios
      // .post(
      //   "http://localhost:8080/faculties/" + facultyId + "/details",
      //   formData
      // )
      .post(
        "http://backend.westeurope.azurecontainer.io:8080/faculties/" +
          facultyId +
          "/details",
        formData
      )
      .then(() => {
        if (localStorage.getItem("loadedDocs") === "false")
          localStorage.setItem("loadedDocs", "true");
        this.setState({ selectedFile: false });
        console.log("Successfully uploaded document");
        window.location.reload(false);
      })
      .catch(() => {
        console.log("Something was wrong. Try again");
        alert("Something was wrong. Try again to upload the document!");
      });
  };

  // File content to be displayed after file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    if (localStorage.loadedDocs === "false")
      return (
        <div className={s.root}>
          <h2>Please upload document with the details of the faculty ... </h2>
          <Widget className="bg-transparent">
            <div>
              <div>
                <input type="file" onChange={this.onFileChange} />
                <button
                  onClick={this.onFileUpload}
                  disabled={this.state.selectedFile === null}
                >
                  Upload!
                </button>
              </div>
              {this.fileData()}
            </div>
          </Widget>
        </div>
      );
    if (!this.state.facultyObject || !this.state.facultyDetails)
      return <div className={s.root}>Loading...</div>;
    return (
      <div className={s.root}>
        {/* <Widget
          className="bg-transparent"
          title={<h3>Update faculty details </h3>}
        >
          <Button
            variant="primary"
            size="xs"
            color="success"
            className="mr-1"
            onClick={() => this.handleShowCurrentInfo()}
          >
            Update faculty details
          </Button>
          <ShowCurrentInfo
            showCurrentInfo={this.state.showCurrentInfo}
            handleCloseCurrentInfo={this.state.handleCloseCurrentInfo}
            handleSaveCurrentInfo={this.state.handleSaveCurrentInfo}
            facultyDetails={this.state.facultyDetails}
          ></ShowCurrentInfo>
        </Widget> */}

        <Widget
          className="bg-transparent"
          title={<h3>Update details about faculty </h3>}
        >
          <div>
            <div>
              <input type="file" onChange={this.onFileChange} />
              <button
                onClick={this.onFileUpload}
                disabled={this.state.selectedFile === null}
              >
                Upload!
              </button>
            </div>
            {this.fileData()}
          </div>
        </Widget>

        <Widget className="bg-transparent" title={<h3>View details</h3>}>
          {/* <button onClick={() => window.location.reload(false)}>
            Refresh details
          </button> */}
          <JSONToHTMLTable
            data={this.state.facultyDetails}
            tableClassName="table table-sm"
          />
        </Widget>
      </div>
    );
  }
}

export default Dashboard;

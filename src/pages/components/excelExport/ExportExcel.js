import React from "react";
import ReactExport from "react-data-export";
import { Button } from "reactstrap";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportExcel extends React.Component {
  render() {
    return (
      <ExcelFile
        filename="Students excel"
        element={
          <Button
            variant="primary"
            size="xs"
            color="success"
            className="mr-1"
            disabled={this.props.studentsData.length === 0}
          >
            Export excel
          </Button>
        }
      >
        <ExcelSheet data={this.props.studentsData} name="Employees">
          <ExcelColumn label="Id" value="id" />
          <ExcelColumn label="Email" value="email" />
          <ExcelColumn label="First name" value="firstName" />
          <ExcelColumn label="Last name" value="lastName" />
          <ExcelColumn label="Father initials" value="father_initials" />
          <ExcelColumn label="Father initials" value="father_initials" />
          <ExcelColumn label="Citizenship" value="citizenship" />
          <ExcelColumn
            label="Certificat de nastere"
            value="certificat_nastere"
          />
          <ExcelColumn label="Cerere de inscriere" value="cerere_inscriere" />
          <ExcelColumn
            label="Declaratie pe propria raspundere - Depunere documente"
            value="declaratie_depunere_documente"
          />
          <ExcelColumn
            label="Declaratie pe propria raspundere - Loc buget"
            value="declaratie_loc_buget"
          />
          <ExcelColumn
            label="Certificat de casatorie"
            value="certificat_casatorie"
          />
          <ExcelColumn
            label="Dovada plata/scutire taxa de inscriere "
            value="dovada_plata"
          />
          <ExcelColumn
            label="Carte de identitate/Pasaport"
            value="carte_identitate"
          />
          <ExcelColumn
            label="Diploma de bacalaureat"
            value="diploma_bacalaureat"
          />
          <ExcelColumn
            label="Adeeverinta medicala"
            value="adeverinta_medicala"
          />
          <ExcelColumn
            label="Certificat competente lingvistice"
            value="competenta_lingvistica"
          />
          <ExcelColumn
            label="Declaratie pe propria raspundere - veridicitate date"
            value="declaratie_veridicitate"
          />
          <ExcelColumn label="Fotografie recenta" value="fotografie" />
          <ExcelColumn
            label="Foaie matricola liceu"
            value="foaie_matricola_liceu"
          />
          <ExcelColumn label="Informatii despre student" value="studentInfo" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default ExportExcel;

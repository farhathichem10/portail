import { Component } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { ApiService } from "../../services/api.service";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { TokenStorage } from "src/app/services/token-storage";
import { FamilleService } from "src/app/services/famille.service";
import { PersonnelService } from "src/app/services/personnel.service";
@Component({
  selector: 'app-scolfam',
  templateUrl: './scolfam.component.html',
  styleUrls: ['./scolfam.component.css']
})
export class ScolfamComponent  {

  title = "grid";
  api!: GridApi;
  prs:any=[]
  rowData: any[] = [];
  perso11 :any = {
    cod_soc:"01",
    mat_pers:"07879"
  };

  constructor(private serv: PersonnelService,private token: TokenStorage) {}
  columnDefs = [
   

    {
      headerName: "prenom",
      field: "libprenom",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    {
      headerName: "Nom",
      field: "libnomjf",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
      },
    {
      headerName: " Sexe ",
      field: "libsexe",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    { headerName: "Date de Naissance",
      field: "libdat_naiss",
      filter: "agDateColumnFilter",
      filterParams: {
        // provide comparator function
        comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
          var dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          var dateParts = dateAsString.split("/");
          var year = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var day = Number(dateParts[0]);
          var cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
      editable: true,
      cellEditor: "primeCellEditor",
    }, {
      headerName: "dat_fin_indeminité",

      field: "date_ind_fin",
      filter: "agDateColumnFilter",
      filterParams: {
        // provide comparator function
        comparator: function (filterLocalDateAtMidnight: any, cellValue: any) {
          var dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          var dateParts = dateAsString.split("/");
          var year = Number(dateParts[2]);
          var month = Number(dateParts[1]) - 1;
          var day = Number(dateParts[0]);
          var cellDate = new Date(year, month, day);

          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
      editable: true,
      cellEditor: "primeCellEditor",
    },
    
    
    
    
   
  ];

  ngOnInit(): void {
    this.getFacture();
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getfamsoc(this.token.getUser().cod_soc,this.token.getUser().matpers).subscribe(
      (data: any[]) => {
        
        
        this.rowData=data


        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modules: Module[] = [ClientSideRowModelModule];
}
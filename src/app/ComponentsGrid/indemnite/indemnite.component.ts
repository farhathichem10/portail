import { Component } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { ApiService } from "src/app/services/api.service";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { EtablissementService } from "src/app/services/etablissement.service";
import { TokenStorage } from "src/app/services/token-storage";
import { PersonnelService } from "src/app/services/personnel.service";

@Component({
  selector: 'app-indemnite',
  templateUrl: './indemnite.component.html',
  styleUrls: ['./indemnite.component.css']
})
export class IndemniteComponent  {
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
      headerName: "Abrv-fixe",
      field: "abrv_fixe",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    {
      headerName: "Libelle",
      field: "lib_ind",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
      },
    {
      headerName: "Montant",
      field: "montant",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    { headerName: "Date_Indem",
      field: "date_ind",
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
    {
      headerName: " Num_niv",
      field: "num_niv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    {
      headerName: " Cod_Niv",
      field: "cod_niv",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    
    {
      headerName: " Type_par",
      field: "type_par",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
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
    this.serv.getpersonnel(this.perso11).subscribe(
      (data: any[]) => {
        this.prs = data
        
        this.rowData=this.prs.possede


        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modules: Module[] = [ClientSideRowModelModule];
}
import { Component } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { ApiService } from "../../services/api.service";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { TokenStorage } from "src/app/services/token-storage";
import { FamilleService } from "src/app/services/famille.service";

@Component({
  selector: 'app-conjoint',
  templateUrl: './conjoint.component.html',
  styleUrls: ['./conjoint.component.css']
})
export class ConjointComponent  {

  title = "grid";
  api!: GridApi;
  rowData: any[] = [];

  constructor(private serv: FamilleService,private tokenService:TokenStorage) {
    
  }
  columnDefs = [
    {
      headerName: "Num_ass_conj",
      field: "num_ass_conj",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    {
      headerName: "Num_Famille",
      field: "num_fam",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    
    
    {
      headerName: "Penom",
      field: "prenom",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 130,
      pinned: true,
      checkboxSelection: true,
      
     
    },
    {
      headerName: "Nom",
      field: "nom_jf",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 130,
      pinned: true,
      checkboxSelection: true,
      
     
    },
    
    {
      headerName: "Date de Naissance",
      field: "dat_naiss",
      filter: "agDateColumnFilter",
      resizable: true,
      sortable: true,
      floatingFilter: true,
      pinned: true,
      width: 150,

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
      headerName: "Date Cin",
      field: "dat_cin",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 150,
      sortable: true,
      floatingFilter: true,
      pinned: true,

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
      field: "Date mariage",
      headerName: "dat_mar",
      filter: "agDateColumnFilter",
      resizable: true,
      width: 150,
      sortable: true,
      floatingFilter: true,
      pinned: true,

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
      headerName: "Prenom 2eme langue",
      field: "prenom_a",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      enableRowGroup: true,
      width: 120,
      pinned: true,
      

     
    },
    {
      headerName: "cin",
      field: "cin",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },{
      headerName: "Lieu emission cin",
      field: "lieu_cin",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },



    


    

    {
      headerName: "nom 2eme langue",
      field: "nom_jf_a",
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
    this.GetConge();
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  /* getFacture() {
    this.factureService.GetChambreByCode().subscribe(
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
 */
  GetConge() {
    this.serv.getconjoint(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers).subscribe(
      (data: any[]) => {
        this.rowData = data;

        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onQuickFilterChanged($event: any) {
    this.api.setQuickFilter($event.target.value);
}

  modules: Module[] = [ClientSideRowModelModule];
}

import { Component } from "@angular/core";
import { GridApi } from "ag-grid-community";
import { ApiService } from "../../services/api.service";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { TokenStorage } from "src/app/services/token-storage";
import { FamilleService } from "src/app/services/famille.service";
import { ComptepersService } from "src/app/services/comptepers.service";
import { AffilpersService } from "src/app/services/affilpers.service";
@Component({
  selector: 'app-affilpers',
  templateUrl: './affilpers.component.html',
  styleUrls: ['./affilpers.component.css']
})
export class AffilpersComponent   {

  x:any

  title = "grid";
  api!: GridApi;
  rowData: any[] = [];

  constructor(private serv: AffilpersService,private tokenService:TokenStorage) {
    
  }
  columnDefs = [
    {
      headerName: "Code_Affil",
      field: "cod_affil",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    {
      headerName: "Libele",
      field: "typ_affil",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },
    
    
   
  
    
   

   

    {
      field: "dat_affil",
      headerName: "dat_Affil",
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
      field: "dat_fin",
      headerName: "Date Fin",
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
      headerName: "Num Affil",
      field: "num_affil",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 160,
      pinned: true,
    },



    


    

    
  ];

  ngOnInit() {
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
    this.serv.getaffilpers(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers).subscribe(
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

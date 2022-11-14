import { Component } from '@angular/core';
import { GridApi } from "ag-grid-community";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Module } from "@ag-grid-community/core";
import { EtablissementService } from "src/app/services/etablissement.service";
import { AdrpersService } from 'src/app/services/adrpers.service';
import { TokenStorage } from 'src/app/services/token-storage';
import { PersonnelService } from 'src/app/services/personnel.service';
@Component({
  selector: 'app-gridadressenoncourant',
  templateUrl: './gridadressenoncourant.component.html',
  styleUrls: ['./gridadressenoncourant.component.css']
})
export class GridadressenoncourantComponent  {
  gouv:any
  title = "grid";
  api!: GridApi;
  rowData: any[] = [];
  codsoc:any
  prs:any=[]
  perso11 :any = {
    cod_soc:"01",
    mat_pers:"07879"
  };
 

  constructor(private serv: PersonnelService, private token: TokenStorage) {


    
  }
  columnDefs = [
   

  
    {
      headerName: "Rue_A",
      field: "rue_a",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 300,
      pinned: true,
    },
    {
      headerName: "Rue",
      field: "rue",
      editable: true,
      resizable: true,
      sortable: true,
      filter: true,
      floatingFilter: true,
      width: 330,
      pinned: true,
    },
    {
      headerName: "Gouvernorat",
      field: "lib_gouv",
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
    
    this.getFacture();
  }
  defaultColDef = {
    sortable: true,
    filter: true,
  };
  getFacture() {
    this.serv.getpersonnel(this.perso11).subscribe(
      (data: any[]) => {
        this.prs = data;
        this.rowData=this.prs.adresses_personnel
        


        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  

  modules: Module[] = [ClientSideRowModelModule];
}
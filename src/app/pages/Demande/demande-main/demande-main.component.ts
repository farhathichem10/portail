import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Module } from '@ag-grid-community/core';
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DemandeService } from 'src/app/services/demande.service';
import { TokenStorage } from 'src/app/services/token-storage';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-demande-main',
  templateUrl: './demande-main.component.html',
  styleUrls: ['./demande-main.component.css']
})
export class DemandeMainComponent implements OnInit {
  tab: number = 1;
  x: string='';
  rowData: any[] = [];
  ListConge: any[] = [];
  ListDocument: any[] = [];
  Listavance: any[] = [];
  ListAutorisation: any[] = [];
  listFormation: any[] = [];

  typeFormation: any[] = [];
  themeFormations: any[] = [];
  listGroupe: any[] = [];
  listTypePret: any[] = [];
  listTypeAutorisation: any[] = [];
  listMotifCng: any[] = [];


  formattedDate: any;
  pipe = new DatePipe('en-US');
  valuedate = new Date();
titreFormation:any[]=[]
amount!:any
  userFile:any ;
  dataForm!: FormGroup
  formPretAvance!:FormGroup
  formAutorisation!:FormGroup
  formDocument!:FormGroup
  formFormation!:FormGroup
  formConge!:FormGroup


  myDateValue!:Date;

  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file!: File ; // Variable to store file
   public imagePath:any;
   imgURL: any;
   currentDate!:Date
   public message!: string;
$event1: any;
public domLayout: 'normal' | 'autoHeight' | 'print' = 'autoHeight';

  constructor(private demandeService:DemandeService,private formBuilder : FormBuilder
    ,private tokenService:TokenStorage,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.myDateValue = new Date();
    this.dataForm = this.formBuilder.group({
      id_libre_demande : [''],
      

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      txtDem: ['',Validators.required],
      reponse:[''],
      typDemande:['S'],
      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });


    this.formPretAvance = this.formBuilder.group({
      
      

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      codGrpPret : ['',Validators.required],
      typPret: ['',Validators.required],
      mntDem:['',Validators.required],
      reponse:[''],
      typDemande:['P'],

      matPers:[this.tokenService.getUser().matpers],
codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.formAutorisation = this.formBuilder.group({
      
      

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      heurS : ['',Validators.required],
      heurR:['',Validators.required],
      typDemande: ['A'],
      minR:['',Validators.required],
      minS:['',Validators.required],
      txtDem:['',Validators.required],
      codAut:['',Validators.required],

      reponseChef:[''],
      txtChef:[''],
      reponse:[''],
      

      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.formConge = this.formBuilder.group({

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      datDebut:['',Validators.required],
      datFin:['',Validators.required],
      typDemande: ['C'],
      cngTemps:['',Validators.required],
      cngTempsDebut:['',Validators.required],
      cngTempsFin:['',Validators.required],
      codM:['',Validators.required],
      reponseChef:[''],
      txtChef:[''],
      reponse:[''],
      matPers:[this.tokenService.getUser().matpers],
      codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.formDocument = this.formBuilder.group({

      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      typDemande: ['D'],
      numAttest:['',Validators.required],
      txtChef:[''],
      reponse:[''],

      matPers:[this.tokenService.getUser().matpers],
codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.formFormation = this.formBuilder.group({
      dateDemande : [(new Date()).toLocaleDateString().substring(0,10),Validators.required],
      annee : ['',Validators.required],
      codTheme:['',Validators.required],
      typDemande: ['F'],
      codTit:['',Validators.required],

      codTyp:['',Validators.required],
      datDebut:['',Validators.required],
      datFin:['',Validators.required],
      reponseChef:[''],
      txtChef:[''],
      reponse:[''],

      matPers:[this.tokenService.getUser().matpers],
codSoc:[this.tokenService.getUser().cod_soc]
    });
    this.getListSituation()
    this.getTitreFormation()

    this.getGroupePret()
    this.getTypeAutorisation()
    this.getMotifCng()
    this.getListConge()
    this.getListAutorisation()
    this.getListDocument()
    this.getListFormation()
    this.getListAvance()

  }
  columnAvance = [
    {
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
      floatingFilter: true,
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
    { headerName: "codGrpPret", 
    field: "group_pret", 
    editable: true,
    oatingFilter: true,   
       filter:true,

  },

    {
      headerName: "typPret",
      field: "lib_pret",
      editable: true,
      filter:true,
      floatingFilter: true,

    },

    {
      headerName: "mntDem",
      field: "mntDem",
      editable: true,
      floatingFilter: true,

      
    },

    {
      headerName: "Reponse",
      field: "reponse",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "reponse",
      field: "reponse",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "fileName",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),

      editable: true,
      floatingFilter: true,

      
    },

  ];
  columnFormaton = [
    {
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
      floatingFilter: true,
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
    { headerName: "codTit", 
    field: "titre", 
    editable: true,
    oatingFilter: true,   
       filter:true,

  },

    {
      headerName: "codTyp",
      field: "type_formation",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    {
      headerName: "codTheme",
      field: "theme",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    {
      headerName: "datDebut",
      field: "datDebut",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    {
      headerName: "datFin",
      field: "datFin",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    
    {
      headerName: "fileName",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),

      editable: true,
      floatingFilter: true,

      
    },


  ];
  columnDocument = [
    {
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
      floatingFilter: true,
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
    { headerName: "numAttest", 
    field: "numAttest", 
    editable: true,
    oatingFilter: true,   
       filter:true,

  },

    {
      headerName: "reponseRh",
      field: "reponse",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    
    {
      headerName: "fileName",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),

      editable: true,
      floatingFilter: true,

      
    },
   

  ];

  columnDefs = [
    {
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
      floatingFilter: true,
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
    { headerName: "ObservationRh", 
    field: "txtReponse", 
    editable: true,
    oatingFilter: true,   
       filter:true,

  },

    {
      headerName: "reponseRh",
      field: "reponse",
      editable: true,
      filter:true,
      floatingFilter: true,

    },
    
    {
      headerName: "fileName",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),

      editable: true,
      floatingFilter: true,

      
    },
   

  ];
  columnAutorisation = [
    
    
    {
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
      floatingFilter: true,
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
    
    { headerName: "heurS", 
    field: "heurS", 
    editable: true,
    oatingFilter: true,   
       filter:true,

  },
  {
    headerName: "minS",
    field: "minS",
    editable: true,
    floatingFilter: true,

    
  },

    {
      headerName: "heurR",
      field: "heurR",
      editable: true,
      filter:true,
      floatingFilter: true,

    },

    {
      headerName: "minR",
      field: "minR",
      editable: true,
      floatingFilter: true,

      
    },


    {
      headerName: "reponseRH",
      field: "reponse",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "reponseChef",
      field: "reponseChef",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "fileName",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),

      editable: true,
      floatingFilter: true,

      
    },

  ];
  columnConge= [
    {
      field: "dateDemande",
      filter: "agDateColumnFilter",
      sortable:true,
      floatingFilter: true,
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
      headerName: "datDebut",
      field: "datDebut",
    filter: "agDateColumnFilter",
    sortable:true,
    floatingFilter: true,
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
    headerName: "datFin",
    field: "datFin",
  filter: "agDateColumnFilter",
  sortable:true,
  floatingFilter: true,
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
      headerName: "motif",
      field: "motif",
      editable: true,
      filter:true,
      floatingFilter: true,

    },

   


    {
      headerName: "reponseRH",
      field: "reponse",
      editable: true,
      floatingFilter: true,

      
    },
    {
      headerName: "reponseChef",
      field: "reponseChef",
      editable: true,
      floatingFilter: true,

      
    },

    {
      headerName: "fileName",
      field: "fileName",
      cellRenderer: this.createHyperLink.bind(this),

      editable: true,
      floatingFilter: true,

      
    },
  ];

  onChange(event:any) {
    this.file = event.target.files[0];
}
defaultColDef = {
  sortable: true,
  filter: true,
};
createHyperLink(params:any): any {
  console.log(params.data.id_libre_demande)



  if (!params.data) { return; }
  const spanElement = document.createElement('span');
  spanElement.innerHTML = `<a href="${this.homeUrl}" > ${params.value} </a> `;
  spanElement.addEventListener('click', ($event) => {
    $event.preventDefault();
    // The below code is used to navigate from one page to another page in angular. you can change it          // according to your requirement.
    this.demandeService.download(params.data.id_libre_demande)
      .subscribe(blob => saveAs(blob, params.value));
  });
  return spanElement;
}
get homeUrl(): string {
  return 'home';
}



onSelect(event:any){
 
  this.demandeService.GetTypeFormation(event.target.value).subscribe(
    (data: any[]) => {
      this.typeFormation = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
  this.demandeService.GetThemeFormation(event.target.value,"0104").subscribe(
    (data: any[]) => {
      this.themeFormations = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

onSelect1(event1:any){
  this.demandeService.GetTypePret(event1.target.value).subscribe(
    (data: any[]) => {
      this.listTypePret = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
  
}


onUpload() {
  this.loading = !this.loading;
  const formData = new  FormData();
  const article = this.dataForm.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
  debugger
this.demandeService.upload(formData).subscribe(
      (event: any) => {
        if (event) {
          this.toastr.success('Situation added!', 'Ajout effectuée avec succés.');
          this.getListSituation()
        } else {
          this.toastr.error('Echec ajout', 'Problème de suppression.');
        }

              // Short link via api response
              this.shortLink = event.link;

             // Flag variable 
              // let file = new Blob([event], { type: 'text/plain' });            
              // var fileURL = URL.createObjectURL(file);
              // window.open(fileURL);
          
      }
  );
}

DemandePretAvance() {
  this.loading = !this.loading;
  const formData = new  FormData();
  const article = this.formPretAvance.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
this.demandeService.upload(formData).subscribe(
      (event: any) => {
        if (event) {
          this.toastr.success('Pret&Avance added!', 'Ajout effectuée avec succés.');
          this.getListAvance()
        } else {
          this.toastr.error('Echec ajout', 'Problème de suppression.');
        }
          
      }
  );
}

DemandeAutorisation() {
  this.loading = !this.loading;
  const formData = new  FormData();
  const article = this.formAutorisation.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
this.demandeService.upload(formData).subscribe(
      (event: any) => {
        if (event) {
          this.toastr.success('Autorisation added!', 'Ajout effectuée avec succés.');
          this.getListAutorisation()
        } else {
          this.toastr.error('Echec ajout', 'Problème de suppression.');
        }
         
          
      }
  );
}
DemandeDocument() {
  this.loading = !this.loading;
  const formData = new  FormData();
  const article = this.formDocument.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
this.demandeService.upload(formData).subscribe(
      (event: any) => {
        if (event) {
          this.toastr.success('Document added!', 'Ajout effectuée avec succés.');
          this.getListDocument()
        } else {
          this.toastr.error('Echec ajout', 'Problème de suppression.');
        }
          
      }
  );
}
DemandeFormation() {
  this.loading = !this.loading;
  const formData = new  FormData();
  const article = this.formFormation.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
this.demandeService.upload(formData).subscribe(
      (event: any) => {
        if (event) {
          this.toastr.success('Formation added!', 'Ajout effectuée avec succés.');
          this.getListFormation()
        } else {
          this.toastr.error('Echec ajout', 'Problème de suppression.');
        }
          
      }
  );
}
DemandeConge() {
  this.loading = !this.loading;
  const formData = new  FormData();
  const article = this.formConge.value;
  console.log("elyes : "+this.file)
  formData.append('file',this.file);
  formData.append('demande',JSON.stringify(article));


  console.log(this.file);
this.demandeService.upload(formData).subscribe(
      (event: any) => {
          if (typeof (event) === 'object') {
            if (event) {
              this.toastr.success('Conge added!', 'Ajout effectuée avec succés.');
              this.shortLink = event.link;
              this.getListConge()          
              }
               else {
              this.toastr.error('Echec ajout', 'Problème de suppression.');
            }
              // Short link via api response

          
      }
    }
  );
}
getListAvance() {
  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"P").subscribe(
    (data: any[]) => {
      this.Listavance = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getListAutorisation() {


  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"A").subscribe(
    (data: any[]) => {
      this.ListAutorisation = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getListConge() {


  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"C").subscribe(
    (data: any[]) => {
      this.ListConge = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getListSituation() {
  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,
  this.tokenService.getUser().matpers,"S").subscribe(
    (data: any[]) => {
      this.rowData = data;

      
    },
    (error) => {
      console.log(error);
    }
  );
}
getListFormation() {
  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"F").subscribe(
    (data: any[]) => {
      this.listFormation = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

getListDocument() {
  console.log()
  this.demandeService.GetChambreByCode(this.tokenService.getUser().cod_soc,this.tokenService.getUser().matpers,"D").subscribe(
    (data: any[]) => {
      this.ListDocument = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

getTitreFormation() {
  this.demandeService.GetTitreFormation().subscribe(
    (data: any[]) => {
      this.titreFormation = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}





getGroupePret() {
  this.demandeService.GetTitreGroupePret().subscribe(
    (data: any[]) => {
      this.listGroupe = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getTypeAutorisation() {
  this.demandeService.GetTypeAutorisation().subscribe(
    (data: any[]) => {
      this.listTypeAutorisation = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
getMotifCng() {
  this.demandeService.GetMotifCng().subscribe(
    (data: any[]) => {
      this.listMotifCng = data;

      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}
modules: Module[] = [ClientSideRowModelModule];
}

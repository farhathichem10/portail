import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Idbsoin } from 'src/app/model/idbsoin';
import {LigbsoinService} from 'src/app/services/ligbsoin.service'

@Component({
  selector: 'app-bsoin',
  templateUrl: './bsoin.component.html',
  styleUrls: ['./bsoin.component.css']
})
export class BsoinComponent implements OnInit {
  data !: [];
  data1 !: [];
  array : any;
  list:any;
  list1:any=[];
    mat:any

  //idBsoin !: Idbsoin;
  idbesoin:any={
    cod_soc:"01",
    mat_pers:"07766",
    num_soins:10,
    dat_soins:"15/12/2012"
    
  }
  ligbult:any=[]
/*
    this.idbesoin.mat_pers=this.token.getUser().matpers
    console.log("teeeeeeeeee"+this.token.getUser().matpers)*/
  
  constructor(private serv : LigbsoinService) { }

  ngOnInit(): void {

    this.getgouv();
    this.getgouv1();
    
  }


   
  getgouv(){
    this.serv.bultSoinDet(this.idbesoin).subscribe(
      data => {
        this.list =data;
       //this.ligbult =this.list.ligBult
        
       
      },
      err => {
        console.log(err);
      }
      );

    }
    getgouv1(){
      this.serv.bultSoinDet(this.idbesoin).subscribe(
        data1 => {
          this.array =data1;
         //this.ligbult =this.list.ligBult
          console.log("dddd : ",this.array);
         
        },
        err => {
          console.log(err);
        }
        );
  
      }
}

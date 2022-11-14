import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsoinModel } from '../model/bsoin-model';

import { Idbsoin } from '../model/idbsoin';

@Injectable({
  providedIn: 'root'
})
export class LigbsoinService {
  id!: Idbsoin;
  constructor(private http: HttpClient) {

    this.id=new Idbsoin("01","07766",10,"15/12/2012");
  
   }


  
  fetchCession(){

    return this.http.get('http://192.168.2.94:8080/api/auth/getligB/')
  
    
   }
  
   fetchCessionBultsoin(){

    return this.http.get('http://192.168.2.94:8080/api/auth/getM/')
  
    
   }
   bultSoinDet(s:Idbsoin){

    return this.http.post<BsoinModel[]>('http://192.168.2.94:8080/api/bsoindet',s);

   }
   
}

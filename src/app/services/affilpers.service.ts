import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AffilpersService {

  constructor(private http:HttpClient) { }


  getaffilpers= (a:any,b:any): Observable<any[]> =>{

    return this.http.get<any[]>("http://127.0.0.1:8080/affilprs/get/"+a+"/"+b);}}


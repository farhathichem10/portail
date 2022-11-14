import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComptepersService {

  constructor(private http:HttpClient) { }


  getEnfant= (a:any,b:any,x:any): Observable<any[]> =>{

    return this.http.get<any[]>("http://127.0.0.1:8080/comptepers/getall/"+a+"/"+b+"/"+x);}}

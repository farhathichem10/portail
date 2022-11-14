import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  constructor(private http: HttpClient) { }
  getconjoint= (x:any,y:any): Observable<any[]> =>{

return this.http.get<any[]>("http://127.0.0.1:8080/famille/getconjoint/"+x+"/"+y);


  }
  getEnfant= (x:any,y:any): Observable<any[]> =>{

    return this.http.get<any[]>("http://127.0.0.1:8080/famille/getenfant/"+x+"/"+y);
    
    
      }
}

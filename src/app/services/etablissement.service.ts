import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {
  constructor(private http: HttpClient) { }
  getetablissementbycodesocandmatpers = (x:any,y:any): Observable<any[]> => {
    return this.http.get<any[]>("http://127.0.0.1:8080/ETABLIS/getetablissementbycodesocandmatpers/"+x+"/"+y);
  };
}

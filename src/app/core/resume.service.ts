import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

    readonly apiUrl = 'https://localhost:7000/';
//  readonly photoUrl = "http://localhost:50306/Photos/";

  constructor(private http: HttpClient) { }

  // Department
  getResumeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'GetAll');
  }

  // addDepartment(dept: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.post<any>(this.apiUrl + 'department/AddDepartment', dept, httpOptions);
  // }

  // updateDepartment(dept: any): Observable<any> {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //   return this.http.put<any>(this.apiUrl + 'department/UpdateDepartment/', dept, httpOptions);
  // }
}

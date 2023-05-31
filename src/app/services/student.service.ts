import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http : HttpClient) { }

  // url:any="http://localhost:3000/students";
  addStudent(data:any):Observable<any>
  {
    return this.http.post("http://localhost:3000/students",data);
  }

  updateStudent(id:number,data:any):Observable<any>
  {
    return this.http.put(`http://localhost:3000/students/${id}`,data);
  }

  getStudent():Observable<any>{
    return this.http.get("http://localhost:3000/students");
  }

  deleteStudent(id:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/students/${id}`)
  }

}

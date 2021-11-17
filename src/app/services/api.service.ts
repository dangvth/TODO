import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private REST_API_SERVER = 'http://localhost:3000';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  public getTodos(): Observable<any> {
    const url = `${this.REST_API_SERVER}/todos?_sort=id&_order=desc`; 
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public getTodo(id: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/todos/` + id; 
    return this.httpClient.get<any>(url, this.httpOptions);
  }

  public createTodo(todo: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/todos`; 
    return this.httpClient.post<any>(url, todo, this.httpOptions);
  }

  public updateTodo(id: number, todo: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/todos/` + id; 
    return this.httpClient.put<any>(url, todo, this.httpOptions);
  }

  public deleteTodo(id: number): Observable<any> {
    const url = `${this.REST_API_SERVER}/todos/` + id; 
    return this.httpClient.delete<any>(url, this.httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private readonly http: HttpClient) { }

  add(post: any): Observable<any> {
    return this.http.post('/api/posts', post);
  }

  getAll(): Observable<any> {
    return this.http.get('/api/posts');
  }
}

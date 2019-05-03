import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private readonly http: HttpClient) {}

  add(comment: any): Observable<any> {
    return this.http.post('/api/comments', comment);
  }

  getByPostId(
    postId: number,
    pageNumber: number = null,
    pageLimit: number = 10
  ): Observable<any> {
    const query =
      '/api/posts/' +
      postId +
      '/comments' +
      (pageNumber
        ? '?_page=' + pageNumber + (pageLimit ? '&_limit=' + pageLimit : '')
        : '');

    return this.http.get(query);
  }
}

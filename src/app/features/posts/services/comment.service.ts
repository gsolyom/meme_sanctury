import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private readonly http: HttpClient) {}

  add(comment: any): Observable<any> {
    comment.date = new Date();

    // TODO: remove this when the functionality gets implemented
    comment.userId = 1;

    return this.http.post('/api/comments', comment);
  }

  getByPostId(
    postId: number,
    pageNumber: number = null,
    pageLimit: number = 10
  ): Observable<any> {
    const query = `/api/posts/${postId}/comments/${pageNumber},${pageLimit}`;

    return this.http.get(query);
  }

  getByPostIdWithReplies(
    postId: number,
    pageNumber: number = null,
    pageLimit: number = 10
  ): Observable<any> {
    const query = `/api/posts/${postId}/comments&replies/${pageNumber},${pageLimit}`;

    return this.http.get(query);
  }
}

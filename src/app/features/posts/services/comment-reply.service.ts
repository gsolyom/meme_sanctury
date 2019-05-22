import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentReplyService {
  constructor(private readonly http: HttpClient) {}

  add(reply: any): Observable<any> {
    reply.date = new Date();

    // TODO: remove this when the functionality gets implemented
    reply.userId = 1;

    return this.http.post('/api/commentReplies', reply);
  }

  getByCommentId(
    commentId: number,
    pageNumber: number = null,
    pageLimit: number = 10
  ): Observable<any> {
    const query = `/api/comments/${commentId}/replies/${pageNumber},${pageLimit}`;

    return this.http.get(query);
  }
}

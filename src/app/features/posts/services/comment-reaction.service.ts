import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentReactionService {
  constructor(private readonly http: HttpClient) {}

  add(reaction: any): Observable<any> {
    // TODO: remove this when the functionality gets implemented
    reaction.userId = 1;

    return this.http.post('/api/commentReactions', reaction);
  }

  getByCommentId(commentId: number): Observable<any> {
    const query = `/api/comments/${commentId}/commentReactions`;

    return this.http.get(query);
  }
}

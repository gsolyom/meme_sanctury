import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostReactionService {
  constructor(private readonly http: HttpClient) {}

  add(reaction: any): Observable<any> {
    // TODO: remove this when the functionality gets implemented
    reaction.userId = 1;

    return this.http.post('/api/postReactions', reaction);
  }

  getByPostId(postId: number): Observable<any> {
    const query = `/api/posts/${postId}/postReactions`;

    return this.http.get(query);
  }
}

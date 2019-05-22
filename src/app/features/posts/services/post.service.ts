import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private readonly http: HttpClient) {}

  add(post: any): Observable<any> {
    post.date = new Date();

    // TODO: remove this when the corresponding features are implemented
    post.nsfw = false;
    post.ownerId = 1;

    return this.http.post('/api/posts', post);
  }

  getAll(): Observable<any> {
    return this.http.get('/api/posts');
  }

  getAllWithComments(): Observable<any> {
    return this.http.get('/api/posts?_embed=comments');
  }

  getAllWithCommentsAndReactions(): Observable<any> {
    return this.http.get('/api/posts?_embed=comments&_embed=postReactions');
  }

  getAllFilteredWithCommentsAndReactions(
    filterString: string = ''
  ): Observable<any> {
    const filter = filterString === '' ? '' : '&title_like=' + filterString;

    return this.http.get(
      `/api/posts?_embed=comments&_embed=postReactions${filter}`
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get(`/api/posts/${id}`);
  }

  getByIdWithReactions(id: number): Observable<any> {
    return this.http.get(`/api/posts/${id}?_embed=postReactions`);
  }

  getByIdWithComments(id: number): Observable<any> {
    return this.http.get(`/api/posts/${id}?_embed=comments`);
  }
}

import { Component, EventEmitter, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap, debounceTime, map } from 'rxjs/operators';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'msct-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements AfterViewInit {
  fetchPosts = new EventEmitter();

  posts: any = this.fetchPosts
    .asObservable()
    .pipe(switchMap(() => this.postService.getAll()));

  constructor(private readonly postService: PostService) { }

  ngAfterViewInit() {
    this.fetchPosts.emit();
  }
}

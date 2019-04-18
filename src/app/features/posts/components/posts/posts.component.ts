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
  addPost = new EventEmitter<any>();

  posts: any = this.fetchPosts
    .asObservable()
    .pipe(switchMap(() => this.postService.getAll()));

  constructor(private readonly postService: PostService) {
    this.addPost
      .asObservable()
      .pipe(
        debounceTime(500),
        switchMap(form => this.postService
          .add(form.value)
          .pipe(map(() => form))
        )
      )
      .subscribe((form: NgForm) => {
        form.reset();
        this.fetchPosts.emit();
      });
  }

  ngAfterViewInit() {
    this.fetchPosts.emit();
  }

  addPosts(form: NgForm): void {
    this.addPost.emit(form);
  }
}

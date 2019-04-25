import { Component, EventEmitter } from '@angular/core';

import { PostService } from '../../services/post.service';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'msct-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  addPostEmitter = new EventEmitter<any>();

  constructor(
    private readonly postService: PostService,
    private router: Router) {
    this.addPostEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        switchMap(form => this.postService
          .add(form.value)
          .pipe(map(() => form))
        )
      )
      .subscribe(
        (form: NgForm) => {
          form.reset();
          this.router.navigateByUrl('/posts');
        }
      );
  }

  addPost(form: NgForm): void {
    this.addPostEmitter.emit(form);
  }
}

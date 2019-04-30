import { Component, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap, map } from 'rxjs/operators';

import { PostService } from '../../services/post.service';

@Component({
  selector: 'msct-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {
  addPostEmitter = new EventEmitter<any>();

  constructor(
    private readonly postService: PostService,
    private router: Router
  ) {
    this.addPostEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        map(form => {
          form.value.date = new Date();
          return form;
        }),
        switchMap(form =>
          this.postService.add(form.value).pipe(map(() => form))
        )
      )
      .subscribe((form: NgForm) => {
        form.reset();
        this.router.navigateByUrl('/posts');
      });
  }

  addPost(form: NgForm): void {
    this.addPostEmitter.emit(form);
  }
}

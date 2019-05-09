import { Component, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap, map } from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import { flyInAnimation } from '@shared/animations';

@Component({
  selector: 'msct-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  animations: [flyInAnimation]
})
export class NewPostComponent {
  addPostEmitter = new EventEmitter<any>();
  animationState = 'void';

  constructor(
    private readonly postService: PostService,
    private router: Router
  ) {
    this.addPostEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        switchMap(form => this.postService.add(form.value))
      )
      .subscribe(() => {
        this.router.navigateByUrl('/posts');
      });
  }

  addPost(form: NgForm): void {
    this.addPostEmitter.emit(form);
  }
}

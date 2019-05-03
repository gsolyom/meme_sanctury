import { Component, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap, map } from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'msct-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  animations: [
    trigger('FadeIn', [
      state(
        'appear',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      state(
        'void',
        style({
          opacity: 0,
          transform: 'translateY(-5%)'
        })
      ),
      transition('void => appear', [animate('0.25s ease-in')])
    ])
  ]
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
        map(form => {
          form.value.date = new Date();
          form.value.nsfw = false;
          form.value.ownerId = 1;
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

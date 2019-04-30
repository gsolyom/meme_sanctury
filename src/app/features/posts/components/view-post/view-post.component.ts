import { Component, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'msct-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  animations: [
    trigger('Fade', [
      state(
        'fadeIn',
        style({
          opacity: 1
        })
      ),
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition(':enter', [animate('0.25s')]),
      transition(':leave', [animate('0.15s')])
    ])
  ]
})
export class ViewPostComponent {
  fetchPost = new EventEmitter<any>();
  post = this.route.params.pipe(
    switchMap(({ postId }) => this.postService.getById(postId))
  );
  showFullSizeImage = false;

  constructor(
    private readonly postService: PostService,
    private route: ActivatedRoute
  ) {}

  toggleFullSizeImage(): void {
    this.showFullSizeImage = !this.showFullSizeImage;
  }
}

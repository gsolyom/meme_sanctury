import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  switchMap,
  debounceTime,
  withLatestFrom,
  pluck,
  startWith
} from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import { fadeAnimation } from '@shared/animations';
import { CommentService } from '../../services/comment.service';
import { NewCommentComponent } from '../../components/new-comment/new-comment.component';

@Component({
  selector: 'msct-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
  animations: [fadeAnimation]
})
export class ViewPostComponent {
  @ViewChild(NewCommentComponent)
  newComment: NewCommentComponent;

  fetchComments = new EventEmitter<number>();
  addCommentEmitter = new EventEmitter<any>();
  showFullSizeImage = false;

  comments: any = this.fetchComments.asObservable().pipe(
    startWith(''),
    switchMap(() => this.route.params.pipe(pluck('postId'))),
    switchMap(postId => this.commentService.getByPostId(+postId, 1, 100))
  );
  post: any = this.route.params.pipe(
    switchMap(({ postId }) => this.postService.getById(postId))
  );

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private route: ActivatedRoute
  ) {
    window.scroll(0, 0);

    this.addCommentEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        withLatestFrom(route.params.pipe(pluck('postId'))),
        switchMap(([value, postId]) =>
          this.commentService.add({ ...value, postId: +postId })
        )
      )
      .subscribe(() => {
        this.newComment.reset();
        this.fetchComments.emit();
      });
  }

  addComment(comment: any): void {
    this.addCommentEmitter.emit(comment);
  }

  toggleFullSizeImage(): void {
    this.showFullSizeImage = !this.showFullSizeImage;
  }
}

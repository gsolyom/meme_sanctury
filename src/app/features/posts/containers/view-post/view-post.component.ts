import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import {
  switchMap,
  debounceTime,
  withLatestFrom,
  pluck,
  startWith,
  tap
} from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import { fadeAnimation } from '@shared/animations';
import { CommentService } from '../../services/comment.service';
import { NewCommentComponent } from '../../components/new-comment/new-comment.component';
import { CommentReplyService } from '../../services/comment-reply.service';

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
  addReplyEmitter = new EventEmitter<{
    reply: any;
    comment: any;
    component: NewCommentComponent;
  }>();

  showFullSizeImage = false;

  comments: any = this.fetchComments.asObservable().pipe(
    startWith(''),
    switchMap(() => this.route.params.pipe(pluck('postId'))),
    switchMap(postId =>
      this.commentService.getByPostIdWithReplies(+postId, 1, 100)
    ),
    tap(comments => {
      comments.forEach(comment => {
        comment.showReplies = false;
        comment.replyCount = comment.commentReplies.length;
      });
    })
  );
  post: any = this.route.params.pipe(
    switchMap(({ postId }) => this.postService.getById(postId))
  );

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly commentReplyService: CommentReplyService,
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

    this.addReplyEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        switchMap(({ reply, comment, component }) => {
          const addReplyRequest = this.commentReplyService.add(reply);

          return of({ addReplyRequest, comment, component });
        })
      )
      .subscribe(bundle => {
        bundle.addReplyRequest.subscribe(() => {
          bundle.component.reset();
          this.commentReplyService
            .getByCommentId(bundle.comment.id, 1, 100)
            .subscribe(replies => (bundle.comment.commentReplies = replies));
        });
      });
  }

  addComment(comment: any): void {
    this.addCommentEmitter.emit(comment);
  }

  addReply(reply: any, comment: any, component: NewCommentComponent): void {
    this.addReplyEmitter.emit({
      reply: { ...reply, commentId: comment.id },
      comment,
      component
    });
  }

  toggleFullSizeImage(): void {
    this.showFullSizeImage = !this.showFullSizeImage;
  }

  toggleReplies(comment: any): void {
    comment.showReplies = !comment.showReplies;
  }
}

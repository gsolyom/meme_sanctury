import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, from } from 'rxjs';
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
import { PostReactionService } from '../../services/post-reaction.service';
import { reactionTypes } from '../../constants';

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
  addPostReactionEmitter = new EventEmitter<{ value: any; post: any }>();
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
    switchMap(({ postId }) => this.postService.getByIdWithReactions(postId)),
    tap(post => {
      post.postReactions = this.countReactions(post.postReactions);
    })
  );

  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly commentReplyService: CommentReplyService,
    private readonly postReactionService: PostReactionService,
    private route: ActivatedRoute
  ) {
    this.configureAddCommentEmitter();
    this.configureAddReplyEmitter();
    this.configureAddPostReactionEmitter();

    window.scroll(0, 0);
  }

  addReaction(reaction: string, post: any): void {
    this.addPostReactionEmitter.emit({ value: { type: reaction }, post });
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

  private countReactions(reactions: Array<{ type: string }>): Array<number> {
    const reactionCounts = [0, 0, 0, 0];

    reactions.forEach(reaction => {
      this.mapReactionType(reaction.type, reactionCounts);
    });

    return reactionCounts;
  }

  private mapReactionType(
    reactionType: string,
    reactionCounts: Array<number>
  ): void {
    switch (reactionType) {
      case reactionTypes.favorite:
        reactionCounts[0]++;
        break;
      case reactionTypes.happy:
        reactionCounts[1]++;
        break;
      case reactionTypes.disappointed:
        reactionCounts[2]++;
        break;
      case reactionTypes.sad:
        reactionCounts[3]++;
        break;

      default:
        break;
    }
  }

  private configureAddCommentEmitter(): void {
    this.addCommentEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        withLatestFrom(this.route.params.pipe(pluck('postId'))),
        switchMap(([value, postId]) =>
          this.commentService.add({ ...value, postId: +postId })
        )
      )
      .subscribe(() => {
        this.newComment.reset();
        this.fetchComments.emit();
      });
  }

  private configureAddReplyEmitter(): void {
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

  private configureAddPostReactionEmitter(): void {
    this.addPostReactionEmitter
      .asObservable()
      .pipe(
        debounceTime(300),
        withLatestFrom(this.route.params.pipe(pluck('postId'))),
        switchMap(([{ value, post }, postId]) => {
          const request = this.postReactionService.add({
            ...value,
            postId: +postId
          });

          this.mapReactionType(value.type, post.postReactions);

          return request;
        })
      )
      .subscribe();

    // TODO: decide later if I want to reload this on refresh or on change
    // .subscribe(bundle => {
    //   bundle.request.subscribe(() =>
    //     this.postReactionService
    //       .getByPostId(bundle.postId)
    //       .pipe(map(reactions => this.countReactions(reactions)))
    //       .subscribe(postReactions => {
    //         bundle.post.postReactions = postReactions;
    //       })
    //   );
    // });
  }
}

import { Component, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { switchMap, debounceTime, map } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'msct-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements AfterViewInit {
  @Input() postId: number;

  fetchComments = new EventEmitter();
  addCommentEmitter = new EventEmitter<any>();

  comments: any = this.fetchComments
    .asObservable()
    .pipe(switchMap(() => this.commentService.getByPostId(this.postId)));

  constructor(private readonly commentService: CommentService) {
    this.addCommentEmitter
      .asObservable()
      .pipe(
        debounceTime(500),
        map(form => {
          form.value.date = new Date();
          form.value.userId = 1;
          form.value.postId = this.postId;
          return form;
        }),
        switchMap(form =>
          this.commentService.add(form.value).pipe(map(() => form))
        )
      )
      .subscribe((form: NgForm) => {
        form.reset();
        this.fetchComments.emit();
      });
  }

  ngAfterViewInit() {
    this.fetchComments.emit();
  }

  addComment(form: any) {
    this.addCommentEmitter.emit(form);
  }
}

import { Component, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'msct-comments-preview',
  templateUrl: './comments-preview.component.html',
  styleUrls: ['./comments-preview.component.scss']
})
export class CommentsPreviewComponent implements AfterViewInit {
  @Input() postId: number;

  fetchComments = new EventEmitter();

  comments: any = this.fetchComments
    .asObservable()
    .pipe(switchMap(() => this.commentService.getByPostId(this.postId, 1, 10)));

  constructor(private readonly commentService: CommentService) {}

  ngAfterViewInit() {
    this.fetchComments.emit();
  }
}

import { Component, Input, EventEmitter, AfterViewInit } from '@angular/core';
import { switchMap, debounceTime, map, tap } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'msct-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() comments: any;
}

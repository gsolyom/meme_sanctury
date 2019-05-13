import { Component, Input } from '@angular/core';

@Component({
  selector: 'msct-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comment: any;
}

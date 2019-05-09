import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'msct-comments-preview',
  templateUrl: './comments-preview.component.html',
  styleUrls: ['./comments-preview.component.scss']
})
export class CommentsPreviewComponent {
  @Input() comments: any;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'msct-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {
  @Input() title: any;
  @Input() url: any;
}

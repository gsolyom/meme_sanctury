import {
  Component,
  Input,
  OnInit,
  AfterContentChecked,
  AfterViewInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'msct-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  animations: [
    trigger('Grow', [
      state(
        'grown',
        style({
          'max-height': '500px'
        })
      ),
      state(
        'void',
        style({
          'max-height': '0px'
        })
      ),
      transition('void => grown', [animate('0.5s')]),
      transition('grown => grown', [])
    ])
  ]
})
export class PostCardComponent implements OnInit {
  @Input() title: any;
  @Input() url: any;
  @Input() animate: boolean;

  animationState: string;

  ngOnInit(): void {
    this.animationState = this.animate ? 'grown' : '';
  }
}

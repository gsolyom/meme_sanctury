import { Component, Input } from '@angular/core';

import { fadeAnimation } from '@shared/animations';

@Component({
  selector: 'msct-full-size-image-display',
  templateUrl: './full-size-image-display.component.html',
  styleUrls: ['./full-size-image-display.component.scss'],
  animations: [fadeAnimation]
})
export class FullSizeImageDisplayComponent {
  @Input() imageUrl: string;
}

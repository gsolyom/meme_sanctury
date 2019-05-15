import { Component, EventEmitter, Output, Input } from '@angular/core';
import { reactionTypes } from '../../constants';

@Component({
  selector: 'msct-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.scss']
})
export class ReactionsComponent {
  @Input()
  favoriteCount: number;

  @Input()
  happyCount: number;

  @Input()
  disappointedCount: number;

  @Input()
  sadCount: number;

  @Output()
  reactionSubmitted = new EventEmitter<string>();

  showReactionBar = false;
  reactionTypes = reactionTypes;

  addReaction(reaction: string): void {
    if (this.reactionTypes[reaction]) {
      this.reactionSubmitted.emit(reaction);
      this.showReactionBar = false;
    }
  }

  toggleReactionBar(): void {
    this.showReactionBar = !this.showReactionBar;
  }
}

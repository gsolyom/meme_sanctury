import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'msct-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss']
})
export class NewCommentComponent {
  @ViewChild(NgForm)
  form: NgForm;

  @Output()
  newCommentSubmitted = new EventEmitter();

  submit(): void {
    if (this.form.valid) {
      this.newCommentSubmitted.emit(this.form.value);
    }
  }

  reset = () => this.form.reset();
}

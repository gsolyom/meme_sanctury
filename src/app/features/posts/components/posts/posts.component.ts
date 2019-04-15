import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'msct-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  images: any[] = [];

  addImage(form: NgForm): void {
    this.images.push(form.value);
  }
}
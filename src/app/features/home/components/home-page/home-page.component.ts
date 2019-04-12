import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'msct-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'Meme Sanctuary';
  constructor() { }

  ngOnInit() {
  }

}

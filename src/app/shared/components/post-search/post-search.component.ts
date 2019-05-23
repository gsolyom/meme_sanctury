import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, withLatestFrom, pluck, filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'msct-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.scss']
})
export class PostSearchComponent {
  addPostEmitter = new EventEmitter<any>();
  searchFilter: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.addPostEmitter
      .asObservable()
      .pipe(debounceTime(500))
      .subscribe(searchFilter => {
        if (searchFilter) {
          this.router.navigate(['/posts'], {
            queryParams: { filter: searchFilter }
          });
        } else {
          this.router.navigate(['/posts']);
        }
      });

    this.route.queryParams.pipe(pluck('filter')).subscribe(filterValue => {
      const filterString = filterValue ? filterValue + '' : '';

      this.searchFilter =
        this.router.url.split('?')[0] === '/posts' ? filterString : '';
    });
  }

  searchPost(form: NgForm): void {
    this.addPostEmitter.emit(form.value);
  }
}

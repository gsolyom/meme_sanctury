import { Component, EventEmitter, AfterViewInit } from '@angular/core';
import { switchMap, debounceTime, tap, startWith, pluck } from 'rxjs/operators';

import { PostService } from '../../services/post.service';
import { PostReactionService } from '../../services/post-reaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { reactionTypes } from '../../constants';

@Component({
  selector: 'msct-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements AfterViewInit {
  fetchPosts = new EventEmitter<string>();

  addPostReactionEmitter = new EventEmitter<{ value: any; post: any }>();

  posts: any = this.fetchPosts.asObservable().pipe(
    switchMap(filterValue => {
      if (filterValue && filterValue + '' !== '') {
        const filterString = filterValue + '';

        return this.postService.getAllFilteredWithCommentsAndReactions(
          filterString
        );
      }

      return this.postService.getAllWithCommentsAndReactions();
    }),
    tap(posts => {
      posts.forEach(post => {
        post.postReactions = this.countReactions(post.postReactions);
      });
    })
  );

  constructor(
    private readonly postService: PostService,
    private readonly postReactionService: PostReactionService,
    private route: ActivatedRoute
  ) {
    this.configureAddPostReactionEmitter();
  }

  ngAfterViewInit() {
    this.route.queryParams.subscribe(params => {
      this.fetchPosts.emit(params.filter);
    });
  }

  addReaction(reaction: string, post: any): void {
    this.addPostReactionEmitter.emit({ value: { type: reaction }, post });
  }

  private countReactions(reactions: Array<{ type: string }>): Array<number> {
    const reactionCounts = [0, 0, 0, 0];

    reactions.forEach(reaction => {
      this.mapReactionType(reaction.type, reactionCounts);
    });

    return reactionCounts;
  }

  private mapReactionType(
    reactionType: string,
    reactionCounts: Array<number>
  ): void {
    switch (reactionType) {
      case reactionTypes.favorite:
        reactionCounts[0]++;
        break;
      case reactionTypes.happy:
        reactionCounts[1]++;
        break;
      case reactionTypes.disappointed:
        reactionCounts[2]++;
        break;
      case reactionTypes.sad:
        reactionCounts[3]++;
        break;

      default:
        break;
    }
  }

  private configureAddPostReactionEmitter(): void {
    this.addPostReactionEmitter
      .asObservable()
      .pipe(
        debounceTime(300),
        switchMap(({ value, post }) => {
          const request = this.postReactionService.add({
            ...value,
            postId: +post.id
          });

          this.mapReactionType(value.type, post.postReactions);

          return request;
        })
      )
      .subscribe();

    // TODO: decide later if I want to reload this on refresh or on change
    // .subscribe(bundle => {
    //   bundle.request.subscribe(() =>
    //     this.postReactionService
    //       .getByPostId(bundle.postId)
    //       .pipe(map(reactions => this.countReactions(reactions)))
    //       .subscribe(postReactions => {
    //         bundle.post.postReactions = postReactions;
    //       })
    //   );
    // });
  }
}

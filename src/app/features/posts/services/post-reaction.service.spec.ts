import { TestBed } from '@angular/core/testing';

import { PostReactionService } from './post-reaction.service';

describe('PostReactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostReactionService = TestBed.get(PostReactionService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommentReplyService } from './comment-reply.service';

describe('CommentReplyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentReplyService = TestBed.get(CommentReplyService);
    expect(service).toBeTruthy();
  });
});

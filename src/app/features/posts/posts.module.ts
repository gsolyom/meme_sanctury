import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './containers/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from './services/post.service';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NewPostComponent } from './containers/new-post/new-post.component';
import { ViewPostComponent } from './containers/view-post/view-post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsPreviewComponent } from './components/comments-preview/comments-preview.component';
import { CommentService } from './services/comment.service';
import { FullSizeImageDisplayComponent } from '../../shared/components/full-size-image-display/full-size-image-display.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostCardComponent,
    NewPostComponent,
    ViewPostComponent,
    CommentsComponent,
    CommentsPreviewComponent,
    FullSizeImageDisplayComponent,
    NewCommentComponent
  ],
  imports: [SharedModule, PostsRoutingModule],
  providers: [PostService, CommentService]
})
export class PostsModule {}

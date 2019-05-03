import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from './services/post.service';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentsPreviewComponent } from './components/comments-preview/comments-preview.component';
import { CommentService } from './services/comment.service';

@NgModule({
  declarations: [
    PostsComponent,
    PostCardComponent,
    NewPostComponent,
    ViewPostComponent,
    CommentsComponent,
    CommentsPreviewComponent
  ],
  imports: [SharedModule, PostsRoutingModule],
  providers: [PostService, CommentService]
})
export class PostsModule {}

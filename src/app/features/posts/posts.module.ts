import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from './services/post.service';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { ViewPostComponent } from './components/view-post/view-post.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostCardComponent,
    NewPostComponent,
    ViewPostComponent
  ],
  imports: [SharedModule, PostsRoutingModule],
  providers: [PostService]
})
export class PostsModule {}

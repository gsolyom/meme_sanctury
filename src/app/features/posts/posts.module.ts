import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    SharedModule,
    PostsRoutingModule
  ],
  providers:[
    PostService
  ]
})
export class PostsModule { }

import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostsComponent],
  imports: [
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }

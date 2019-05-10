import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './containers/posts/posts.component';
import { NewPostComponent } from './containers/new-post/new-post.component';
import { ViewPostComponent } from './containers/view-post/view-post.component';

const routes: Routes = [
  { path: 'new', component: NewPostComponent },
  { path: ':postId', component: ViewPostComponent },
  { path: '', component: PostsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}

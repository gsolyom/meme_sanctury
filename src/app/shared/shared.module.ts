import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule,
  MatExpansionModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { FileUploaderDirective } from './directives/file-uploader/file-uploader.directive';
import { OverflowClassDirective } from './directives/overflow-class/overflow-class.directive';
import { PostSearchComponent } from './components/post-search/post-search.component';

const MODULES = [
  CommonModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule,
  MatExpansionModule,
  FormsModule
];

@NgModule({
  declarations: [
    FileUploaderDirective,
    OverflowClassDirective,
    PostSearchComponent
  ],
  imports: MODULES,
  exports: [
    ...MODULES,
    FileUploaderDirective,
    OverflowClassDirective,
    PostSearchComponent
  ]
})
export class SharedModule {}

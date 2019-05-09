import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

import { FileUploaderDirective } from './directives/file-uploader/file-uploader.directive';
import { OverflowClassDirective } from './directives/overflow-class/overflow-class.directive';

const MODULES = [
  CommonModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatDividerModule,
  FormsModule
];

@NgModule({
  declarations: [FileUploaderDirective, OverflowClassDirective],
  imports: MODULES,
  exports: [...MODULES, FileUploaderDirective, OverflowClassDirective]
})
export class SharedModule {}

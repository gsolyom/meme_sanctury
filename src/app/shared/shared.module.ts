import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { FileUploaderDirective } from '../shared/components/file-uploader/file-uploader.component';

const MODULES = [
  CommonModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  FormsModule
];

@NgModule({
  declarations: [FileUploaderDirective],
  imports: MODULES,
  exports: [...MODULES, FileUploaderDirective]
})
export class SharedModule { }

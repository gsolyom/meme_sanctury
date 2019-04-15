import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { FileUploaderDirective } from '../shared/components/file-uploader/file-uploader.component';

const MODULES = [
  CommonModule,
  MatButtonModule,
  FormsModule,
  FileUploaderDirective
];

@NgModule({
  declarations: [FileUploaderDirective],
  imports: MODULES,
  exports: MODULES
})
export class SharedModule { }

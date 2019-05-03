import {
  EventEmitter,
  OnDestroy,
  forwardRef,
  Directive,
  HostListener,
  HostBinding
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'input[type=file][msctFileUploader]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploaderDirective),
      multi: true
    }
  ]
})
export class FileUploaderDirective implements OnDestroy, ControlValueAccessor {
  @HostBinding('attr.disabled')
  disabled = undefined;
  onChangeEmitter = new EventEmitter();
  onTouchedEmitter = new EventEmitter();

  @HostListener('change', ['$event'])
  onChange(event: any): void {
    const reader = new FileReader();

    reader.onload = _ => {
      this.onChangeEmitter.emit(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  @HostListener('blur', ['$event'])
  onTouched(): void {
    this.onTouchedEmitter.emit(true);
  }

  writeValue(obj: any): void {
    if (obj) {
      throw new Error('Input cannot be changed from outside.');
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeEmitter.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouchedEmitter.subscribe(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled ? true : undefined;
  }

  ngOnDestroy(): void {
    this.onChangeEmitter.complete();
    this.onTouchedEmitter.complete();
  }
}

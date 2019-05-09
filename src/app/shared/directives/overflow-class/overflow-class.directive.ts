import {
  Directive,
  Input,
  ElementRef,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { Subject, combineLatest } from 'rxjs';

@Directive({
  selector: '[msctOverflowClass]',
  exportAs: 'msctOverflowClass'
})
export class OverflowClassDirective implements AfterViewInit, OnDestroy {
  private msctOverflowClassSubject = new Subject<string>();
  private overflowSubject = new Subject<'width' | 'height'>();
  private thresholdSubject = new Subject<number>();
  private viewInitSubject = new Subject<boolean>();

  private classSubscription = combineLatest(
    this.msctOverflowClassSubject.asObservable(),
    this.overflowSubject.asObservable(),
    this.thresholdSubject.asObservable(),
    this.viewInitSubject.asObservable()
  ).subscribe(([classArg, overflow, threshold]) => {
    classArg = classArg.split(' ')[0];
    const condition =
      overflow === 'height' &&
      this.elementRef.nativeElement.offsetHeight > threshold;

    if (condition) {
      this.elementRef.nativeElement.classList.add(classArg);
    } else {
      this.elementRef.nativeElement.classList.remove(classArg);
    }
  });

  constructor(private readonly elementRef: ElementRef) {}

  @Input()
  set msctOverflowClass(val: string) {
    this.msctOverflowClassSubject.next(val);
  }

  @Input()
  set overflow(val: 'width' | 'height') {
    this.overflowSubject.next(val);
  }

  @Input()
  set threshold(val: number) {
    this.thresholdSubject.next(val);
  }

  ngAfterViewInit() {
    this.viewInitSubject.next(true);
  }

  ngOnDestroy() {
    this.classSubscription.unsubscribe();
    this.msctOverflowClassSubject.complete();
    this.overflowSubject.complete();
    this.thresholdSubject.complete();
    this.viewInitSubject.complete();
  }

  refresh() {
    this.viewInitSubject.next(true);
  }
}

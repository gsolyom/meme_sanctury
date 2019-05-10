import {
  animation,
  trigger,
  transition,
  animate,
  style,
  state
} from '@angular/animations';

export const fadeAnimation = trigger('Fade', [
  state(
    'fadeIn',
    style({
      opacity: 1
    })
  ),
  state(
    'void',
    style({
      opacity: 0
    })
  ),
  transition(':enter', [animate('0.25s')]),
  transition(':leave', [animate('0.15s')])
]);

export const flyInAnimation = trigger('FlyIn', [
  state(
    'appear',
    style({
      opacity: 1,
      transform: 'translateY(0)'
    })
  ),
  state(
    'void',
    style({
      opacity: 0,
      transform: 'translateY(-5%)'
    })
  ),
  transition('void => appear', [animate('0.25s ease-in')])
]);

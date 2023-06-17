import { Directive, HostBinding, Input } from '@angular/core';
import type { Properties } from 'csstype';
import { EmailComponent } from '../email.base';

@Directive({
  selector: 'body[ccEmailBody]',
  standalone: true,
})
export class BodyDirective extends EmailComponent {
  @HostBinding('style.wordSpacing')
  @Input()
  wordSpacing: Properties['wordSpacing'] = 'normal';
}

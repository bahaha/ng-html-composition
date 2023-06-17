import { Directive, HostBinding, Input } from '@angular/core';
import { EmailComponent } from '../email.base';

@Directive({
  selector: 'html[ccEmailHtml]',
  standalone: true,
})
export class HtmlDirective extends EmailComponent {
  DOCTYPE =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';

  @HostBinding('attr.lang')
  @Input()
  lang: HTMLElement['lang'] = 'en';
  @HostBinding('attr.dir')
  @Input()
  dir: HTMLElement['dir'] = 'ltr';

  override render(): string {
    return `${this.DOCTYPE}${super.render()}`;
  }
}

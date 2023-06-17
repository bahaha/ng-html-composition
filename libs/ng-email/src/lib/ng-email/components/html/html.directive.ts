import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  inject,
} from '@angular/core';
import { sanitize } from '../../utilities';

@Directive({
  selector: 'html[ccEmailHtml]',
  standalone: true,
})
export class HtmlDirective {
  DOCTYPE =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  elRef: ElementRef<HTMLElement> = inject(ElementRef);

  @HostBinding('attr.lang')
  @Input()
  lang: HTMLElement['lang'] = 'en';
  @HostBinding('attr.dir')
  @Input()
  dir: HTMLElement['dir'] = 'ltr';

  render(): string {
    return `${this.DOCTYPE}${sanitize(this.elRef.nativeElement.outerHTML)}`;
  }
}

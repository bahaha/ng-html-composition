import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EmailComponent } from '../email.component';

@Component({
  selector: 'cc-html',
  standalone: true,
  imports: [],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<html [attr.lang]="lang" [attr.dir]="dir">
    <ng-content></ng-content>
  </html>`,
})
export class HtmlComponent extends EmailComponent {
  DOCTYPE =
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
  @Input() lang: HTMLElement['lang'] = 'en';
  @Input() dir: HTMLElement['dir'] = 'ltr';

  override render(): string {
    return `${this.DOCTYPE}${super.render()}`;
  }
}

import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Properties } from 'csstype';
import { EmailComponent } from '../email.base';

@Component({
  selector: 'cc-email-column',
  standalone: true,
  imports: [NgStyle],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<td [ngStyle]="style"><ng-content></ng-content></td>`,
})
export class ColumnComponent extends EmailComponent {
  override isNgComponent = true;
  @Input() style: Properties = {};
}

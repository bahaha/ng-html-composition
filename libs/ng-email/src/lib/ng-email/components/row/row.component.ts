import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Properties } from 'csstype';
import { EmailComponent } from '../email.base';

@Component({
  selector: 'cc-email-row',
  standalone: true,
  imports: [NgStyle],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<table
    align="center"
    width="100%"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    [ngStyle]="style"
  >
    <tbody style="width: 100%">
      <tr style="width: 100%">
        <ng-content></ng-content>
      </tr>
    </tbody>
  </table>`,
})
export class RowComponent extends EmailComponent {
  override isNgComponent = true;
  @Input() style: Properties = {};
}

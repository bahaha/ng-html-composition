import { AsyncPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Properties } from 'csstype';
import { Observe } from 'ngx-propserve';
import { Observable, map } from 'rxjs';
import { EmailComponent } from '../email.base';

@Component({
  selector: 'cc-email-container',
  standalone: true,
  imports: [NgStyle, AsyncPipe],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<table
    align="center"
    width="100%"
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    border="0"
    [ngStyle]="style"
    [style.maxWidth]="containerWidth$ | async"
  >
    <tbody>
      <tr style="width: 100%">
        <td>
          <ng-content></ng-content>
        </td>
      </tr>
    </tbody>
  </table>`,
})
export class ContainerComponent extends EmailComponent {
  override isNgComponent = true;
  @Input() style: Properties = {};
  @Input() maxWidth: string | number = 600;
  @Observe('maxWidth') maxWidth$!: Observable<string | number>;
  containerWidth$: Observable<string> = this.maxWidth$.pipe(
    map((maxWidth) =>
      typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth
    )
  );
}

import { Spectator, createHostFactory } from '@ngneat/spectator/jest';
import { ColumnComponent } from '../column/column.component';
import { ContainerComponent } from '../container/container.component';
import { RowComponent } from './row.component';

describe('RowComponent', () => {
  let spectator: Spectator<RowComponent>;
  const createHost = createHostFactory({
    component: RowComponent,
    imports: [ContainerComponent, ColumnComponent],
  });
  const createContainerHost = createHostFactory({
    component: ContainerComponent,
    imports: [RowComponent, ColumnComponent],
  });

  describe('html hyderation', () => {
    test('table row as horizontal layout', () => {
      spectator = createHost('<cc-email-row></cc-email-row>');
      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0"><tbody style="width: 100%;"><tr style="width: 100%;"></tr></tbody></table>"`
      );
    });

    test('one column', () => {
      spectator = createHost(
        '<cc-email-row><cc-email-column>One Column</cc-email-column></cc-email-row>'
      );

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0"><tbody style="width: 100%;"><tr style="width: 100%;"><td>One Column</td></tr></tbody></table>"`
      );
    });

    test('n columns with gap', () => {
      const nCols = 2;
      const containerWidth = 640;
      const gap = 16;

      const col = {
        width: `${(containerWidth - gap) / 2}px`,
        maxWidth: `${100 / nCols}%`,
      };
      spectator = createContainerHost(
        `<cc-email-container [maxWidth]="${containerWidth}">
          <cc-email-row>
            <cc-email-column [style]="colOne">Two Column # 1</cc-email-column>
            <cc-email-column [style]="gap"></cc-email-column>
            <cc-email-column [style]="colTwo">Two Column # 2</cc-email-column>
          </cc-email-row>
        </cc-email-container>`,
        {
          hostProps: {
            colOne: { ...col, background: '#1989' },
            gap: { width: `${gap}px` },
            colTwo: { ...col, background: '#bad5' },
          },
        }
      );

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 640px;"><tbody><tr style="width: 100%;"><td><table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0"><tbody style="width: 100%;"><tr style="width: 100%;"><cc-email-column><td style="width: 312px; max-width: 50%; background: rgba(17, 153, 136, 0.6);">Two Column # 1</td><td style="width: 16px;"></td><td style="width: 312px; max-width: 50%; background: rgba(187, 170, 221, 0.333);">Two Column # 2</td></tr></tbody></table></cc-email-row></td></tr></tbody></table>"`
      );
    });
  });
});

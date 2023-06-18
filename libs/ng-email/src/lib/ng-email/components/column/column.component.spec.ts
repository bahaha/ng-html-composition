import {
  Spectator,
  createComponentFactory,
  createHostFactory,
} from '@ngneat/spectator/jest';
import { ColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let spectator: Spectator<ColumnComponent>;
  const createComponent = createComponentFactory(ColumnComponent);
  const createHost = createHostFactory(ColumnComponent);

  describe('html hyderation', () => {
    test('td as column for vertial layout', () => {
      spectator = createComponent();
      expect(spectator.component.render()).toMatchInlineSnapshot(`"<td></td>"`);
    });

    test('use custom style from style input prop', () => {
      spectator = createComponent({
        props: { style: { backgroundColor: '#1993' } },
      });

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<td style="background-color: rgba(17, 153, 153, 0.2);"></td>"`
      );
    });

    test('render children', () => {
      spectator = createHost('<cc-email-column>hello</cc-email-column>');
      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<td>hello</td>"`
      );
    });
  });
});

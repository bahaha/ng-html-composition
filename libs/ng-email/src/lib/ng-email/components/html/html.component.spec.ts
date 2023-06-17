import {
  Spectator,
  createComponentFactory,
  createHostFactory,
} from '@ngneat/spectator/jest';
import { HtmlComponent } from './html.component';

describe('<cc-html>', () => {
  let spectator: Spectator<HtmlComponent>;
  const createComponent = createComponentFactory(HtmlComponent);
  const createHost = createHostFactory(HtmlComponent);

  describe('html hydryation', () => {
    it('renders with DOCTYPE', () => {
      spectator = createComponent();
      const output = spectator.component.render();
      expect(output).toEqual(
        expect.stringContaining(
          `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`
        )
      );
    });

    it('render html element with default attributes', () => {
      spectator = createComponent();
      const output = spectator.component.render();
      expect(output).toEqual(
        expect.stringContaining(`<html lang="en" dir="ltr"></html>`)
      );
    });

    it('render html element with custom attributes', () => {
      spectator = createComponent({ props: { lang: 'zh-TW', dir: 'rtl' } });
      const output = spectator.component.render();
      expect(output).toEqual(
        expect.stringContaining(`<html lang="zh-TW" dir="rtl"></html>`)
      );
    });

    it('render html and its children', () => {
      spectator = createHost('<cc-html><head></head><body></body></cc-html>');
      const output = spectator.component.render();
      expect(output).toEqual(
        expect.stringContaining(
          `<html lang="en" dir="ltr"><head></head><body></body></html>`
        )
      );
    });
  });
});

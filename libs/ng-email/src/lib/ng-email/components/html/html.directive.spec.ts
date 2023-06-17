import {
  SpectatorDirective,
  createDirectiveFactory,
} from '@ngneat/spectator/jest';
import { HtmlDirective } from './html.directive';

describe('HtmlDirective', () => {
  let spectator: SpectatorDirective<HtmlDirective>;
  const createDirective = createDirectiveFactory(HtmlDirective);

  describe('html hyderation', () => {
    const DOCTYPE = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`;

    test('should contain DOCTYPE', () => {
      spectator = createDirective(`<html ccEmailHtml></html>`);
      expect(spectator.directive.render()).toEqual(
        expect.stringContaining(DOCTYPE)
      );
    });

    test('should render with default html attributes', () => {
      spectator = createDirective(`<html ccEmailHtml></html>`);
      expect(spectator.directive.render()).toEqual(
        expect.stringContaining(`${DOCTYPE}<html lang="en" dir="ltr"></html>`)
      );
    });
  });
});

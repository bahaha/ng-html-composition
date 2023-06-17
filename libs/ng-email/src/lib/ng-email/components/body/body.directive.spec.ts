import {
  SpectatorDirective,
  createDirectiveFactory,
} from '@ngneat/spectator/jest';
import { BodyDirective } from './body.directive';

describe('BodyDirective', () => {
  let spectator: SpectatorDirective<BodyDirective>;
  const createDirective = createDirectiveFactory(BodyDirective);

  describe('html hyderation', () => {
    test('should render with default html attributes', () => {
      spectator = createDirective(`<body ccEmailBody></body>`);
      expect(spectator.directive.render()).toEqual(
        expect.stringContaining(`<body style="word-spacing: normal;"></body>`)
      );
    });
  });
});

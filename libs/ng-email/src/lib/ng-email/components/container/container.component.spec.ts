import { Spectator, createHostFactory } from '@ngneat/spectator/jest';
import { ButtonComponent } from '../button/button.component';
import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let spectator: Spectator<ContainerComponent>;
  const createHost = createHostFactory({
    component: ContainerComponent,
    imports: [ButtonComponent],
  });

  describe('html hyderation', () => {
    test('use table as container to center the content', () => {
      spectator = createHost(
        `<cc-email-container>
          <cc-email-button href="https://google.com">Check it out</cc-email-button>
        </cc-email-container>`
      );

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<table align="center" width="100%" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px;"><tbody><tr style="width: 100%;"><td><a href="https://google.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 0px 0px 0px 0px;"><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0pt" hidden>&nbsp;</i><![endif]--></span><span style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 0pt;">Check it out</span><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td></tr></tbody></table>"`
      );
    });
  });
});

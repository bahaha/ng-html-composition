import {
  Spectator,
  createComponentFactory,
  createHostFactory,
} from '@ngneat/spectator/jest';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  const createComponent = createComponentFactory(ButtonComponent);
  const createHost = createHostFactory(ButtonComponent);

  describe('html hyderation', () => {
    test('should render with default style for email client', () => {
      spectator = createComponent({ props: { href: 'https://google.com' } });
      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<a href="https://google.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 0px 0px 0px 0px;"><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0pt" hidden>&nbsp;</i><![endif]--></span><span style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 0pt;"></span><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>"`
      );
    });

    test('should render with custom style', () => {
      spectator = createComponent({
        props: {
          href: 'https://google.com',
          style: {
            background: '#1989',
            color: '#ccc',
            borderRadius: '5px',
            border: '1px solid #6ed3',
          },
          paddingLeft: 32,
          paddingRight: 32,
          paddingTop: 8,
          paddingBottom: 8,
        },
      });

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<a href="https://google.com" target="_blank" style="background: rgba(17, 153, 136, 0.6); color: rgb(204, 204, 204); border-radius: 5px; border: 1px solid #6ed3; line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 8px 32px 8px 32px;"><span><!--[if mso]><i style="letter-spacing: 32px;mso-font-width:-100%;mso-text-raise:12pt" hidden>&nbsp;</i><![endif]--></span><span style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 6pt;"></span><span><!--[if mso]><i style="letter-spacing: 32px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>"`
      );
    });

    test('should use px as paddingLeft and paddingRight', () => {
      spectator = createComponent({
        props: { href: 'https://google.com', paddingX: 32 },
      });

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<a href="https://google.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 0px 32px 0px 32px;"><span><!--[if mso]><i style="letter-spacing: 32px;mso-font-width:-100%;mso-text-raise:0pt" hidden>&nbsp;</i><![endif]--></span><span style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 0pt;"></span><span><!--[if mso]><i style="letter-spacing: 32px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>"`
      );
    });

    test('should use py as paddingTop and paddingBottom', () => {
      spectator = createComponent({
        props: { href: 'https://google.com', paddingY: 32 },
      });

      expect(spectator.component.render()).toMatchInlineSnapshot(
        `"<a href="https://google.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 32px 0px 32px 0px;"><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:48pt" hidden>&nbsp;</i><![endif]--></span><span style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 24pt;"></span><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>"`
      );
    });
  });

  test('should render the text', () => {
    const spectator = createHost(
      `<cc-email-button href="https://google.com">Redeem Coupon</cc-email-button>`
    );
    expect(spectator.component.render()).toMatchInlineSnapshot(
      `"<a href="https://google.com" target="_blank" style="line-height: 100%; text-decoration: none; display: inline-block; max-width: 100%; padding: 0px 0px 0px 0px;"><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%;mso-text-raise:0pt" hidden>&nbsp;</i><![endif]--></span><span style="max-width: 100%; display: inline-block; line-height: 120%; mso-padding-alt: 0px; mso-text-raise: 0pt;">Redeem Coupon</span><span><!--[if mso]><i style="letter-spacing: 0px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>"`
    );
  });
});

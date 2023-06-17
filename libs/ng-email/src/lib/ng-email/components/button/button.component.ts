import { AsyncPipe, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import type { Properties } from 'csstype';
import type { Properties as MsoProperties } from 'msotype';
import { Observe } from 'ngx-propserve';
import { Observable, combineLatest, map } from 'rxjs';
import { addMsoStyles, pxToPt } from '../../utilities';
import { EmailComponent } from '../email.base';

const avg = map<[number, number], number>(([x, y]) => (x + y) / 2);

@UntilDestroy()
@Component({
  selector: 'cc-email-button',
  standalone: true,
  imports: [NgStyle, AsyncPipe],
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<a
    [href]="href"
    [target]="target"
    [ngStyle]="buttonStyle$ | async"
  >
    <span [innerHTML]="msoPrefix$ | async"></span>
    <span #buttonTextEl [ngStyle]="buttonTextStyle">
      <ng-content></ng-content>
    </span>
    <span [innerHTML]="msoSuffix$ | async"></span>
  </a>`,
})
export class ButtonComponent
  extends EmailComponent<HTMLAnchorElement>
  implements AfterViewInit, Partial<Omit<HTMLAnchorElement, 'style'>>
{
  override isNgComponent = true;
  sanitizer = inject(DomSanitizer);

  @Input() href?: HTMLAnchorElement['href'];
  @Input() target: HTMLAnchorElement['target'] = '_blank';
  @Input() style: Properties = {};

  @Input() paddingLeft = 0;
  @Observe('paddingLeft') pl$!: Observable<number>;
  @Input() paddingRight = 0;
  @Observe('paddingRight') pr$!: Observable<number>;
  @Input() paddingTop = 0;
  @Observe('paddingTop') pt$!: Observable<number>;
  @Input() paddingBottom = 0;
  @Observe('paddingBottom') pb$!: Observable<number>;

  @Input() set paddingX(value: number) {
    this.paddingLeft = value;
    this.paddingRight = value;
  }

  @Input() set paddingY(value: number) {
    this.paddingTop = value;
    this.paddingBottom = value;
  }

  @ViewChild('buttonTextEl') buttonTextEl!: ElementRef<HTMLSpanElement>;

  px$ = combineLatest([this.pl$, this.pr$]);
  py$ = combineLatest([this.pt$, this.pb$]);
  buttonStyle$: Observable<Properties> = combineLatest([
    this.px$,
    this.py$,
  ]).pipe(
    map(
      ([[left, right], [top, bottom]]) =>
        ({
          ...this.style,
          lineHeight: '100%',
          textDecoration: 'none',
          display: 'inline-block',
          maxWidth: '100%',
          padding: `${top}px ${right}px ${bottom}px ${left}px`,
        } as Properties)
    )
  );

  buttonTextStyle: Properties = {
    maxWidth: '100%',
    display: 'inline-block',
    lineHeight: '120%',
  };

  msoPrefix$: Observable<SafeHtml> = combineLatest([
    this.px$.pipe(avg),
    this.py$,
  ]).pipe(
    map(([px, [top, bottom]]) => {
      const textRaise = pxToPt((top + bottom).toString());
      return `<!--[if mso]><i style="letter-spacing: ${px}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`;
    }),
    map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
    untilDestroyed(this)
  );

  msoSuffix$: Observable<SafeHtml> = this.px$.pipe(
    avg,
    map(
      (px) =>
        `<!--[if mso]><i style="letter-spacing: ${px}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
    ),
    map((html) => this.sanitizer.bypassSecurityTrustHtml(html)),
    untilDestroyed(this)
  );

  ngAfterViewInit() {
    const msoButtonText = (py: number): MsoProperties => ({
      msoPaddingAlt: '0px',
      msoTextRaise: pxToPt(py.toString()),
    });

    this.py$
      .pipe(avg, map(msoButtonText), untilDestroyed(this))
      .subscribe(addMsoStyles(this.buttonTextEl.nativeElement));
  }
}

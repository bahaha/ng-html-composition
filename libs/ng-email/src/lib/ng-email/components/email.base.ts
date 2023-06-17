import { ElementRef, inject } from '@angular/core';
import { sanitize } from '../utilities';

export class EmailComponent<T extends HTMLElement = HTMLElement> {
  elRef: ElementRef<T> = inject(ElementRef);

  render(): string {
    return sanitize(this.elRef.nativeElement.outerHTML);
  }
}

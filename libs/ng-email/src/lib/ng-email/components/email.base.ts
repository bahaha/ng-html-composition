import { ElementRef, inject } from '@angular/core';
import { sanitize } from '../utilities';

export class EmailComponent<T extends HTMLElement = HTMLElement> {
  elRef: ElementRef<T> = inject(ElementRef);
  isNgComponent = false;

  render(): string {
    return sanitize(
      this.isNgComponent
        ? this.elRef.nativeElement.innerHTML
        : this.elRef.nativeElement.outerHTML
    );
  }
}

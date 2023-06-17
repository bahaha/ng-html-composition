import { Component, ElementRef, Renderer2, inject } from '@angular/core';

@Component({ template: '' })
export class EmailComponent {
  renderer = inject(Renderer2);
  elRef = inject(ElementRef);

  render(): string {
    return this.elRef.nativeElement.innerHTML;
  }
}

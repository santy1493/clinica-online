import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.scale(1.05)
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.scale(1)
  }

}

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    //this.el.nativeElement.style.backgroundColor = '#C6C2C1';
    this.el.nativeElement.classList.add('table-active');
  }

  @HostListener('mouseleave') onMouseLeave() {
    //this.el.nativeElement.style.backgroundColor = '#FFFFFF';
    this.el.nativeElement.classList.remove('table-active');
  }

}

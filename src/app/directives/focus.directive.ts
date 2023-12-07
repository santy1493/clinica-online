import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {

  constructor(private el: ElementRef) { }

  @HostListener('focus') onMouseEnter() {
    //this.el.nativeElement.style.backgroundColor = '#C6C2C1';
    this.el.nativeElement.classList.add('w-75');
  }

  @HostListener('focusout') onMouseLeave() {
    //this.el.nativeElement.style.backgroundColor = '#FFFFFF';
    this.el.nativeElement.classList.remove('w-75');
  }

}
//border border-success
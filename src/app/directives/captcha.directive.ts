import { Directive, OnInit, HostListener, ElementRef, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective {

  @Input() mostrar: boolean;
  @Output() captchaEvent = new EventEmitter<boolean>();

  @HostListener('resolved') onResolved(event: any) {
    this.captchaEvent.emit(this.captchaResuelto()); 
    //console.log('captcha resolved ', this.captchaResuelto());
  }

  @HostListener('change') onClick(event: any) { 
    console.log(this.mostrar);
    /*if(this.mostrar) {
      document.getElementById('captchaContainer').style.display = 'initial';
    }
    else if(!this.mostrar) {
      document.getElementById('captchaContainer').style.display = 'none';
    }*/
  }


  captchaResuelto(): boolean {
    if(grecaptcha.getResponse() == '') {
      return false;
    }
    
    return true;
  }
  

}

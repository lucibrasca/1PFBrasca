import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCabecera]'
})
export class CabeceraDirective implements OnChanges {

  @Input()
  appCabecera= '';

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}


  ngOnChanges(changes: SimpleChanges): void {
    this.establecerTamanioLetraCabecera();
  }

  

  establecerTamanioLetraCabecera() : void{
    this.renderer2.setStyle(this.elementRef.nativeElement, 'font-size',this.appCabecera);
  }
}


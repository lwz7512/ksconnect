import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
  selector: '[responsible]'
})
export class ResponsibleItem {

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('touchstart') onMouseEnter() {
    this.highlight('#F5F5F5');
  }
  @HostListener('touchend') onMouseLeave() {
    this.highlight('#FFFFFF');
  }

  private highlight(color: string) {
    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
  }

}

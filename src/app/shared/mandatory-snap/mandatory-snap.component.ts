import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mandatory-snap',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './mandatory-snap.component.html',
  styleUrl: './mandatory-snap.component.css'
})
export class MandatorySnapComponent {
  @ViewChild('div') miElemento1: ElementRef | undefined;
  isVisible: boolean = false

  ngAfterViewInit() {
    // Aquí puedes acceder al elemento después de que se hayan inicializado las vistas
    if (typeof IntersectionObserver !== 'undefined') {
      this.verificarVisibilidad();
    }
  }

  verificarVisibilidad() {
    const options = {
      root: null, // Use el viewport como área de observación
      rootMargin: '0px', // Sin margen adicional
      threshold: 0.5 // Umbral de visibilidad: 0.5 significa que se activará cuando al menos el 50% del elemento sea visible
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true
        } else {
          setTimeout(() => {
            this.isVisible = false
          }, 400)
        }
      });
    }, options);

    if (this.miElemento1 && observer) {
      observer.observe(this.miElemento1.nativeElement)
    }
  }
}

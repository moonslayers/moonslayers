import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('div1') miElemento1: ElementRef | undefined;
  @ViewChild('div2') miElemento2: ElementRef | undefined;
  @ViewChild('div3') miElemento3: ElementRef | undefined;
  slide_animation: string = 'animate__bounceInUp'
  tab: number = 0
  animation: boolean = false
  elements: any[] = [
    {
      isVisible: false,
    },
    {
      isVisible: false
    },
    {
      isVisible: false
    },
  ]

  ngAfterViewInit() {
    // Aquí puedes acceder al elemento después de que se hayan inicializado las vistas
    if (typeof IntersectionObserver !== 'undefined') {
      this.verificarVisibilidad();
    } else {
      console.warn('IntersectionObserver no es compatible con este navegador.');
    }
  }

  verificarVisibilidad() {
    const options = {
      root: null, // Use el viewport como área de observación
      rootMargin: '0px', // Sin margen adicional
      threshold: 0.5 // Umbral de visibilidad: 0.5 significa que se activará cuando al menos el 50% del elemento sea visible
    };


    if (this.elements[0]) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.elements[0].isVisible = true
            setTimeout(() => {
              this.elements[0].isVisible = false
            }, 800)
          } else {
          }
        });
      }, options);

      if (this.miElemento1 && observer) {
        console.log(this.miElemento1)
        observer.observe(this.miElemento1.nativeElement);
      }
    }
    if (this.elements[1]) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.elements[1].isVisible = true
            setTimeout(() => {
              this.elements[1].isVisible = false
            }, 800)
          } else {
          }
        });
      }, options);

      if (this.miElemento2) {
        observer.observe(this.miElemento2.nativeElement);
      }
    }
    if (this.elements[2]) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.elements[2].isVisible = true
            setTimeout(() => {
              this.elements[2].isVisible = false
            }, 800)
          } else {
          }
        });
      }, options);

      if (this.miElemento3 && observer) {
        observer.observe(this.miElemento3.nativeElement);
      }
    }
  }
}

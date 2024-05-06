import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild, ViewChildren } from '@angular/core';
import { MandatorySnapComponent } from '../shared/mandatory-snap/mandatory-snap.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MandatorySnapComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('div1') miElemento1: ElementRef | undefined;
  @ViewChild('div2') miElemento2: ElementRef | undefined;
  @ViewChild('div3') miElemento3: ElementRef | undefined;
  @ViewChild('div4') miElemento4: ElementRef | undefined;
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
          } else {
            setTimeout(() => {
              this.elements[0].isVisible = false
            }, 400)
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
          } else {
            setTimeout(() => {
              this.elements[1].isVisible = false
            }, 400)
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
          } else {
            setTimeout(() => {
              this.elements[2].isVisible = false
            }, 400)
          }
        });
      }, options);

      if (this.miElemento3 && observer) {
        observer.observe(this.miElemento3.nativeElement);
      }
    }
    if (this.elements[3]) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.elements[3].isVisible = true
          } else {
            setTimeout(() => {
              this.elements[3].isVisible = false
            }, 400)
          }
        });
      }, options);

      if (this.miElemento4 && observer) {
        observer.observe(this.miElemento4.nativeElement);
      }
    }
  }
}

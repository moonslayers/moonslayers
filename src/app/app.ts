import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UiColorTest } from "./shared/ui-color-test/ui-color-test";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [UiColorTest]
})
export class App implements OnInit {

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const aplicarTema = (e: MediaQueryListEvent | MediaQueryList) => {
      const tema = e.matches ? 'dark' : 'light';
      this.renderer.setAttribute(this.document.documentElement, 'data-bs-theme', tema);
    };

    aplicarTema(mediaQuery);

    mediaQuery.addEventListener('change', aplicarTema);
  }
}
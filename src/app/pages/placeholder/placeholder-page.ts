import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder-page',
  templateUrl: './placeholder-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaceholderPage {
  private route = inject(ActivatedRoute);
  protected label = this.route.snapshot.data['label'] ?? 'Sección';
}

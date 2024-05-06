import { Component } from '@angular/core';
import { MandatorySnapComponent } from '../shared/mandatory-snap/mandatory-snap.component';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [
    MandatorySnapComponent,
  ],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent {

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jorge:string=''

  animation_jorge(){
    console.log("Mouse dentro")
    this.jorge='animate_animated animate__lightSpeedInRight'
    setTimeout(()=>{
      this.jorge=''
    },1000)
  }
}

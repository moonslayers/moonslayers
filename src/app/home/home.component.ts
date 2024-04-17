import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

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
  slide_animation:string='animate__bounceInUp'
  tab:number=0
  animation:boolean=false

  private lastScrollTop = 0;

  down(){
    console.log(event)
    if(!this.animation){
      this.animation=true
      this.slide_animation='animate__bounceOutUp'
      setTimeout(()=>{
        this.tab++
        if(this.tab>2){
          this.tab=0
        }
        this.animation=false
        this.slide_animation='animate__bounceInUp'
      },800)
    }
  }

  up(){
    if(!this.animation){
      this.animation=true
      this.slide_animation='animate__bounceOutDown'
      setTimeout(()=>{
        this.tab--
        if(this.tab<0){
          this.tab=2
        }
        this.animation=false
        this.slide_animation='animate__bounceInDown'
      },800)
    }
  }
}

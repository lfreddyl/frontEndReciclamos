import { Component, HostListener, ElementRef} from '@angular/core';
import {trigger,style,transition,animate,state} from '@angular/animations'
import {
  faChevronCircleUp,
  faRecycle,
  faSms,
  faBell,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
  animations:[
    trigger('scrollAnimation',[
      state('scrolled',style({
        transform:'translateX(0)',
        opacity:1
      })),
      state('normal', style({
        transform:'translateX(-150%)',
        opacity:1
      })),
      transition('scrolled => normal', animate('1s')),
      transition('normal => scrolled', animate('1s'))
    ]),
    trigger('scrollAnimationdos',[
      state('scrolled',style({
        transform:'translateX(0)',
        opacity:1
      })),
      state('normal', style({
        transform:'translateX(-100%)',
        opacity:0
      })),
      transition('scrolled => normal', animate(1500)),
      transition('normal => scrolled', animate(1500))
    ])
  ]
  
})
export class PresentationComponent  {
  faChevronCircleUp=faChevronCircleUp
  faRecycle=faRecycle
  faSms=faSms
  faUsers=faUsers
  faBell=faBell

  state = 'normal'
  constructor(public el: ElementRef) { }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= componentPosition) {
      this.state = 'scrolled'
    } else {
      this.state = 'normal'
    }

  }
  ngOnInit(): void {
  }

}

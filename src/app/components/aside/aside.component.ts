import { Component, OnInit } from '@angular/core';
import { faHashtag,faHome,faRecycle,faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  
  faHashtag = faHashtag
  faHome = faHome
  faRecycle = faRecycle
  faUsers =faUsers

  constructor() { }

  ngOnInit(): void {
  }

}

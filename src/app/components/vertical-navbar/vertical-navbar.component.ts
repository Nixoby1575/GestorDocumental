import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit {
  
  isMenuExpanded: boolean = false;

  toggleMenu(): void {
    this.isMenuExpanded = !this.isMenuExpanded;
  }


  isMenuVisible: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;
        this.isMenuVisible = !(currentRoute === '/' || currentRoute === '/login' || currentRoute === '/register');
      }
    });
  }
  
}

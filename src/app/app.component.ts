import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
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

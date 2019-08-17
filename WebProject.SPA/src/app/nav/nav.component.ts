import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
declare let alertify: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertifyService: AlertifyService) {

  }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(next => {
      this.alertifyService.success('zalogowales sie do aplikacji');
      console.log('zalogowales sie do aplikacji');
    }, error => {
      this.alertifyService.error('wystapil blad logowania');
      console.log('wystapil blad logowania');
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('Zostałeś wylogowany');
    console.log('Zostałes wylogowany');
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
declare let alertify: any;



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('rejestracja udana');
      console.log('rejestracja udana');
    }, error => {
      this.alertifyService.error('wystąpił błąd rejestracji');
      console.log(error);
    });
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Anulowane');
  }

}

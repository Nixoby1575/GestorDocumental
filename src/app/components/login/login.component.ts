import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('',[Validators.required, Validators.email]);
  getErrorMessage() {




    //validación correo
    if (this.email.hasError('required')) {
      return 'Ingrese un Correo'
    }
    return this.email.hasError('email') ? 'Correo no válido' : '';
  }
}

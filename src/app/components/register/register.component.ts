import { Component, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {

  RegistrarUsuario: FormGroup;

  constructor(private renderer: Renderer2, private fb:FormBuilder, private afAuth: AngularFireAuth, private toastr: ToastrService) {

      this.RegistrarUsuario = this.fb.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        repeatpassword: ['', Validators.required],
        cel: ['', Validators.required]
      })

     this.bodyElement = null!;
   }
   registrar() {
    const name = this.RegistrarUsuario.value.name;
    const lastname = this.RegistrarUsuario.value.lastname;
    const email = this.RegistrarUsuario.value.email;
    const password = this.RegistrarUsuario.value.password;
    const repeatpassword = this.RegistrarUsuario.value.repeatpassword;
    const cel = this.RegistrarUsuario.value.cel;

    this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      console.log(user);
    }).catch((error) => {
      console.log(error);
      this.toastr.error(this.firebaseError(error.code), 'Error');
    })
  }

  firebaseError(code: string){

    switch(code) {
      case 'auth/email-already-in-use':
        return 'El usuario ya existe';
        case 'auth/weak-password':
        return 'La contraseña es muy debil';
        default:
        return 'Error desconocido'
    }

  }

   getErrorMessage(field: string) {
    const control = this.RegistrarUsuario.get(field);
    if (control?.hasError('required')) {
      return 'Ingrese un valor';
    }
    return control?.hasError('email') ? 'Correo no válido' : '';
  }



  @ViewChild('bodyElement', { static: false }) bodyElement: ElementRef;

  
  ngAfterViewInit() {
    // Aquí puedes llamar a la función para ajustar la altura después de que la vista se haya inicializado
    this.adjustBodyHeight();
  }

  adjustBodyHeight() {
    const bodyElementHeight = this.bodyElement.nativeElement.scrollHeight;
    this.renderer.setStyle(this.bodyElement.nativeElement, 'height', `${bodyElementHeight}px`);
  }


//correo



//contraseña
hidepss = true;




}
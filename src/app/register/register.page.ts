import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  errorFire:string;
  constructor(private authFire:AngularFireAuth,private route:Router) { }

  ngOnInit() {
  }

  usuario = new Usuario();

  async registrarDo(usuario:Usuario){
    try {

      if(usuario.email != undefined && usuario.password != undefined){  
        var result = await this.authFire.auth.createUserWithEmailAndPassword(usuario.email,usuario.password);
      }else{
        this.errorFire = "Se debe ingresar el mail y el password";
      }  

      if(result){
        this.route.navigate(['home']);  
      }

      
    } catch (error) {
      this.errorFire = error.message; 
    }
  }

  backLogin(){
    this.route.navigate(['login']);
  }

}

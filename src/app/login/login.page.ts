import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorFire:string;

  constructor(private authFire:AngularFireAuth,private route:Router) { }
  ngOnInit() {
  }

  usuario = new Usuario();
  
  async Login(usuario:Usuario){
    try {
      if(usuario.email != undefined && usuario.password != undefined){
        var result = await this.authFire.auth.signInWithEmailAndPassword(usuario.email,usuario.password);
      }else{
        this.errorFire = "Se debe ingresar el mail y el password";   
      }
          
      if(result){
        this.route.navigate(['home']);  
      }
        
    } catch (error) {
     this.errorFire =  error.message;
    }
  }

  Register(){
    this.route.navigate(['register']);
  }

}

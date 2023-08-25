import { Injectable } from '@angular/core';
import { LoginData } from './models';
import { Observable, map } from 'rxjs';
import { User } from '../dashboard/pages/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient, private store: Store) { }


  login(data: LoginData):void{
   
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params:{
        email: data.email || '',
        contrasenia:  data.contrasenia || ''
      }
    }).subscribe({
      next:(users)=>{
        if (users.length)
        {
          this.store.dispatch(AuthActions.setAuthUser({ data: users[0] }));

          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', users[0].token);
        }
        else{
          this.store.dispatch(AuthActions.setAuthUser({ data: null }));
          this.notifier.showError('Email o contraseña inválida');  

        }
      },
      error :()=>this.notifier.showError('Ocurrió un error inesperado')
    });

}

isAuthenticated(): Observable<boolean> {

return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
  params: {
    token: localStorage['token'] ? localStorage['token']:''
  }
}).pipe(
  map((users) => {

    if (users.length)
    {
      this.store.dispatch(AuthActions.setAuthUser({ data: users[0] }));
    }
    return (users.length) ? true : false; 
  })
)
}

logout(): void
{
  this.store.dispatch(AuthActions.setAuthUser({ data: null }));
}
}

import { Injectable } from '@angular/core';
import { LoginData } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../dashboard/pages/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private _authUser$ = new BehaviorSubject<User|null>(null);
public authUser$ = this._authUser$.asObservable();

  constructor(private notifier: NotifierService, private router: Router, private httpClient: HttpClient) { }


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
          this._authUser$.next(users[0]);
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', users[0].token);
        }
        else{
          this._authUser$.next(null);
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
    return (users.length) ? true : false; 
  })
)
}


}

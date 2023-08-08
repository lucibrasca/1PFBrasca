import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './users/models';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users$ = new BehaviorSubject<User[]>([]);


  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>
  {
    return this._users$.asObservable();
  }

  loadUsers(): void 
  {
    this.httpClient.get<User[]>('http://localhost:3000/users').subscribe({
      next:(response)=>{ 
        this._users$.next(response);
      },
    error: () => {
      this.notifier.showError('Ocurrió un error al cargar los usuarios');
    }
    })
  }

  createUser(user: CreateUserData): void
  {
    this.httpClient.post<User>('http://localhost:3000/users',user).subscribe({
      next: () =>{this.loadUsers() }
    })

  }

  updateUserById(id: number, userActualizado: UpdateUserData): void
  {
    this.httpClient.put('http://localhost:3000/users/'+id, userActualizado).subscribe({
      next: ()=>{ this.loadUsers()}
    });
  }

  deleteUserId(id:number): void
  {
    this.httpClient.delete('http://localhost:3000/users/'+id).subscribe({
      next: () => { this.loadUsers()}
    });
  }



}

import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { environment } from 'src/environments/environment';
import { generateRandomString } from 'src/app/shared/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _users$ = new BehaviorSubject<User[]>([]);

  public users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>
  {
    return this._users$.asObservable();
  }

  getUserById(id: number): Observable<User | undefined>
  {
    return this.users$.pipe(
      map((users) => users.find((u) => u.id === id) ),
      take(1)
      );
  }

  loadUsers(): void 
  {
    this.httpClient.get<User[]>(environment.baseApiUrl + '/users').subscribe({
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
    const token = generateRandomString(15);

    this.httpClient.post<User>(environment.baseApiUrl + '/users',{...user, token}).subscribe({
      next: () =>{this.loadUsers() }
    })

  }

  updateUserById(id: number, userActualizado: UpdateUserData): void
  {
    this.httpClient.put(environment.baseApiUrl + '/users/'+id, userActualizado).subscribe({
      next: ()=>{ this.loadUsers()}
    });
  }

  deleteUserId(id:number): void
  {
    this.httpClient.delete(environment.baseApiUrl + '/users/'+id).subscribe({
      next: () => { this.loadUsers()}
    });
  }



}

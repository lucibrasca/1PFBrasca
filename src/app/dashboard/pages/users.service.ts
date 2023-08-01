import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './users/models';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users$ = new BehaviorSubject<User[]>([]);

  constructor() { }

  getUsers(): Observable<User[]>
  {
    return this.users$.asObservable();
  }

  loadUsers(): void 
  {
    this.users$.next([
      {
        id: 1,
        nombre: 'Clara',
        apellido: 'Robledo',
        email: 'crobledo@gmail.com',
        contrasenia: '12345678',
      },
      {
        id: 2,
        nombre: 'Matias',
        apellido: 'Carrizo',
        email: 'mcarrizo@gmail.com',
        contrasenia: '87654321',
      },
      {
        id: 3,
        nombre: 'Sergio',
        apellido: 'Trotta',
        email: 'strotta@hotmail.com',
        contrasenia: '67805432',
      },

    ])
  }

  createUser(user: CreateUserData): void
  {
    this.users$.pipe(take(1)).subscribe({
      next:(arrayActual) => {
        this.users$.next([...arrayActual,
          {...user, id: arrayActual.length+1}]
        
        );
      }
    });

  }

  updateUserById(id: number, userActualizado: UpdateUserData): void
  {
    this.users$.pipe(take(1)).subscribe({
      next:(arrayActual)=> {
        this.users$.next(
          arrayActual.map((u) => u.id === id ? {...u, ...userActualizado} : u)
        );
      }
    });
  }

  deleteUserId(id:number): void
  {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => this.users$.next(arrayActual.filter((u) => u.id !== id))
    }
    );
  }



}

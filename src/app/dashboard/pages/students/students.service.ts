import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';

const STUDENT_DB: Observable<Student[]>= of([
  {
    id: 1,
    nombre: 'Benicio',
    apellido: 'Lopez',
    email: 'blopez@gmail.com',
    contrasenia: '12345678',
    telefono: '0342-15567889',
    documento: 37890987
    
  },
  {
    id: 2,
    nombre: 'Isabella',
    apellido: 'Almada',
    email: 'ialmada@gmail.com',
    contrasenia: '87654321',
    telefono: '0342-15680964',
    documento: 25890752
   
  },
  {
    id: 3,
    nombre: 'Walter',
    apellido: 'Milessi',
    email: 'wmilessi@hotmail.com',
    contrasenia: '67805432',
    telefono: '0342-154443327',
    documento: 34896543
  
  },
]).pipe(delay(1000));



@Injectable({
  providedIn: 'root'
})

export class StudentsService {

private _students$ = new BehaviorSubject<Student[]>([]);
private students$ = this._students$.asObservable();
  

  constructor() { }

  loadStudent()
  {
    STUDENT_DB.subscribe({
      next: (studentFromDB) =>  this._students$.next(studentFromDB)
    });
  }


  getStudents(): Subject<Student[]>
  {
    return this._students$;
  }

  getStudentById(id: number): Observable<Student | undefined>
  {
    return this.students$.pipe(
      map((students) => students.find((s) => s.id === id) ),
      take(1)
      );
  }
  
  createStudent(student: CreateStudentData): void
  {
    this._students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {this._students$.next([...arrayActual,{...student, id: arrayActual.length+1}])}
    })
  }

  updateStudentById(id: number, studentActualizado: UpdateStudentData): void
  {
    this._students$.pipe(take(1)).subscribe({
      next:(arrayActual)=> {
        this._students$.next(
          arrayActual.map((s) => s.id === id ? {...s, ...studentActualizado} : s)
        );
      }
    });
  }

  deleteStudentId(id:number): void
  {
    this._students$.pipe(take(1)).subscribe({
      next: (arrayActual) => this._students$.next(arrayActual.filter((s) => s.id !== id))
    }
    );
  }


}

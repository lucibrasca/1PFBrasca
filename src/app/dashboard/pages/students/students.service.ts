import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

private _students$ = new BehaviorSubject<Student[]>([]);
private students$ = this._students$.asObservable();
  

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadStudent()
  {
    this.httpClient.get<Student[]>('http://localhost:3000/students').subscribe({
      next:(response)=>{ 
        this._students$.next(response);
      },
    error: () => {
      this.notifier.showError('Ocurrió un error al cargar los alumnos');
    }
    })

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
  
   this.httpClient.post<Student>('http://localhost:3000/students',student).subscribe({
    next: () =>{this.loadStudent() }
  })
  }
  

  updateStudentById(id: number, studentActualizado: UpdateStudentData): void
  {
      this.httpClient.put('http://localhost:3000/students/'+id, studentActualizado).subscribe({
        next: ()=>{ this.loadStudent()}
      });
  }

  deleteStudentId(id:number): void
  {
    this.httpClient.delete('http://localhost:3000/students/'+id).subscribe({
      next: () => { this.loadStudent()}
    });
  }


}

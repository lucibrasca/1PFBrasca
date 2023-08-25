import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, Subject, map, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Registration } from '../registrations/models';

@Injectable({
  providedIn: 'root'
})

export class StudentsService {

private _students$ = new BehaviorSubject<Student[]>([]);
public students$ = this._students$.asObservable();
  

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadStudent()
  {
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students').subscribe({
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
  
   this.httpClient.post<Student>(environment.baseApiUrl + '/students',student).subscribe({
    next: () =>{this.loadStudent() }
  })
  }
  

  updateStudentById(id: number, studentActualizado: UpdateStudentData): void
  {
      this.httpClient.put(environment.baseApiUrl + '/students/'+id, studentActualizado).subscribe({
        next: ()=>{ this.loadStudent()}
      });
  }

  deleteStudentId(id:number): void
  {
    this.httpClient.delete(environment.baseApiUrl + '/students/'+id).subscribe({
      next: () => { this.loadStudent()}
    });
  }

  getStudentByCourseId(courseId: number): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + `/registration?courseId=${courseId}`)
  }


}

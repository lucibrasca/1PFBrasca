import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course, CreateCourseData, UpdateCourseData } from './models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Course[]>([]);
  public courses$ = this._courses$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  getCourses(): Observable<Course[]>
  {
    return this._courses$.asObservable();
  }

  loadCourses(): void 
  {
    this.httpClient.get<Course[]>('http://localhost:3000/courses').subscribe({
      next:(response)=>{ 
        this._courses$.next(response);
      },
    error: () => {
      this.notifier.showError('Ocurrió un error al cargar los cursos');
    }
    })
  }

  createCourse(course: CreateCourseData): void
  {
    this.httpClient.post<Course>(environment.baseApiUrl + '/courses',course).subscribe({
      next: () =>{this.loadCourses() }
    });
  }

  updateCourseById(id: number, courseActualizado: UpdateCourseData): void
  {
    this.httpClient.put(environment.baseApiUrl + '/courses/'+id, courseActualizado).subscribe({
      next: ()=>{ this.loadCourses()}
    });
  }

  deleteCourseId(id:number): void
  {
    this.httpClient.delete(environment.baseApiUrl + '/courses/'+id).subscribe({
      next: () => { this.loadCourses()}
    });
  }



}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course, CourseWithTeacher, CreateCourseData, UpdateCourseData } from './models';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CourseActions } from './store/course.actions';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<CourseWithTeacher[]>([]);
  public courses$ = this._courses$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient, private store: Store) { }

  getCourses(): Observable<CourseWithTeacher[]>
  {
    return this._courses$.asObservable();
  }

  loadCourses(): void 
  {
    this.httpClient.get<CourseWithTeacher[]>(environment.baseApiUrl + '/courses').subscribe({
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
    this.httpClient.post<CourseWithTeacher>(environment.baseApiUrl + '/courses',course).subscribe({
      next: () =>{this.store.dispatch(CourseActions.loadCourses());}
    });
  }

  updateCourseById(id: number, courseActualizado: UpdateCourseData): void
  {
    this.httpClient.put(environment.baseApiUrl + '/courses/'+id, courseActualizado).subscribe({
      next: ()=>{ this.store.dispatch(CourseActions.loadCourses());}
    });
  }

  deleteCourseId(id:number): void
  {
    this.httpClient.delete(environment.baseApiUrl + '/courses/'+id).subscribe({
      next: () => {this.store.dispatch(CourseActions.loadCourses());}
    });
  }



}

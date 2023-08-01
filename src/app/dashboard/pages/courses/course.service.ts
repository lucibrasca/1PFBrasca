import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course, CreateCourseData, UpdateCourseData } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject<Course[]>([]);

  constructor() { }

  getCourses(): Observable<Course[]>
  {
    return this.courses$.asObservable();
  }

  loadCourses(): void 
  {
    this.courses$.next([
      {
      id: 1, 
      nombre:"Angular",
      fechaInicio : new Date('2023-10-12'),
      fechaFin: new Date('2023-10-25')
      },
      {
        id: 2, 
        nombre:"React",
        fechaInicio : new Date('2023-11-20'),
        fechaFin: new Date('2023-12-28')
        },

    ])
  }

  createCourse(course: CreateCourseData): void
  {
    this.courses$.pipe(take(1)).subscribe({
      next:(arrayActual) => {
        this.courses$.next([...arrayActual,
          {...course, id: arrayActual.length+1}]
        
        );
      }
    });

  }

  updateCourseById(id: number, courseActualizado: UpdateCourseData): void
  {
    this.courses$.pipe(take(1)).subscribe({
      next:(arrayActual)=> {
        this.courses$.next(
          arrayActual.map((c) => c.id === id ? {...c, ...courseActualizado} : c)
        );
      }
    });
  }

  deleteCourseId(id:number): void
  {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => this.courses$.next(arrayActual.filter((c) => c.id !== id))
    }
    );
  }



}

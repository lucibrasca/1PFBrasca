import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../../students/models';
import { selectCourseDetailFechaFin, selectCourseDetailFechaInicio, selectCourseDetailName, selectCourseDetailTeacher } from '../../store/course.selectors';
import { StudentsService } from '../../../students/students.service';
import { Store } from '@ngrx/store';
import { CourseActions } from '../../store/course.actions';
import { selectTeacherName } from '../../../teachers/store/teachers.selectors';
import { TeachersActions } from '../../../teachers/store/teachers.actions';
import { RegistrationWithStudentAndCourse } from '../../../registrations/models';

@Component({
  selector: 'app-courses-details',
  templateUrl: './courses-details.component.html',
  styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent {

  displayedColumns = ['id', 'nombre', 'email'];
  
  
  
  public cursoNombre$: Observable<string | undefined>;
  public fechaInicio$: Observable<Date | undefined>;
  public fechaFin$:  Observable<Date | undefined>;
  public profesor$:  Observable<string | undefined>;
  public students$: Observable<Student[]>;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentsService,
    private store: Store,
  ) {
    this.cursoNombre$ = this.store.select(selectCourseDetailName);
    this.fechaInicio$ = this.store.select(selectCourseDetailFechaInicio);
    this.fechaFin$ = this.store.select(selectCourseDetailFechaFin);
    this.profesor$ = this.store.select(selectCourseDetailTeacher);
    this.students$ = this.studentService.getStudentByCourseId(this.activatedRoute.snapshot.params['id']);
 
    
 

  }

  ngOnInit(): void {
   this.store.dispatch(CourseActions.loadCoursesDetail({ courseId: this.activatedRoute.snapshot.params['id'] }));

  }


}

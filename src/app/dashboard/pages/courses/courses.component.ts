import { Component, EventEmitter, OnInit } from '@angular/core';
import { Course } from './models';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})


export class CoursesComponent implements OnInit{

  public data$: Observable<Course[]>; 

  public dataSource: Course[] = [];

  public displayedColumns = ['id','nombre','fechaInicio','fechaFin','acciones'];

  constructor(private matDialog: MatDialog, private courseService: CourseService)
  {
    this.data$ = this.courseService.getCourses();
  }


  ngOnInit(): void {

    this.courseService.loadCourses();

  }


  onCreateCourse() : void
  {
    this.matDialog.open(CourseFormDialogComponent).afterClosed().subscribe({
      next:(result)=>{
        if ( result ){
          this.courseService.createCourse(
            { nombre: result['nombre'],
              fechaInicio: result['fechaInicio'],
              fechaFin: result['fechaFin'],
          });
        }
      }
  });
  }


  onDeleteCourse(courseToDelete: Course) : void
  {
  if(confirm(`¿Está seguro que desea eliminar el curso ${courseToDelete.nombre}?`))
    {
      this.courseService.deleteCourseId(courseToDelete.id);
    }
  }
 
  onEditCourse(courseToEdit : Course) : void 
  {
   this.matDialog.open(CourseFormDialogComponent , {
      data: courseToEdit
    }).afterClosed().subscribe({
      next:(result)=>{
        if ( result ){
          this.courseService.updateCourseById(courseToEdit.id, result);
        }
      }
  });
  }


}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models';
import { StudentsService } from  './students.service';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {


public students: Observable<Student[]>;
public isAdmin$: Observable<boolean>;

constructor(private matDialog: MatDialog,
            private studentService: StudentsService,
            private notifier: NotifierService,
            private store: Store){

  this.studentService.loadStudent();
  this.students = this.studentService.getStudents();  
  this.isAdmin$ = this.store.select(selectIsAdmin);       

}

onCreateStudent() : void
{
  this.matDialog.open(StudentFormDialogComponent).afterClosed().subscribe({
    next:(result)=>{
      if ( result ){
        this.studentService.createStudent(
          { nombre: result['nombre'],
            apellido: result['apellido'],
            email: result['email'],
            contrasenia: result['contrasenia'],
            telefono: result['telefono'],
            documento: result['documento'],
        });
        this.notifier.showSuccess('Alumno dado de alta.')
      }
    }
});
}

onDeleteStudent(studentToDelete: Student) : void
{
if(confirm(`¿Está seguro que desea eliminar al estudiante ${studentToDelete.nombre} ${studentToDelete.apellido}?`))
  {
    this.studentService.deleteStudentId(studentToDelete.id);
    this.notifier.showSuccess('Alumno dado de baja.')
  }
}

onEditStudent(studentToEdit : Student) : void 
{
 this.matDialog.open(StudentFormDialogComponent , {
    data: studentToEdit
  }).afterClosed().subscribe({
    next:(result)=>{
      if ( result ){
        this.studentService.updateStudentById(studentToEdit.id, result);
        this.notifier.showSuccess('Alumno modificado.')
      }
    }
});
}

}



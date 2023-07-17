import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models';


const ELEMENT_DATA: Student[] = [];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {

public students: Student[] = ELEMENT_DATA;

constructor(private matDialog: MatDialog){}

onCreateStudent() : void
{
  this.matDialog.open(StudentFormDialogComponent).afterClosed().subscribe({
    next:(result)=>{
      if ( result ){
        this.students = [...this.students,
          { id: this.students.length+1,
            nombre: result['nombre'],
            apellido: result['apellido'],
            email: result['email'],
            contrasenia: result['contrasenia'],
            telefono: result['telefono'],
            documento: result['documento'],
        }];
      }
    }
});
}

onDeleteStudent(studentToDelete: Student) : void
{
  if(confirm(`¿Está seguro que desea elimnar al estudiante ${studentToDelete.nombre} ${studentToDelete.apellido}?`))
  {
    this.students = this.students.filter((s) => s.id !== studentToDelete.id);
  }
}

onEditStudent(studentToEdit : Student) : void 
{
  this.matDialog.open(StudentFormDialogComponent , {
    data: studentToEdit
  }).afterClosed().subscribe({
    next:(result)=>{
      if ( result ){
        this.students = this.students.map((student)=>
        { return student.id === studentToEdit.id ? {...student, ...result} : student; }
        );
      }
    }
});

}

}



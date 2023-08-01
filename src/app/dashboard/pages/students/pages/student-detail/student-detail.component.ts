import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../students.service';


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent {

public studentId?: number;

public nombre?: string;

public email?: string;

public telefono?: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private studentService: StudentsService)
  {
      if(!Number(this.activatedRoute.snapshot.paramMap.get('id')))
      {
        this.router.navigate(['dashboard','students']);

      }
      else{
          this.studentId= Number(this.activatedRoute.snapshot.paramMap.get('id'));
          this.loadStudent();
      }
  }

  loadStudent():void
  {
    if (this.studentId)
    {
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (student) => {
          this.nombre = `${student?.nombre} ${student?.apellido}`;
          this.email = student?.email; 
          this.telefono = `Teléfono: ${student?.telefono}`;
         
        }
      } )
    }
  }
}

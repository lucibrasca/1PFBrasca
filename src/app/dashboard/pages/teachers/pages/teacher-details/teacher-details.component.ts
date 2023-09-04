import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTeacherEmail, selectTeacherName } from '../../store/teachers.selectors';
import { Observable } from 'rxjs';
import { TeachersActions } from '../../store/teachers.actions';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {



public nombre$: Observable<string | undefined>;

public email$: Observable<string | undefined>;



  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store: Store)
  {
    
        this.nombre$ = this.store.select(selectTeacherName);
        this.email$ = this.store.select(selectTeacherEmail);
        
      
  }


  ngOnInit(): void {
      this.store.dispatch(TeachersActions.loadTeacherDetail({ teacherId: this.activatedRoute.snapshot.params['id'] }));

  }

 

}

import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../pages/users/models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Input()
  public drawer?: MatDrawer;

  public authUser$ : Observable<User|null>;
  
  constructor(private authService: AuthService,private router: Router){
    
    this.authUser$ = this.authService.authUser$;
  }


  logout():void
  {
    this.router.navigate(['auth', 'login']);
  }
}

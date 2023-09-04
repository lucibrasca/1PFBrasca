import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

public userId?: number;

public nombre?: string;

public email?: string;

public rol?: string;

constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UsersService)
  {
      if(!Number(this.activatedRoute.snapshot.paramMap.get('id')))
      {
        this.router.navigate(['dashboard','users']);

      }
      else{
          this.userId= Number(this.activatedRoute.snapshot.paramMap.get('id'));
          this.loadUser();
      }
  }

  loadUser():void
  {
    if (this.userId)
    {
      this.userService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.nombre = `${user?.nombre} ${user?.apellido}`;
          this.email = user?.email; 
          this.rol = `Rol: ${user?.rol}`;
         
        }
      } )
    }
  }


}

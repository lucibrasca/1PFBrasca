import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { User } from '../dashboard/pages/users/models';




describe('AuthService', () => {
    let authService: AuthService;
    let httpControler: HttpTestingController;
    const usuarioPrueba: User = {
        id: 1,
        email: 'usuarioe@mail.com',
        contrasenia: '123456',
        nombre: 'Usuario',
        apellido: 'Prueba',
        token: '6868074fgjlnfdzvm',
        }
    
    const respuestaPrueba: User[] = [usuarioPrueba];


beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: [ MockProvider(Router) ]
    });
    authService = TestBed.inject(AuthService);
    httpControler = TestBed.inject(HttpTestingController);
});

afterEach(() => {
    httpControler.verify();
  })


it('Deberia crearse el servicio', () => {
    expect(authService).toBeTruthy();
});

it('Si el login es valido el observable authUser$ debe emitir un valor y almacenar el token en el localstorage', (done) => {

    authService.login({
    email: usuarioPrueba.email,
    contrasenia: usuarioPrueba.contrasenia
    });

    httpControler.expectOne({
    method: 'GET',
    url: `http://localhost:3000/users?email=${usuarioPrueba.email}&contrasenia=${usuarioPrueba.contrasenia}`
    }).flush(respuestaPrueba)

    authService.authUser$.subscribe({
    next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(usuarioPrueba);
        expect(localStorage.getItem('token')).toEqual(usuarioPrueba.token);
        done();
    }
    })
});



}
)


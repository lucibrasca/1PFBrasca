import { ComponentFixture, TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../../auth.service";

describe('LoginComponent', () => {

    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
        })
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    
    })

    it('Debería crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería tener un campo email y contraseña', () => {
        const emailField = component.emailControl;
        const contraseniaField = component.contraseniaControl;
        expect(emailField).toBeTruthy();
        expect(contraseniaField).toBeTruthy();
    });
    
  it('Debería llamar authService.login() cuando el formulario es válido', () => {
        const authService = TestBed.inject(AuthService);
    
        const authServiceSpy = spyOn(authService, 'login');

        const email = 'test@test.com';
        const contrasenia = 'password123';
        
        component.emailControl.setValue(email);
        component.contraseniaControl.setValue(contrasenia);

        expect(component.loginForm.valid).toBeTrue();
    
        component.login();
    
        expect(authServiceSpy).toHaveBeenCalled();
    });



})






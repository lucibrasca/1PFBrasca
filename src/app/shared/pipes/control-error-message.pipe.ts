import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: {key: string, value: any}, ...args: unknown[]): unknown {

    const errorMessage : Record<string, string> = 
    {
      required : 'El campo es obligatorio.',
      minlength:`El campo debe tener al menos ${error.value['requiredLength']} caracteres.`,
      email: 'El campo requiere un email válido.'
    }
    
    return errorMessage[error.key] || 'Campo inválido';
  }

}

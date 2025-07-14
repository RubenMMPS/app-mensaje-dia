import { Component } from '@angular/core';

@Component({
  selector: 'app-saludo',
  standalone: true,
  imports: [],
  templateUrl: './saludo.component.html',
  styleUrls: ['./saludo.component.css'],
})
export class SaludoComponent {
  mensaje = '¡Hola desde Angular!';
  nombre = 'Rubén';

  actualizarNombre(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nombre = input.value;
  }
}

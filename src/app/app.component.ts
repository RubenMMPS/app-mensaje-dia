import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaludoComponent } from './saludo/saludo.component'; // 👈 Importa el componente
import { TareasComponent } from './tareas/tareas.component';
import { MensajeComponent } from './mensaje/mensaje.component'; // 👈 Importa el componente de mensaje

@Component({
  selector: 'app-root',
  imports: [MensajeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'mi-app-angular';
}

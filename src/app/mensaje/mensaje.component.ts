import { Component } from '@angular/core';
import { MensajeService } from './mensaje.service'; // Importa el servicio
import { CommonModule } from '@angular/common'; // 🔴 Importa esto

@Component({
  selector: 'app-mensaje',
  imports: [CommonModule],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css',
})
export class MensajeComponent {
  mensaje: string = '';
  mostrarMensaje = false; // Controla si se muestra el mensaje

  constructor(private mensajeService: MensajeService) {}

  ngOnInit() {
    this.mensaje = this.mensajeService.getMensajeDelDia();
  }
}

import { Component } from '@angular/core';
import { MensajeService } from './mensaje.service'; // Importa el servicio
import { CommonModule } from '@angular/common'; // 🔴 Importa esto
import { WordleComponent } from '../wordle/wordle.component'; // 👈 Importa el componente de Wordle
import { CumpleNatComponent } from '../cumple-nat/cumple-nat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  imports: [CommonModule, WordleComponent],
  standalone: true,
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css',
})
export class MensajeComponent {
  mensaje: string = '';
  mostrarMensaje = false; // Controla si se muestra el mensaje

  constructor(private mensajeService: MensajeService, private router: Router) {}

  ngOnInit() {
    this.mensaje = this.mensajeService.getMensajeDelDia();
  }
  irAlCumple() {
    this.router.navigate(['/cumple']);
  }
}

// wordle.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleService } from './wordle.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css'],
})
export class WordleComponent {
  fraseSecreta: string;
  intentos: { letras: { letra: string; estado: string }[]; palabra: string }[] =
    [];
  intentoActual: string = '';
  mensajeFinal: string = '';
  mostrarEstadisticas = false;
  abecedario: { letra: string; estado: string }[] = [];
  diaActual: number = new Date().getDate();

  modoPista: string;
  tema: string;

  constructor(private wordleService: WordleService) {
    const fraseObj = this.wordleService.getFraseDelDia();
    this.fraseSecreta = fraseObj.texto;
    this.modoPista = fraseObj.modoPista;
    this.tema = fraseObj.tema;
  }

  agregarLetra(letra: string) {
    if (this.intentoActual.length < this.fraseSecreta.length) {
      this.intentoActual += letra;
    }
  }

  // Propiedad para controlar el blur
  blurLevel: number = 15;

  getBlurStyle() {
    // Si ya hay mensaje final y es de acierto, sin blur
    if (this.mensajeFinal) {
      return {
        filter: 'blur(0px)',
        transition: 'filter 0.5s ease',
      };
    }
    // Reduce el blur en 3px con cada intento
    this.blurLevel = Math.max(0, 15 - this.intentos.length * 3);
    return {
      filter: `blur(${this.blurLevel}px)`,
      transition: 'filter 0.5s ease',
    };
  }

  adivinar() {
    if (
      !this.intentoActual ||
      this.intentoActual.length !== this.fraseSecreta.length
    )
      return;

    const intento = this.intentoActual.toUpperCase();
    const resultado = this.wordleService.verificarIntento(
      intento,
      this.fraseSecreta
    );

    this.intentos.push({
      letras: resultado,
      palabra: intento,
    });

    // Actualizar teclado
    resultado.forEach((item) => {
      const letraTeclado = this.abecedario.find((l) => l.letra === item.letra);
      if (letraTeclado) {
        if (
          item.estado === 'correcto' ||
          (item.estado === 'presente' && letraTeclado.estado !== 'correcto')
        ) {
          letraTeclado.estado = item.estado;
        }
      }
    });

    if (intento === this.fraseSecreta) {
      this.mensajeFinal = this.wordleService.getMensajeAcierto();
      this.wordleService.registrarVictoria();
    } else if (this.intentos.length >= 5) {
      this.mensajeFinal = `¡Casi! La frase era "${this.fraseSecreta}".`;
      this.wordleService.registrarDerrota();
    }

    this.intentoActual = '';
  }

  reiniciar() {
    this.intentos = [];
    this.intentoActual = '';
    this.mensajeFinal = '';
  }
}

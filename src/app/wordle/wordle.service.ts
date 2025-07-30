// wordle.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  private estadisticas = {
    victorias: 0,
    derrotas: 0,
    rachaActual: 0,
    mejorRacha: 0,
  };

  private frasesWordle = [
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: '', modoPista: '', tema: '' },
    { texto: 'MARCO BUTANERO', modoPista: 'despuesDeTres', tema: '' },
    { texto: 'CAPIBARA', modoPista: 'despuesDeTres', tema: '' },
    { texto: 'RAFFAELLO', modoPista: 'despuesDeTres', tema: '' },
    { texto: 'ALVARINI', modoPista: 'blur', tema: '' },
    { texto: 'HOLANDESA ERRANTE', modoPista: 'despuesDeTres', tema: '' },
    { texto: 'RUBEN GYM', modoPista: 'blur', tema: '' },
    { texto: 'LA PARADIÑA', modoPista: 'despuesDeTres', tema: '' },
    { texto: 'MARCO GARCIA', modoPista: 'blur', tema: '' },
    {
      texto: 'RUBEN PERDIDO',
      modoPista: 'despuesDeTres',
      tema: 'nombre + adjetivo',
    },
    { texto: 'PANGOLIN', modoPista: 'despuesDeTres', tema: 'animal' },
    { texto: '', modoPista: '', tema: '' },
    { texto: 'ALEJANDRO RICO', modoPista: 'blur', tema: 'hola' },
    { texto: '', modoPista: '', tema: '' },
    {
      texto: 'TULIPANES',
      modoPista: 'despuesDeTres',
      tema: 'algo que sé que te gusta mucho (aparte de mi)',
    },
    { texto: 'CUMPLEAÑERA', modoPista: 'despuesDeTres', tema: 'Hoy' },
    { texto: '', modoPista: '', tema: '' },
  ];

  private mensajesAcierto = [
    '¡Lo has adivinado! ¿Eres abogada o adivina? ⚖️✨',
  ];

  constructor() {
    this.cargarEstadisticas();
  }

  getFraseDelDia(): { texto: string; modoPista: string; tema: string } {
    const diaDelMes = new Date().getDate();
    return this.frasesWordle[diaDelMes - 1];
  }

  getMensajeAcierto(): string {
    return this.mensajesAcierto[
      Math.floor(Math.random() * this.mensajesAcierto.length)
    ];
  }

  registrarVictoria() {
    this.estadisticas.victorias++;
    this.estadisticas.rachaActual++;
    if (this.estadisticas.rachaActual > this.estadisticas.mejorRacha) {
      this.estadisticas.mejorRacha = this.estadisticas.rachaActual;
    }
    this.guardarEstadisticas();
  }

  registrarDerrota() {
    this.estadisticas.derrotas++;
    this.estadisticas.rachaActual = 0;
    this.guardarEstadisticas();
  }

  getEstadisticas() {
    return { ...this.estadisticas };
  }

  private cargarEstadisticas() {
    const stats = localStorage.getItem('wordleStats');
    if (stats) {
      this.estadisticas = JSON.parse(stats);
    }
  }

  private guardarEstadisticas() {
    localStorage.setItem('wordleStats', JSON.stringify(this.estadisticas));
  }
  verificarIntento(
    intento: string,
    fraseSecreta: string
  ): { letra: string; estado: string }[] {
    interface VerificarIntentoResultado {
      letra: string;
      estado: string;
    }

    const resultado: VerificarIntentoResultado[] = [];
    const letrasSecretas = fraseSecreta.split('');
    const letrasIntento = intento.split('');

    // Primera pasada: marcar correctos (verde)
    letrasIntento.forEach((letra, i) => {
      if (letra === letrasSecretas[i]) {
        resultado.push({ letra, estado: 'correcto' });
        letrasSecretas[i] = ''; // Marcamos como usada
      } else {
        if (letra === ' ') {
          resultado.push({ letra, estado: 'espacio' });
        } else {
          resultado.push({ letra, estado: 'ausente' }); // Temporal
        }
      }
    });

    // Segunda pasada: marcar presentes (amarillo)
    resultado.forEach((item) => {
      if (item.estado === 'ausente') {
        const index = letrasSecretas.indexOf(item.letra);
        if (index !== -1) {
          item.estado = 'presente';
          letrasSecretas[index] = ''; // Marcamos como usada
        }
      }
    });

    return resultado;
  }
}

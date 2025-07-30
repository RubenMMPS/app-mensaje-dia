import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-cumple-nat',
  standalone: true, // 👈 Esto es importante
  imports: [CommonModule], // 👈 Añade CommonModule aquí
  templateUrl: './cumple-nat.component.html',
  styleUrls: ['./cumple-nat.component.css'],
  animations: [
    trigger('openLetter', [
      state('closed', style({ height: '50px' })),
      state('opened', style({ height: '400px' })),
      transition('closed => opened', [animate('0.8s ease')]),
    ]),
  ],
})
export class CumpleNatComponent {
  // Estados de la experiencia
  currentStage: 'balloons' | 'letter' | 'photos' = 'balloons';
  balloons: any[] = [];
  letterOpened = false;
  showPhotos = false;

  @ViewChild('birthdayAudio') birthdayAudio!: ElementRef<HTMLAudioElement>;

  ngOnInit() {
    this.startBalloonRain();
  }

  // 1. Lluvia de globos
  startBalloonRain() {
    this.balloons = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 100,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: 2 + Math.random() * 3,
      size: 20 + Math.random() * 30,
    }));

    const animateBalloons = () => {
      this.balloons = this.balloons.map((balloon) => ({
        ...balloon,
        y: balloon.y - balloon.speed,
        x: balloon.x + (Math.random() - 0.5) * 2,
      }));

      if (this.balloons.some((b) => b.y > -100)) {
        requestAnimationFrame(animateBalloons);
      }
    };
    animateBalloons();
  }

  // 2. Mostrar carta
  openLetter() {
    this.letterOpened = true;
    this.currentStage = 'letter';
  }

  // 3. Al abrir completamente la carta
  onLetterOpened() {
    // Activar confeti
    this.shootConfetti();
    // Reproducir música
    this.birthdayAudio.nativeElement.play();
    // Mostrar botón para fotos después de 3 segundos
    setTimeout(() => {
      this.currentStage = 'photos';
    }, 3000);
  }

  // Efecto de confeti
  shootConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      shapes: ['circle', 'star'],
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
    });
  }
  // libro de fotos
  currentPageIndex = 0;

  bookPages = [
    {
      images: ['assets/cumple/fotos/nat1.jpg'],
      text: 'Pues nada otro año y otra vez siendo la mejor felcitación, nada raro.',
    },
    {
      images: ['assets/cumple/fotos/nat2.jpg'],
      text: 'Hemos llegado a un punto en el que te has convertido en una persona fundamental en mi vida.Vivir sin tus chismes, amores fallidos, correciones en mi técnica, tu humor... sería raro.',
    },
    {
      images: ['assets/cumple/fotos/nat3.jpg'],
      text: 'Para que no te quejes que solo pongo fotos en las que sales mal te pongo esta.Cada vez que te veo en este tipo de fotos no puedo evitar pensar si de verdad alguien como yo puede estar cerca de alguien como tú.',
    },
    {
      images: ['assets/cumple/fotos/nat4.jpg'],
      text: 'Luego te veo en estas fotos y se me pasa.',
    },
    {
      video: 'assets/cumple/videos/nat.mp4',
      text: 'Ahora que no estas conmigo en el gym me he dado cuenta que aparte de los chismes y tal eras la razón que me daba fuerzas para ir al gym todos los días, ahora que no estás tú me cuesta mucho más ir. Eres ese fuego interior que me hace esforzarme y ser mejor cada día.',
    },
    {
      images: ['assets/cumple/fotos/nat5.jpg'],
      text: 'Serías la amiga perfecta si solo me presentases amigas, pero le tienes miedo al éxito.',
    },
    {
      images: ['assets/cumple/fotos/nat6.jpg'],
      text: 'Hecho de menos ir a tomar algo contigo y emborracharme sabiendo que tengo a la mejor persona para cuidarme. Pero sobretodo hecho de menos a Natalia, a mi Natalia...',
    },
    {
      images: ['assets/cumple/fotos/nat7.jpg'],
      text: 'A medida que pasa el tiempo las parejas se van rompiendo y las personas con las que me gustaba salir se estan alejando de mi y eso me aterra. Natalia... no te vayas por favor.',
    },
    {
      images: ['assets/cumple/fotos/nat8.jpg'],
      text: 'Me estoy quedando sin fotos (y eso que creo que tengo más fotos tuyas que mias en mi galeria) asi que voy a ser directo. Se que te digo lo mismo todos los años pero eres una persona maravillosa de la cual solo tengo palabras bonitas.Me has dado afecto, lo cual jamás pensé que necesitaría pero se siente bastante bien saber que le importas a alguien.',
    },
    {
      images: ['assets/cumple/fotos/nat9.jpg'],
      text: 'Y hasta aquí mi felicitación de este año, no te imaginas la cantidad de lineas de código que llevo escritas en esta página. No se si podré superarme el año que viene. Pero de algo estoy seguro y eso es que si este año te tengo cariño el siguiente te tendré 1000 veces más de cariño. Disfruta de tu dia y recuerda que te amo mi pequeña capybara ❤️ ❤️ ❤️',
    },
  ];

  goToNextPage() {
    if (this.currentPageIndex < this.bookPages.length - 1) {
      this.currentPageIndex++;
    }
  }

  goToPreviousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }
}

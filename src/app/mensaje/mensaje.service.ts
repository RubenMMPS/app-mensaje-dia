import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  getMensajeDelDia(): string {
    const diaDelMes = new Date().getDate(); // Entre 1 y 31
    return MENSAJES_DEL_DIA[(diaDelMes - 1) % MENSAJES_DEL_DIA.length];
  }
}

function obtenerDiaDelAño(): number {
  const hoy = new Date();
  const inicioDelAño = new Date(hoy.getFullYear(), 0, 0);
  const diff = hoy.getTime() - inicioDelAño.getTime();
  const MILISEGUNDOS_EN_DIA = 1000 * 60 * 60 * 24;
  return Math.floor(diff / MILISEGUNDOS_EN_DIA);
}

export const MENSAJES_DEL_DIA: string[] = [
  "'Eres como una sentencia bien fundamentada: justa, clara e inspiradora. ⚖️❤️'",
  "'Tu voz importa, menos cuando corriges mi técnica en el gym 🎤'",
  "'Eres esa tirita de amor que cura todas mis heridas 💊'",
  "'Hoy es un buen día para echarte de menos 🧘‍♀️'",
  "'Cada pequeño paso cuenta para llegar a la meta 🚶‍♂️ (en mi caso cuenta la mitad)'",
  "'Te echo de menos mi pequeña capybara ❤️'",
  "'Recuerda por que estás aquí 🔁 (para pagar mis samaritanas)'",
  "'Ahora que no estás conmigo en el gym tengo que preguntar a las abuelitas por chisme 👵'",
  "'Nunca pensé que una persona hiciera que me esforzara tanto para poder estar a su altura 💪'",
  "'Tú puedes con esto y con más 💥 (no puede ser peor que tener que aguantarnos a Marco y a mi todos los dias)'",
  "'Hazlo por ti, no por nadie más ❤️'",
  "'Eres suficiente, tal y como eres 🌻'",
  "'Sin ti los tragos no son lo mismo, no tengo con quien meterme ahora 🍹'",
  "'Si ya sabía yo que invertir en mi era una buena idea, quien ha hecho una página web solo para ti aparte de mi? 💰 (espero que nadie porque sino estoy jodido)'",
  "'Me he esforzado mucho para hacer esta página, imagina lo mucho que me importas ❤️'",
  "'Si extrañarte fuera un arte haría cuadros con tu cara que valdrían un millón 🎨'",
  "'Eres más fuerte de lo que crees 🐯 (sobretodo en hip thrust)'",
  "'Te preocupas más por los demás que por ti misma y eso te define como persona ✨'",
  "'Error 404: MissingMyGymSisException 🚨'",
  "'No te rindas, lo mejor está por venir 🌈 (y cuando digo lo mejor me refiero a volver a ver mi preciosa carita)'",
  "'Que sepas que estoy muy orgulloso de ti y de todo lo que te estás esforzando 👏'",
  "'Que sepas que no te estoy extrañando, solo pinso en ti 24/7, a si que no te flipes 🧠'",
  "'No tendrás mucho pecho pero dios tenía que ponerte algo malo para que no fueras perfecta 🙃'",
  "'Lo bueno de que ya no vayamos juntos al gym esq ya no puedo ligar con tu madre 👩'",
  "'No estás sola, tienes una página web hecha por un enano tetón 🤝'",
  "'Eres el ibuprofeno de mi alma: me quitas el dolor de existir (y a veces me das acidez) 💊'",
  "'Si la felicidad fuera un delito, yo sería inocente. Y tú, cómplice por abandonarme ⚖️'",
  "'FELICIDADES PRINCESA!!!! Hoy no hay frase que seguramente te halla felicitado por md directamente. Pero por si se me ha olvidado te lo digo por aqui, te quiero un montón y eres lo mejor que me ha pasado en la vida no cambies 🎉'", // Añadido 🎉
  "'La vida es como un jurado: nunca escoge al más guapo (por eso seguimos solos)👨‍⚖️👩‍⚖️'",
];

import { EstadoPartida, partida } from './model';

export const dameNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

export const dameCarta = (numeroAleatorio: number): number => {
  // Si el número es mayor que 7, se le suma 2 para obtener 10, 11 o 12 (cartas que valen 0.5)
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
};

export const obtenerPuntosCarta = (carta: number): number => {
  // Las cartas del 1 al 7 valen su número; las figuras (10, 11, 12) valen 0.5
  if (carta >= 1 && carta <= 7) {
    return carta;
  }
  return 0.5;
};

export const obtenerHipoteticaPuntuacion = (puntuacion: number, puntosCarta: number): number => {
  return puntuacion + puntosCarta;
};

export const devolverMensajeHipoteticaPuntuacion = (hipoteticaPuntuacion: number): string => {
  if (hipoteticaPuntuacion > 7.5) {
    return `Con la próxima carta, te hubieses pasado de 7 y medio, alcanzando ${hipoteticaPuntuacion} puntos. ¡Habrías perdido el juego!`;
  } else if (hipoteticaPuntuacion === 7.5) {
    return "Con la próxima carta, te hubieses quedado justo en 7 y medio. ¡Habrías ganado el juego!";
  } else {
    return `Con la próxima carta, solo tendrías ${hipoteticaPuntuacion} puntos, lo que no alcanza para 7 y medio.`;
  }
};

export const obtenerMensajePlantarse = (puntos: number): string => {
  if (puntos < 4) {
    return "Has sido muy conservador.";
  } else if (puntos === 5) {
    return "Te ha entrado el canguelo eh?";
  } else if (puntos === 6 || puntos === 7) {
    return "Casi casi...";
  } else if (puntos === 7.5) {
    return "¡Lo has clavado! ¡Enhorabuena!";
  } else {
    return `Te has plantado con ${puntos} puntos.`;
  }
};


export const gestionarEstadoPartida = (): EstadoPartida => {
  if (partida.puntuacion === 7.5) {
    partida.estadoPartida = 'ganar';
  } else if (partida.puntuacion > 7.5) {
    partida.estadoPartida = 'perder'
  }

  return partida.estadoPartida;
}

export const sumarPuntos = (puntos: number) => {
  partida.puntuacion += puntos;
}

export const reset = () => {
  partida.puntuacion = 0;
  partida.estadoPartida = 'seguir_jugando';
}
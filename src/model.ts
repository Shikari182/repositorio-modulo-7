export type EstadoPartida = 'ganar' | 'perder' | 'seguir_jugando';

interface Partida {
  puntuacion: number;
  estadoPartida: EstadoPartida;
}

export const partida: Partida = {
  puntuacion: 0,
  estadoPartida: 'seguir_jugando',
}

// export class Partida {
//   puntuacion: number;
//   estadoPartida: EstadoPartida;

//   constructor() {
//     this.puntuacion = 0;
//     this.estadoPartida = 'seguir_jugando';
//   }

//   sumarPuntos(puntos: number): void {
//     this.puntuacion += puntos;
//   }

//   reset(): void {
//     this.puntuacion = 0;
//   }

//   // Método de ayuda para crear una nueva partida
//   static crearPartida(): Partida {
//     return new Partida();
//   }
// }
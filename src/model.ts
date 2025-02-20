export class Partida {
  puntuacion: number;

  constructor() {
    this.puntuacion = 0;
  }

  sumarPuntos(puntos: number): void {
    this.puntuacion += puntos;
  }

  reset(): void {
    this.puntuacion = 0;
  }

  // Método de ayuda para crear una nueva partida
  static crearPartida(): Partida {
    return new Partida();
  }
}

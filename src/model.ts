export class Partida {
  public puntuacion: number;

  constructor() {
    this.puntuacion = 0;
  }

  actualizarPuntuacion(nuevaPuntuacion: number): void {
    this.puntuacion = nuevaPuntuacion;
  }

  sumarPuntos(puntos: number): number {
    return this.puntuacion + puntos;
  }

  obtenerHipoteticaPuntuacion(puntosCarta: number): number {
    return this.puntuacion + puntosCarta;
  }
}
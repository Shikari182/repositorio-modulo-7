export const state = {
    puntuacion: 0,
  };
  
  export function actualizarPuntuacion(nuevaPuntuacion: number): void {
    state.puntuacion = nuevaPuntuacion;
  }
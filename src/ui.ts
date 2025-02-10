// ui.ts
export function muestraPuntuacion(puntuacion: number): void {
    const divPuntuacion = document.getElementById("puntuacion");
    if (divPuntuacion instanceof HTMLDivElement) {
      divPuntuacion.innerText = `Puntuación: ${puntuacion}`;
    }
  }
  
  export function mostrarUrlCarta(urlCarta: string): void {
    const img = document.getElementById("cartaImagen");
    if (img instanceof HTMLImageElement) {
      img.src = urlCarta;
    }
  }
  
  export function deshabilitarJuego(): void {
    const botonPedir = document.getElementById("pedirCarta");
    const botonCartaSiguiente = document.getElementById("cartaSiguiente");
    const botonPlantarse = document.getElementById("plantarse");
    if (botonPedir instanceof HTMLButtonElement) botonPedir.disabled = true;
    if (botonCartaSiguiente instanceof HTMLButtonElement) botonCartaSiguiente.disabled = true;
    if (botonPlantarse instanceof HTMLButtonElement) botonPlantarse.disabled = true;
  }
  
  export function deshabilitarJuegoPlantarse(): void {
    const botonPedir = document.getElementById("pedirCarta");
    const botonCartaSiguiente = document.getElementById("cartaSiguiente");
    const botonPlantarse = document.getElementById("plantarse");
    if (botonPedir instanceof HTMLButtonElement) botonPedir.disabled = true;
    if (botonPlantarse instanceof HTMLButtonElement) botonPlantarse.disabled = true;
    if (botonCartaSiguiente instanceof HTMLButtonElement) botonCartaSiguiente.disabled = false;
  }
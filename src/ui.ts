// ui.ts

export function muestraPuntuacion(puntuacion: number): void {
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerText = `Puntuación: ${puntuacion}`;
  }
}

export function obtenerUrlCarta(carta: number): string {
  let urlCarta = "";
  switch (carta) {
    case 1:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      urlCarta =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
  return urlCarta;
}

export function mostrarUrlCarta(urlCarta: string): void {
  const img = document.getElementById("cartaImagen");
  if (img instanceof HTMLImageElement) {
    img.src = urlCarta;
  }
}

export function deshabilitarBotonCartaSiguiente(): void {
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  if (botonCartaSiguiente instanceof HTMLButtonElement) {
    botonCartaSiguiente.disabled = true;
  }
}

export function bloquearBotones(): void {
  const botones = document.querySelectorAll("button");
  botones.forEach((boton) => {
    if (boton instanceof HTMLButtonElement && boton.id !== "nuevaPartida") {
      boton.disabled = true;
    }
  });
}

export function habilitarJuego(): void {
  const botonPedirCarta = document.getElementById("pedirCarta");
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  const botonPlantarse = document.getElementById("plantarse");
  if (
    botonPedirCarta instanceof HTMLButtonElement &&
    botonCartaSiguiente instanceof HTMLButtonElement &&
    botonPlantarse instanceof HTMLButtonElement
  ) {
    botonPedirCarta.disabled = false;
    botonCartaSiguiente.disabled = true;
    botonPlantarse.disabled = false;
  }
}

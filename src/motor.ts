export const dameNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};

export function dameCarta(numeroAleatorio: number): number {
  // Si el número es mayor que 7, se le suma 2 para obtener 10, 11 o 12 (cartas que valen 0.5)
  return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
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

export const obtenerPuntosCarta = (carta: number): number => {
  // Las cartas del 1 al 7 valen su número; las figuras (10, 11, 12) valen 0.5
  if (carta >= 1 && carta <= 7) {
    return carta;
  }
  return 0.5;
};

export function gestionarPartida(
  puntuacion: number,
  bloquearBotones: () => void
): void {
  if (puntuacion > 7.5) {
    alert("Game Over! Te has pasado de 7 y medio");
    bloquearBotones();
  } else if (puntuacion === 7.5) {
    alert("¡Lo has clavado! ¡Enhorabuena!");
    bloquearBotones();
  }
}

export function obtenerMensajePlantarse(puntos: number): string {
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
}
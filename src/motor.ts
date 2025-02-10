// motor.ts
export function dameNumeroAleatorio(): number {
    return Math.floor(Math.random() * 10) + 1;
  }
  
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
  
  export function obtenerPuntosCarta(carta: number): number {
    // Las cartas del 1 al 7 valen su número; las figuras (10, 11, 12) valen 0.5
    if (carta >= 1 && carta <= 7) {
      return carta;
    }
    return 0.5;
  }
  
  export function sumarPuntos(actual: number, punto: number): number {
    return actual + punto;
  }
  
  export function dameCartaFinal(): number {
    const numeroAleatorio = Math.floor(Math.random() * 10) + 1;
    return numeroAleatorio > 7 ? numeroAleatorio + 2 : numeroAleatorio;
  }
  
  /**
   * Comprueba la puntuación y devuelve un mensaje si el juego debe finalizar.
   */
  export function gestionarPartida(puntuacion: number): string | null {
    if (puntuacion > 7.5) {
      return "Game Over! Te has pasado de 7 y medio";
    } else if (puntuacion === 7.5) {
      return "¡Lo has clavado! ¡Enhorabuena!";
    }
    return null;
  }
  
  /**
   * Simula la siguiente carta y devuelve el mensaje correspondiente.
   */
  export function simularSiguienteCarta(puntuacion: number): string {
    const cartaFinal = dameCartaFinal();
    const puntosCartaFinal = obtenerPuntosCarta(cartaFinal);
    const hipoteticaPuntuacion = sumarPuntos(puntuacion, puntosCartaFinal);
    if (hipoteticaPuntuacion > 7.5) {
      return `Con la próxima carta, te hubieses pasado de 7 y medio, alcanzando ${hipoteticaPuntuacion} puntos. ¡Habrías perdido el juego!`;
    } else if (hipoteticaPuntuacion === 7.5) {
      return "Con la próxima carta, te hubieses quedado justo en 7 y medio. ¡Habrías ganado el juego!";
    } else {
      return `Con la próxima carta, solo tendrías ${hipoteticaPuntuacion} puntos, lo que no alcanza para 7 y medio.`;
    }
  }
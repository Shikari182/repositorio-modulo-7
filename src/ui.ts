import { Partida } from "./model";
import { 
  dameNumeroAleatorio, 
  dameCarta, 
  obtenerUrlCarta, 
  obtenerPuntosCarta, 
  gestionarPartida,
  obtenerMensajePlantarse 
} from "./motor";

// Creamos la instancia de la partida.
const partida = new Partida();

/** Actualiza la puntuación en la interfaz */
export function muestraPuntuacion(): void {
  const divPuntuacion = document.getElementById("puntuacion");
  if (divPuntuacion instanceof HTMLDivElement) {
    divPuntuacion.innerText = `Puntuación: ${partida.puntuacion}`;
  }
}

/** Muestra la imagen de la carta en la interfaz */
export function mostrarUrlCarta(urlCarta: string): void {
  const img = document.getElementById("cartaImagen");
  if (img instanceof HTMLImageElement) {
    img.src = urlCarta;
  }
}

/** Bloquea todos los botones excepto "nuevaPartida" */
export const bloquearBotones = (): void => {
  const botones = document.querySelectorAll("button");
  botones.forEach((boton) => {
    if (boton instanceof HTMLButtonElement && boton.id !== "nuevaPartida") {
      boton.disabled = true;
    }
  });
};

/** Habilita los botones para jugar: se habilitan "pedirCarta" y "plantarse" */
export const habilitarJuego = (): void => {
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
};

/** Función para "Pedir Carta". */
export const pedirCarta = (): void => {
  const numeroAleatorio = dameNumeroAleatorio();
  const carta = dameCarta(numeroAleatorio);
  console.log(`Carta pedida: ${carta}`);

  const urlCarta = obtenerUrlCarta(carta);
  mostrarUrlCarta(urlCarta);

  const puntosCarta = obtenerPuntosCarta(carta);
  const puntosSumados = partida.sumarPuntos(puntosCarta);
  partida.actualizarPuntuacion(puntosSumados);
  muestraPuntuacion();
  gestionarPartida(partida.puntuacion, bloquearBotones);
};

/** Función para "¿Cuál hubiese sido mi próxima carta?". */
export const cartaSiguiente = (): void => {
  const cartaFinal = dameCarta(dameNumeroAleatorio());
  const urlCartaFinal = obtenerUrlCarta(cartaFinal);
  mostrarUrlCarta(urlCartaFinal);
  const puntosCartaFinal = obtenerPuntosCarta(cartaFinal);
  const hipoteticaPuntuacion = partida.obtenerHipoteticaPuntuacion(puntosCartaFinal);

  // Se deshabilita el botón para que solo se pueda usar una vez.
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  if (botonCartaSiguiente instanceof HTMLButtonElement) {
    botonCartaSiguiente.disabled = true;
  }

  if (hipoteticaPuntuacion > 7.5) {
    alert(
      `Con la próxima carta, te hubieses pasado de 7 y medio, alcanzando ${hipoteticaPuntuacion} puntos. ¡Habrías perdido el juego!`
    );
  } else if (hipoteticaPuntuacion === 7.5) {
    alert(
      "Con la próxima carta, te hubieses quedado justo en 7 y medio. ¡Habrías ganado el juego!"
    );
  } else {
    alert(
      `Con la próxima carta, solo tendrías ${hipoteticaPuntuacion} puntos, lo que no alcanza para 7 y medio.`
    );
  }
};

/** Función para "Plantarse". */
export const plantarse = (): void => {
  alert(obtenerMensajePlantarse(partida.puntuacion));
  const botonPedir = document.getElementById("pedirCarta");
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  const botonPlantarse = document.getElementById("plantarse");

  if (
    botonPedir instanceof HTMLButtonElement &&
    botonCartaSiguiente instanceof HTMLButtonElement &&
    botonPlantarse instanceof HTMLButtonElement
  ) {
    botonPedir.disabled = true;
    botonPlantarse.disabled = true;
    // Se habilita "cartaSiguiente" para un único uso.
    botonCartaSiguiente.disabled = false;
  }
};

/** Función para "Nueva Partida". */
export const nuevaPartida = (): void => {
  partida.actualizarPuntuacion(0);
  muestraPuntuacion();
  // Se reestablece la carta por defecto (boca abajo).
  mostrarUrlCarta(
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"
  );
  // Se rehabilitan los botones de juego.
  habilitarJuego();
};

/** Función para inicializar la aplicación y asignar los eventos a los botones */
export function iniciarJuego(): void {
  document.addEventListener("DOMContentLoaded", () => {
    muestraPuntuacion();
    // Asignación de eventos a los botones
    const botonPedirCarta = document.getElementById("pedirCarta");
    if (botonPedirCarta instanceof HTMLButtonElement) {
      botonPedirCarta.addEventListener("click", pedirCarta);
    }

    const botonCartaSiguiente = document.getElementById("cartaSiguiente");
    if (botonCartaSiguiente instanceof HTMLButtonElement) {
      botonCartaSiguiente.disabled = true;
      botonCartaSiguiente.addEventListener("click", cartaSiguiente);
    }

    const botonPlantarse = document.getElementById("plantarse");
    if (botonPlantarse instanceof HTMLButtonElement) {
      botonPlantarse.addEventListener("click", plantarse);
    }

    const botonNuevaPartida = document.getElementById("nuevaPartida");
    if (botonNuevaPartida instanceof HTMLButtonElement) {
      botonNuevaPartida.addEventListener("click", nuevaPartida);
    }
  });
}
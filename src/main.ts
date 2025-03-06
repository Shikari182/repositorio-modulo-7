// main.ts
import "./style.css";
import { partida } from "./model";
import * as motor from "./motor";
import * as ui from "./ui";

// Crear una nueva partida utilizando el objeto Partida

// Inicializar la UI cuando se carga el DOM
document.addEventListener("DOMContentLoaded", () => {
  ui.muestraPuntuacion(partida.puntuacion);
});

// Función para "Pedir Carta"
const pedirCarta = (): void => {
  const numeroAleatorio = motor.dameNumeroAleatorio();
  const carta = motor.dameCarta(numeroAleatorio);
  console.log(`Carta pedida: ${carta}`);

  const urlCarta = ui.obtenerUrlCarta(carta);
  ui.mostrarUrlCarta(urlCarta);

  const puntosCarta = motor.obtenerPuntosCarta(carta);
  motor.sumarPuntos(puntosCarta);
  ui.muestraPuntuacion(partida.puntuacion);
  ui.gestionarPartida();
};

// Función para "¿Cuál hubiese sido mi próxima carta?"
const cartaSiguiente = (): void => {
  const cartaFinal = motor.dameCarta(motor.dameNumeroAleatorio());
  const urlCartaFinal = ui.obtenerUrlCarta(cartaFinal);
  ui.mostrarUrlCarta(urlCartaFinal);

  const puntosCartaFinal = motor.obtenerPuntosCarta(cartaFinal);
  const hipoteticaPuntuacion = motor.obtenerHipoteticaPuntuacion(partida.puntuacion, puntosCartaFinal);

  // Se deshabilita el botón para que solo se pueda usar una vez.
  ui.deshabilitarBotonCartaSiguiente();

  const mensaje = motor.devolverMensajeHipoteticaPuntuacion(hipoteticaPuntuacion);
  alert(mensaje);
};

// Función para "Plantarse"
const plantarse = (): void => {
  alert(motor.obtenerMensajePlantarse(partida.puntuacion));
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

// Función para "Nueva Partida"
const nuevaPartida = (): void => {
  motor.reset();
  console.log(partida)
  ui.muestraPuntuacion(partida.puntuacion);
  // Se reestablece la carta por defecto (boca abajo).
  ui.mostrarUrlCarta(
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg"
  );
  // Se rehabilitan los botones de juego.
  ui.habilitarJuego();
};

// Asignar eventos a los botones
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
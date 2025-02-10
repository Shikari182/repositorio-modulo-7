// main.ts
import "./style.css";
import { state, actualizarPuntuacion } from "./model";
import { 
  dameNumeroAleatorio, 
  dameCarta, 
  obtenerUrlCarta, 
  obtenerPuntosCarta, 
  sumarPuntos, 
  gestionarPartida, 
  simularSiguienteCarta 
} from "./motor";
import { 
  muestraPuntuacion, 
  mostrarUrlCarta, 
  deshabilitarJuego, 
  deshabilitarJuegoPlantarse 
} from "./ui";

// Inicializa el juego cuando el DOM esté cargado.
document.addEventListener("DOMContentLoaded", () => {
  // Muestra la puntuación inicial.
  muestraPuntuacion(state.puntuacion);

  // Evento para el botón "Pedir Carta"
  const botonPedirCarta = document.getElementById("pedirCarta");
  if (botonPedirCarta instanceof HTMLButtonElement) {
    botonPedirCarta.addEventListener("click", () => {
      const numeroAleatorio = dameNumeroAleatorio();
      const carta = dameCarta(numeroAleatorio);
      const urlCarta = obtenerUrlCarta(carta);
      mostrarUrlCarta(urlCarta);

      const puntosCarta = obtenerPuntosCarta(carta);
      const nuevaPuntuacion = sumarPuntos(state.puntuacion, puntosCarta);
      actualizarPuntuacion(nuevaPuntuacion);
      muestraPuntuacion(nuevaPuntuacion);

      // Comprueba si se ha alcanzado o superado 7,5
      const mensaje = gestionarPartida(nuevaPuntuacion);
      if (mensaje) {
        alert(mensaje);
        // Usamos la función para deshabilitar los botones si el juego finaliza.
        deshabilitarJuego();
      }
    });
  }

  // Evento para el botón "Plantarse"
  const botonPlantarse = document.getElementById("plantarse");
  if (botonPlantarse instanceof HTMLButtonElement) {
    botonPlantarse.addEventListener("click", () => {
      if (state.puntuacion < 4) {
        alert("Has sido muy conservador.");
      } else if (state.puntuacion === 5) {
        alert("Te ha entrado el canguelo eh?");
      } else if (state.puntuacion === 6 || state.puntuacion === 7) {
        alert("Casi casi...");
      } else if (state.puntuacion === 7.5) {
        alert("¡Lo has clavado! ¡Enhorabuena!");
      } else {
        alert(`Te has plantado con ${state.puntuacion} puntos.`);
      }
      // Al plantarse se deshabilitan "Pedir Carta" y "Plantarse"
      // y se habilita "¿Cuál hubiese sido mi próxima carta?" para un único uso.
      deshabilitarJuegoPlantarse();
    });
  }

  // Evento para el botón "¿Cuál hubiese sido mi próxima carta?"
  const botonCartaSiguiente = document.getElementById("cartaSiguiente");
  if (botonCartaSiguiente instanceof HTMLButtonElement) {
    botonCartaSiguiente.disabled = true; // Inicialmente deshabilitado.
    botonCartaSiguiente.addEventListener("click", () => {
      const mensajeSiguiente = simularSiguienteCarta(state.puntuacion);
      alert(mensajeSiguiente);
      // Se usa una única vez, por lo que se deshabilita después de usarse.
      botonCartaSiguiente.disabled = true;
    });
  }

  // Evento para el botón "Nueva Partida"
  const botonNuevaPartida = document.getElementById("nuevaPartida");
  if (botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.addEventListener("click", () => {
      actualizarPuntuacion(0);
      muestraPuntuacion(0);

      const img = document.getElementById("cartaImagen");
      if (img instanceof HTMLImageElement) {
        img.src =
          "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      }

      // Se vuelven a habilitar los botones necesarios.
      const botonPedir = document.getElementById("pedirCarta");
      const botonPlantarse = document.getElementById("plantarse");
      const botonCartaSiguiente = document.getElementById("cartaSiguiente");
      if (botonPedir instanceof HTMLButtonElement) botonPedir.disabled = false;
      if (botonPlantarse instanceof HTMLButtonElement) botonPlantarse.disabled = false;
      if (botonCartaSiguiente instanceof HTMLButtonElement) botonCartaSiguiente.disabled = true;
    });
  }
});
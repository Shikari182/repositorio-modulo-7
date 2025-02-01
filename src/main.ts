import "./style.css";

let puntuacion: number = 0;

function muestraPuntuacion(): void {
    const divPuntuacion = document.getElementById('puntuacion');
    if (divPuntuacion instanceof HTMLDivElement) {
        divPuntuacion.innerText = `Puntuación: ${puntuacion}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    muestraPuntuacion();
});

function dameCarta(): number {
    const carta = Math.floor(Math.random() * 10) + 1;
    return carta > 7 ? carta + 2 : carta;
}

const botonPedirCarta = document.getElementById('pedirCarta');
if (botonPedirCarta instanceof HTMLButtonElement) {
    botonPedirCarta.addEventListener('click', () => {
        const carta = dameCarta();
        console.log(`Carta pedida: ${carta}`);
        mostrarCarta(carta);  // Mostrar la carta en la interfaz
        sumarPuntos(carta);    // Sumar los puntos de la carta
    });
}

function mostrarCarta(carta: number): void {
    const img = document.getElementById('cartaImagen');
    if (img instanceof HTMLImageElement) {
        let urlCarta = '';
        switch (carta) {
            case 1:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
                break;
            case 2:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
                break;
            case 3:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
                break;
            case 4:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
                break;
            case 5:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
                break;
            case 6:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
                break;
            case 7:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
                break;
            case 10:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
                break;
            case 11:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
                break;
            case 12:
                urlCarta = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
                break;
        }
        img.src = urlCarta;  // Mostramos la carta en el elemento img
    }
}

const botonCartaSiguiente = document.getElementById('cartaSiguiente');
if (botonCartaSiguiente instanceof HTMLButtonElement) {
    botonCartaSiguiente.disabled = true;
}

function sumarPuntos(carta: number): void {
    let puntos = 0;

    // Si la carta es un número entre 1 y 7, sumamos su valor
    if (carta >= 1 && carta <= 7) {
        puntos = carta;
    } else {
        // Las figuras (10, 11, 12) valen medio punto
        puntos = 0.5;
    }

    // Sumamos la puntuación actual
    puntuacion += puntos;
    muestraPuntuacion();  // Actualizamos la interfaz con la nueva puntuación

    // Comprobamos si el jugador se pasa de 7.5 puntos
    if (puntuacion > 7.5) {
        alert("Game Over! Te has pasado de 7.5 puntos.");
        deshabilitarJuego();
    }

    // Comprobamos si el jugador llega exactamente a 7.5 puntos
    if (puntuacion === 7.5) {
        alert("¡Lo has clavado! ¡Enhorabuena!");
        deshabilitarJuego();
    }
}

const botonPlantarse = document.getElementById('plantarse');
if (botonPlantarse instanceof HTMLButtonElement) {
    botonPlantarse.addEventListener('click', () => {
        if (puntuacion <= 4.5) {
            alert("Has sido muy conservador.");
        } else if (puntuacion >= 5 && puntuacion < 6) {
            alert("Te ha entrado el canguelo eh?");
        } else if (puntuacion >= 6 && puntuacion <= 7) {
            alert("Casi casi...");
        }
        deshabilitarJuegoPlantarse();
    });
}

function deshabilitarJuego(): void {
    const botonPedir = document.getElementById('pedirCarta');
    const botonCartaSiguiente = document.getElementById('cartaSiguiente');
    const botonPlantarse = document.getElementById('plantarse');

    if (
        botonPedir instanceof HTMLButtonElement &&
        botonCartaSiguiente instanceof HTMLButtonElement &&
        botonPlantarse instanceof HTMLButtonElement
    ) {
        botonPedir.disabled = true;
        botonCartaSiguiente.disabled = true;
        botonPlantarse.disabled = true;
    }
}

function deshabilitarJuegoPlantarse(): void {
    const botonPedir = document.getElementById('pedirCarta');
    const botonCartaSiguiente = document.getElementById('cartaSiguiente');
    const botonPlantarse = document.getElementById('plantarse');

    if (
        botonPedir instanceof HTMLButtonElement &&
        botonCartaSiguiente instanceof HTMLButtonElement &&
        botonPlantarse instanceof HTMLButtonElement
    ) {
        botonPedir.disabled = true;
        botonCartaSiguiente.disabled = false;
        botonPlantarse.disabled = true;
    }
}

function dameCartaFinal(): number {
    const carta = Math.floor(Math.random() * 10) + 1;
    return carta > 7 ? carta + 2 : carta;
}

if (botonCartaSiguiente instanceof HTMLButtonElement) {
    botonCartaSiguiente.addEventListener('click', () => {
        const cartaFinal = dameCartaFinal();
        mostrarCarta(cartaFinal);
        sumarPuntos(cartaFinal);
        botonCartaSiguiente.disabled = true;

        if (puntuacion <= 4.5) {
            alert("¡Si hubiese pedido otra carta, te hubieses quedado muy lejos del 7 y medio!");
        } else if (puntuacion >= 5 && puntuacion < 6) {
            alert("Si hubieses pedido otra carta, te hubieses quedado algo lejos del 7 y medio.");
        } else if (puntuacion >= 6 && puntuacion <= 7) {
            alert("Si hubieses pedido otra carta, te hubieses quedado muy cerquita del 7 y medio.");
        } else if (puntuacion === 7.5) {
            alert("Si hubieses pedido otra carta...¡Habrías ganado el juego!");
        } else if (puntuacion >= 7.5) {
            alert("Si hubieses pedido otra carta, ¡te hubieses pasado del 7 y medio y habrías perdido el juego!");
        }
    });
}

const botonNuevaPartida = document.getElementById('nuevaPartida');
if (botonNuevaPartida instanceof HTMLButtonElement) {
    botonNuevaPartida.addEventListener('click', () => {
        // Reiniciamos la puntuación y el estado del juego
        puntuacion = 0;
        muestraPuntuacion();
        const botonPedir = document.getElementById('pedirCarta');
        const botonCartaSiguiente = document.getElementById('cartaSiguiente');
        const botonPlantarse = document.getElementById('plantarse');
        const img = document.getElementById('cartaImagen');

        if (
            botonPedir instanceof HTMLButtonElement &&
            botonCartaSiguiente instanceof HTMLButtonElement &&
            botonPlantarse instanceof HTMLButtonElement &&
            img instanceof HTMLImageElement
        ) {
            botonPedir.disabled = false;
            botonCartaSiguiente.disabled = true;
            botonPlantarse.disabled = false;
            img.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";  // Vuelta a la carta boca abajo
        }
    });
}
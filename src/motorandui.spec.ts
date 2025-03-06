import { describe, it, expect, vi} from 'vitest';
import * as motor from './motor';
import { EstadoPartida, partida } from './model';
// import * as ui from './ui';

describe("Pruebas de condiciones de victoria/derrota", () => {
  // let alertSpy: ReturnType<typeof vi.spyOn>;
  // let bloquearBotonesSpy: ReturnType<typeof vi.spyOn>;

  // afterEach(() => {
  //   vi.restoreAllMocks();
  // });

  it('devolverMensajeHipoteticaPuntuacion devuelve mensaje de victoria para 7.5', () => {
    const mensaje = motor.devolverMensajeHipoteticaPuntuacion(7.5);
    expect(mensaje).toBe(
      "Con la próxima carta, te hubieses quedado justo en 7 y medio. ¡Habrías ganado el juego!"
    );
  });

  it('devolverMensajeHipoteticaPuntuacion devuelve mensaje de derrota para puntuación > 7.5', () => {
    const mensaje = motor.devolverMensajeHipoteticaPuntuacion(8);
    expect(mensaje).toBe(
      "Con la próxima carta, te hubieses pasado de 7 y medio, alcanzando 8 puntos. ¡Habrías perdido el juego!"
    );
  });

  it('obtenerMensajePlantarse devuelve mensaje adecuado para puntuación menor a 4', () => {
    const mensaje = motor.obtenerMensajePlantarse(3);
    expect(mensaje).toBe("Has sido muy conservador.");
  });

  it('obtenerMensajePlantarse devuelve mensaje adecuado para puntuación 5', () => {
    const mensaje = motor.obtenerMensajePlantarse(5);
    expect(mensaje).toBe("Te ha entrado el canguelo eh?");
  });

  it('obtenerMensajePlantarse devuelve mensaje adecuado para puntuación 6 o 7', () => {
    const mensaje6 = motor.obtenerMensajePlantarse(6);
    const mensaje7 = motor.obtenerMensajePlantarse(7);
    expect(mensaje6).toBe("Casi casi...");
    expect(mensaje7).toBe("Casi casi...");
  });

  it('obtenerMensajePlantarse devuelve mensaje de victoria para puntuación 7.5', () => {
    const mensaje = motor.obtenerMensajePlantarse(7.5);
    expect(mensaje).toBe("¡Lo has clavado! ¡Enhorabuena!");
  });

  // it('gestionarPartida muestra mensaje de victoria y bloquea botones cuando la puntuación es 7.5', () => {
  //   ui.gestionarPartida(7.5);
  //   expect(alertSpy).toHaveBeenCalledWith("¡Lo has clavado! ¡Enhorabuena!");
  //   expect(bloquearBotonesSpy).toHaveBeenCalled();
  // });

  // it('gestionarPartida muestra mensaje de derrota y bloquea botones cuando la puntuación es mayor a 7.5', () => {
  //   ui.gestionarPartida(8);
  //   expect(alertSpy).toHaveBeenCalledWith("Game Over! Te has pasado de 7 y medio");
  //   expect(bloquearBotonesSpy).toHaveBeenCalled();
  // });

  // it('gestionarPartida no muestra ningún mensaje ni bloquea botones cuando la puntuación es menor a 7.5', () => {
  //   ui.gestionarPartida(6);
  //   expect(alertSpy).not.toHaveBeenCalled();
  //   expect(bloquearBotonesSpy).not.toHaveBeenCalled();
  // });

  it('obtenerHipoteticaPuntuacion calcula correctamente la puntuación hipotética', () => {
    const hipotetica = motor.obtenerHipoteticaPuntuacion(5, 2);
    expect(hipotetica).toBe(7);
  });

  describe('gestionarEstadoPartida', () => {
    it('deberia de devolver seguir_jugando, cuando la puntuacion sea menor a 7.5', () => {
      // Arrange
      const resultadoEsperado: EstadoPartida = 'seguir_jugando';
      vi.spyOn(partida, "puntuacion", "get").mockReturnValue(3);

      // Act
      const resultado = motor.gestionarEstadoPartida();

      // Assert
      expect(resultadoEsperado).toEqual(resultado);
    });

    it('deberia de devolver ganar, cuando la puntuacion sea igual a 7.5', () => {
      // Arrange
      const resultadoEsperado: EstadoPartida = 'ganar';
      vi.spyOn(partida, "puntuacion", "get").mockReturnValue(7.5);

      // Act
      const resultado = motor.gestionarEstadoPartida();

      // Assert
      expect(resultadoEsperado).toEqual(resultado);
    });

    it('deberia de devolver perder, cuando la puntuacion sea mayor a 7.5', () => {
      // Arrange
      const resultadoEsperado: EstadoPartida = 'perder';
      vi.spyOn(partida, "puntuacion", "get").mockReturnValue(10);

      // Act
      const resultado = motor.gestionarEstadoPartida();

      // Assert
      expect(resultadoEsperado).toEqual(resultado);
    });
  })
});

// Pruebas unitarias de los apartados opcionales //

describe("Pruebas de la función dameCarta", () => {
  it("debe retornar el número sin cambios si el número es menor o igual a 7", () => {
    // Arrange
    const numero1 = 3;
    const numero2 = 7;
    // Act
    const resultado1 = motor.dameCarta(numero1);
    const resultado2 = motor.dameCarta(numero2);
    // Assert
    expect(resultado1).toBe(3);
    expect(resultado2).toBe(7);
  });

  it("debe sumar 2 al número si el número es mayor a 7", () => {
    // Arrange
    const numero1 = 8;
    const numero2 = 9;
    const numero3 = 10;
    // Act
    const resultado1 = motor.dameCarta(numero1);
    const resultado2 = motor.dameCarta(numero2);
    const resultado3 = motor.dameCarta(numero3);
    // Assert
    expect(resultado1).toBe(10);
    expect(resultado2).toBe(11);
    expect(resultado3).toBe(12);
  });
});

describe("Pruebas de la función obtenerPuntosCarta", () => {
  it("debe retornar el mismo valor si la carta está entre 1 y 7", () => {
    // Arrange
    const carta1 = 1;
    const carta2 = 4;
    const carta3 = 7;
    // Act
    const resultado1 = motor.obtenerPuntosCarta(carta1);
    const resultado2 = motor.obtenerPuntosCarta(carta2);
    const resultado3 = motor.obtenerPuntosCarta(carta3);
    // Assert
    expect(resultado1).toBe(1);
    expect(resultado2).toBe(4);
    expect(resultado3).toBe(7);
  });

  it("debe retornar 0.5 si la carta es una figura (10, 11 o 12)", () => {
    // Arrange
    const carta1 = 10;
    const carta2 = 11;
    const carta3 = 12;
    // Act
    const resultado1 = motor.obtenerPuntosCarta(carta1);
    const resultado2 = motor.obtenerPuntosCarta(carta2);
    const resultado3 = motor.obtenerPuntosCarta(carta3);
    // Assert
    expect(resultado1).toBe(0.5);
    expect(resultado2).toBe(0.5);
    expect(resultado3).toBe(0.5);
  });
});
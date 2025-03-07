import { describe, it, expect, vi } from 'vitest';
import * as motor from './motor';
import { EstadoPartida, partida } from './model';

describe('motor', () => {
  describe('devolverMensajeHipoteticaPuntuacion', () => {
    it('debe devolver mensaje de victoria para puntuación 7.5', () => {
      // Arrange
      const puntuacion = 7.5;
      // Act
      const mensaje = motor.devolverMensajeHipoteticaPuntuacion(puntuacion);
      // Assert
      expect(mensaje).toBe("Con la próxima carta, te hubieses quedado justo en 7 y medio. ¡Habrías ganado el juego!");
    });

    it('debe devolver mensaje de derrota para puntuación mayor a 7.5', () => {
      // Arrange
      const puntuacion = 8;
      // Act
      const mensaje = motor.devolverMensajeHipoteticaPuntuacion(puntuacion);
      // Assert
      expect(mensaje).toBe("Con la próxima carta, te hubieses pasado de 7 y medio, alcanzando 8 puntos. ¡Habrías perdido el juego!");
    });
  });

  describe('obtenerMensajePlantarse', () => {
    it('debe devolver "Has sido muy conservador." para puntuación menor a 4', () => {
      // Arrange
      const puntuacion = 3;
      // Act
      const mensaje = motor.obtenerMensajePlantarse(puntuacion);
      // Assert
      expect(mensaje).toBe("Has sido muy conservador.");
    });

    it('debe devolver "Te ha entrado el canguelo eh?" para puntuación 5', () => {
      // Arrange
      const puntuacion = 5;
      // Act
      const mensaje = motor.obtenerMensajePlantarse(puntuacion);
      // Assert
      expect(mensaje).toBe("Te ha entrado el canguelo eh?");
    });

    it('debe devolver "Casi casi..." para puntuación 6', () => {
      // Arrange
      const puntuacion = 6;
      // Act
      const mensaje = motor.obtenerMensajePlantarse(puntuacion);
      // Assert
      expect(mensaje).toBe("Casi casi...");
    });

    it('debe devolver "Casi casi..." para puntuación 7', () => {
      // Arrange
      const puntuacion = 7;
      // Act
      const mensaje = motor.obtenerMensajePlantarse(puntuacion);
      // Assert
      expect(mensaje).toBe("Casi casi...");
    });

    it('debe devolver "¡Lo has clavado! ¡Enhorabuena!" para puntuación 7.5', () => {
      // Arrange
      const puntuacion = 7.5;
      // Act
      const mensaje = motor.obtenerMensajePlantarse(puntuacion);
      // Assert
      expect(mensaje).toBe("¡Lo has clavado! ¡Enhorabuena!");
    });
  });

  describe('obtenerHipoteticaPuntuacion', () => {
    it('debe calcular correctamente la puntuación hipotética', () => {
      // Arrange
      const puntuacionInicial = 5;
      const valorNuevaCarta = 2;
      // Act
      const resultado = motor.obtenerHipoteticaPuntuacion(puntuacionInicial, valorNuevaCarta);
      // Assert
      expect(resultado).toBe(7);
    });
  });

  describe('gestionarEstadoPartida', () => {
    it('debe devolver "seguir_jugando" cuando la puntuación es menor a 7.5', () => {
      // Arrange
      const estadoEsperado: EstadoPartida = 'seguir_jugando';
      vi.spyOn(partida, "puntuacion", "get").mockReturnValue(3);
      // Act
      const resultado = motor.gestionarEstadoPartida();
      // Assert
      expect(resultado).toEqual(estadoEsperado);
    });

    it('debe devolver "ganar" cuando la puntuación es igual a 7.5', () => {
      // Arrange
      const estadoEsperado: EstadoPartida = 'ganar';
      vi.spyOn(partida, "puntuacion", "get").mockReturnValue(7.5);
      // Act
      const resultado = motor.gestionarEstadoPartida();
      // Assert
      expect(resultado).toEqual(estadoEsperado);
    });

    it('debe devolver "perder" cuando la puntuación es mayor a 7.5', () => {
      // Arrange
      const estadoEsperado: EstadoPartida = 'perder';
      vi.spyOn(partida, "puntuacion", "get").mockReturnValue(10);
      // Act
      const resultado = motor.gestionarEstadoPartida();
      // Assert
      expect(resultado).toEqual(estadoEsperado);
    });
  });

  describe('dameCarta', () => {
    it('debe retornar el mismo número si es menor que 7', () => {
      // Arrange
      const numero = 3;
      // Act
      const resultado = motor.dameCarta(numero);
      // Assert
      expect(resultado).toBe(3);
    });

    it('debe retornar el mismo número si es igual a 7', () => {
      // Arrange
      const numero = 7;
      // Act
      const resultado = motor.dameCarta(numero);
      // Assert
      expect(resultado).toBe(7);
    });

    it('debe sumar 2 al número si es mayor que 7 (caso: 8)', () => {
      // Arrange
      const numero = 8;
      // Act
      const resultado = motor.dameCarta(numero);
      // Assert
      expect(resultado).toBe(10);
    });

    it('debe sumar 2 al número si es mayor que 7 (caso: 9)', () => {
      // Arrange
      const numero = 9;
      // Act
      const resultado = motor.dameCarta(numero);
      // Assert
      expect(resultado).toBe(11);
    });

    it('debe sumar 2 al número si es mayor que 7 (caso: 10)', () => {
      // Arrange
      const numero = 10;
      // Act
      const resultado = motor.dameCarta(numero);
      // Assert
      expect(resultado).toBe(12);
    });
  });

  describe('obtenerPuntosCarta', () => {
    it('debe retornar 1 si la carta es 1', () => {
      // Arrange
      const carta = 1;
      // Act
      const resultado = motor.obtenerPuntosCarta(carta);
      // Assert
      expect(resultado).toBe(1);
    });

    it('debe retornar 4 si la carta es 4', () => {
      // Arrange
      const carta = 4;
      // Act
      const resultado = motor.obtenerPuntosCarta(carta);
      // Assert
      expect(resultado).toBe(4);
    });

    it('debe retornar 7 si la carta es 7', () => {
      // Arrange
      const carta = 7;
      // Act
      const resultado = motor.obtenerPuntosCarta(carta);
      // Assert
      expect(resultado).toBe(7);
    });

    it('debe retornar 0.5 si la carta es 10', () => {
      // Arrange
      const carta = 10;
      // Act
      const resultado = motor.obtenerPuntosCarta(carta);
      // Assert
      expect(resultado).toBe(0.5);
    });

    it('debe retornar 0.5 si la carta es 11', () => {
      // Arrange
      const carta = 11;
      // Act
      const resultado = motor.obtenerPuntosCarta(carta);
      // Assert
      expect(resultado).toBe(0.5);
    });

    it('debe retornar 0.5 si la carta es 12', () => {
      // Arrange
      const carta = 12;
      // Act
      const resultado = motor.obtenerPuntosCarta(carta);
      // Assert
      expect(resultado).toBe(0.5);
    });
  });
});

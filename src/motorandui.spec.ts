
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as motor from './motor';
import * as ui from './ui';

describe("Pruebas de condiciones de victoria/derrota", () => {
  let alertSpy: ReturnType<typeof vi.spyOn>;
  let bloquearBotonesSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Espiamos la función alert global para interceptar su llamada
    alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    // Espiamos la función bloquearBotones para comprobar que se invoca
    bloquearBotonesSpy = vi.spyOn(ui, 'bloquearBotones').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restauramos los mocks para no interferir con otros tests
    vi.restoreAllMocks();
  });

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

  it('gestionarPartida muestra mensaje de victoria y bloquea botones cuando la puntuación es 7.5', () => {
    ui.gestionarPartida(7.5);
    expect(alertSpy).toHaveBeenCalledWith("¡Lo has clavado! ¡Enhorabuena!");
    expect(bloquearBotonesSpy).toHaveBeenCalled();
  });

  it('gestionarPartida muestra mensaje de derrota y bloquea botones cuando la puntuación es mayor a 7.5', () => {
    ui.gestionarPartida(8);
    expect(alertSpy).toHaveBeenCalledWith("Game Over! Te has pasado de 7 y medio");
    expect(bloquearBotonesSpy).toHaveBeenCalled();
  });

  it('gestionarPartida no muestra ningún mensaje ni bloquea botones cuando la puntuación es menor a 7.5', () => {
    ui.gestionarPartida(6);
    expect(alertSpy).not.toHaveBeenCalled();
    expect(bloquearBotonesSpy).not.toHaveBeenCalled();
  });

  it('obtenerHipoteticaPuntuacion calcula correctamente la puntuación hipotética', () => {
    const hipotetica = motor.obtenerHipoteticaPuntuacion(5, 2);
    expect(hipotetica).toBe(7);
  });
});
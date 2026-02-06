import * as World from "base/world";
import { MoveTo } from "stp_vibes/skills/moveto";
import { Vector } from "base/vector";

export class KickOff {
  constructor() { }

  run() {
    // Evitar que se ejercute fuera del kickoff
    const state = World?.RefereeState ?? "";
    if (!state.toLowerCase().includes("kickoff")) {
      return;
    }

    // Lista de posiciones deseadas para el kickoff (Coordenadas Verticales)
    // Asumimos siempre que defendemos el lado Y Negativo (Abajo)
    // El sistema de coordenadas se encarga de rotar/invertir si es necesario.
    // Campo típico: X ancho (±3), Y largo (±4.5)
    const targetPositions = [
      new Vector(0.0, -4.5),  // Arquero (Centro arco)
      new Vector(-2.0, -3.0), // Defensa Izq
      new Vector(2.0, -3.0),  // Defensa Der
      new Vector(-0.5, -1.0), // Medio 1
      new Vector(0.5, -1.0),  // Medio 2
      new Vector(0.0, -0.2)   // Delantero (casi en el medio)
    ];

    // Obtener todos los robots disponibles
    const robots = World.FriendlyRobots;

    // Asignación simple: Robot 0 -> Posición 0, Robot 1 -> Posición 1...
    // Esto funciona independientemente de los IDs específicos.
    // Simplemente tomamos el robot n de la lista y lo mandamos a la posición n.
    for (let i = 0; i < robots.length; i++) {
      // Si hay más robots que posiciones definidas, los sobrantes se quedan donde están 
      // o podríamos mandarlos a la banca, pero por ahora evitamos error.
      if (i < targetPositions.length) {
        new MoveTo(robots[i]).run(targetPositions[i], 0);
      } else {
        // Posición de espera genérica para suplentes/extras
        new MoveTo(robots[i]).run(new Vector(-3.0, -3.0 + (i * 0.5)), 0);
      }
    }
  }
}

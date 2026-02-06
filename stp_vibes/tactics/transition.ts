import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { Vector, Position } from "base/vector";
import { MoveTo } from "stp_vibes/skills/moveto";
import { Goalkeeping } from "stp_vibes/skills/goalkeeper";
import * as Field from "base/field";

// Asegúrate de que esta función de utilidad exista y esté disponible en el proyecto
function calculateDistance(position1: Position, position2: Position): number {
  const dx = position1.x - position2.x;
  const dy = position1.y - position2.y;
  return Math.sqrt(dx * dx + dy * dy); // Distancia euclidiana
}

export class transitionToDribbler {
  constructor(private robots: FriendlyRobot[]) { }

  run() {
    const robots = this.robots;
    if (!robots || robots.length === 0) return;

    const ball = World.Ball; // Obtener la pelota correctamente
    if (!ball || !ball.pos) return; // Asegúrate de que la pelota exista

    // Manejo explícito del arquero: siempre ejecuta su skill y lo ignoramos para la transición
    const keeperId = World.FriendlyKeeper?.id;
    // Si conocemos el ID del arquero, buscamos ese robot específico. 
    // Si no (fallback), probamos con 0 o simplemente no hacemos nada especial más que lo genérico.
    const effectiveKeeperId = keeperId !== undefined ? keeperId : 0;

    const goalie = robots.find(r => r.id === effectiveKeeperId);
    if (goalie) {
      new Goalkeeping(goalie).run();
    }

    const ballPosition = ball.pos; // Posición de la pelota

    // Si la pelota está en el área defensiva, SOLO el arquero debe ir.
    // Los jugadores de campo no hacen nada (abortamos aquí para ellos).
    if (Field.isInFriendlyDefenseArea(ballPosition, 0)) {
      return;
    }

    let closestRobot: FriendlyRobot | null = null;
    let closestDistance = Infinity;

    // Recorrer los robots aliados y calcular la distancia a la pelota
    robots.forEach((robot) => {
      // Ignorar al arquero para que no salga a buscar la pelota lejos
      if (robot.id === effectiveKeeperId) return;

      const robotPosition = robot.pos; // Obtener la posición del robot
      const distance = calculateDistance(robotPosition, ballPosition);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestRobot = robot;
      }
    });

    // Si encontramos un robot cercano, le asignamos la tarea de moverse y activar el dribbler
    if (closestRobot) {
      this.moveToBall(closestRobot, ballPosition);
      (closestRobot as any).setDribblerSpeed(1.0); // Activar el dribbler
    }
  }

  private moveToBall(robot: FriendlyRobot, ballPosition: Position) {
    const targetRobotOrientation = robot.dir; // Usamos robot.dir en lugar de getOrientation()
    const moveToSkill = new MoveTo(robot);
    moveToSkill.run(ballPosition, targetRobotOrientation, 1.0); // Mover hacia la pelota
  }
}

import * as World from "base/world";
import * as Field from "base/field";
import { MoveTo } from "stp_vibes/skills/moveto";
import { Vector } from "base/vector";

export class Goalkeeping {
  private robot: any;

  constructor(robot: any) {
    this.robot = robot;
  }

  run(): void {
    const ball = World.Ball;
    if (!ball || !ball.pos) return;

    // 1. Si la pelota entra en el area, ir hacia ella y dar un pase (despejar)
    // Usamos margin 0 para el area defensiva
    if (Field.isInFriendlyDefenseArea(ball.pos, 0)) {
      // Moverse hacia la pelota ignorando el area defensiva para que se agreguen obstaculos de arco
      const angleToBall = Math.atan2(ball.pos.y - this.robot.pos.y, ball.pos.x - this.robot.pos.x);
      new MoveTo(this.robot).run(ball.pos, angleToBall, undefined, undefined, { ignoreDefenseArea: true });

      // Si esta cerca, patear (pase/despeje)
      if (this.robot.pos.distanceTo(ball.pos) < 0.2) {
        this.robot.shoot(5); // Potencia 5 m/s
      }
      return;
    }

    // Calcular posición objetivo del arquero
    const goalPos = World.Geometry.FriendlyGoal;
    let targetPos: Vector;

    // 2. Comportamiento según la posición de la pelota
    if (ball.pos.y < -1) {
      // Si la pelota está en nuestra mitad (o cerca), seguir la coordenada X
      // Limitamos X al ancho del arco (GoalWidth)
      const halfGoalWidth = World.Geometry.GoalWidth / 2;
      const limitedX = Math.max(-halfGoalWidth, Math.min(halfGoalWidth, ball.pos.x));
      // Nos paramos un poco adelante de la linea de gol (+0.2)
      targetPos = new Vector(limitedX, goalPos.y + 0.2);
    } else {
      // 3. Volver a su lugar inicial (medio del arco) si la pelota está lejos
      targetPos = new Vector(goalPos.x, goalPos.y + 0.2);
    }

    // 4. Rodear el arco:
    // Al pasar { ignoreDefenseArea: true }, el PathHelper agrega obstáculos para el arco (GoalObstacles).
    // Esto hace que si el robot está detrás del arco o a un lado, el pathfinder planifique una ruta alrededor de la red/postes.
    // Orientación: Mirando hacia el campo contrario (+Y, PI/2)
    new MoveTo(this.robot).run(targetPos, Math.PI / 2, undefined, undefined, { ignoreDefenseArea: true });
  }
}

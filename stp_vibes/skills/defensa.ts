// stp_vibes/skills/defense.ts
import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { MoveTo } from "stp_vibes/skills/moveto";
import { Vector } from "base/vector";

/**
 * DefenseStayAndMirrorX
 * - Mantiene al robot sobre Y = -3.5
 * - Si es SSL1 y ball.x ∈ [-1,0] => robot.x = ball.x
 * - Si es SSL2 y ball.x ∈ [0,1]  => robot.x = ball.x
 * - Si no, permanece en su X por defecto (−0.5 para SSL1, +0.5 para SSL2)
 * - La skill NO decide contexto ni asignación; eso lo hace la táctica
 */
export class defensa {
  private robot: FriendlyRobot;
  private readonly yLine = -3.0;
  private readonly defaultX: number;

  constructor(robot: FriendlyRobot) {
    this.robot = robot;
    // Posición base estable en la línea (podés ajustar):
    this.defaultX = (robot.id === 1) ? -0.5 : 0.5;
  }

  run(): void {
    const ball = World?.Ball?.pos;

    // X objetivo según reglas
    let targetX = this.defaultX;
    if (ball) {
      const bx = ball.x;
      if (this.robot.id === 1 && bx >= -1 && bx <= 0) {
        targetX = bx;
      } else if (this.robot.id === 2 && bx >= 0 && bx <= 1) {
        targetX = bx;
      }
      // Si la pelota está fuera de esas franjas, no se “engancha” y mantiene su X por defecto
    }

    const targetPos = new Vector(targetX, this.yLine);

    // Opcional: orientar mirando a la pelota si existe; de lo contrario, 0
    const angle = ball
      ? Math.atan2(ball.y - this.robot.pos.y, ball.x - this.robot.pos.x)
      : 0;

    new MoveTo(this.robot).run(targetPos, angle);
  }
}

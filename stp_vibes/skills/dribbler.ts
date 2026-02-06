import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { MoveTo } from "stp_vibes/skills/moveto";

export class DribblerSkill {
  constructor(private robot: FriendlyRobot) { }

  run(): void {
    // Verificar que la pelota sea válida
    if (!World.Ball.isPositionValid()) return;

    const ball = World.Ball.pos;
    const d = this.robot.pos.distanceTo(ball);

    // Activar dribbler si estamos cerca (a menos de 1m)
    this.robot.setDribblerSpeed(d <= 1.0 ? 1.0 : 0.0);

    // Calcular vector de dirección: Robot -> Pelota
    const dir = ball.sub(this.robot.pos).normalized();

    // Target DETRÁS de la pelota para forzar contacto
    const targetPos = ball.add(dir.mul(0.2));

    // La orientación debe ser la dirección hacia la pelota
    const theta = dir.angle();

    // Ejecutar movimiento
    const moveTo = new MoveTo(this.robot);

    // IMPORTANTE: Pasamos { ignoreBall: true } para que el planificador de rutas
    // NO considere la pelota como un obstáculo y nos permita chocarla/empujarla.
    // Argumentos: target, orientation, maxSpeed, endSpeed, obstacles
    moveTo.run(targetPos, theta, 1.5, undefined, { ignoreBall: true });
  }
}

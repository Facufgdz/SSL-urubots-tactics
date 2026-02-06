// stp_vibes/skills/presionar.ts
import * as World from "base/world";
import { Vector } from "base/vector";
import { MoveTo } from "stp_vibes/skills/moveto";
import { FriendlyRobot } from "base/robot";

function dist(a: Vector, b: Vector): number {
  const dx = (a?.x ?? 0) - (b?.x ?? 0);
  const dy = (a?.y ?? 0) - (b?.y ?? 0);
  return Math.hypot(dx, dy);
}

export class presionar {
  private mover: MoveTo | null = null;
  constructor(private robot: FriendlyRobot, private standoff: number = 0.5) {
    this.mover = new MoveTo(this.robot);
  }

  run() {
    const ball = (World as any)?.Ball?.pos as Vector | undefined;
    const opps = (World as any)?.OpponentRobots ?? [];
    if (!ball || !opps || opps.length === 0) return;

    // rival más cercano a la pelota
    let targetOpp = opps[0];
    let bestD = targetOpp?.pos ? dist(targetOpp.pos, ball) : Infinity;
    for (let i = 1; i < opps.length; i++) {
      const o = opps[i];
      if (!o?.pos) continue;
      const d = dist(o.pos, ball);
      if (d < bestD) { bestD = d; targetOpp = o; }
    }
    if (!targetOpp?.pos) return;

    // --- enfrente del dribbler según su heading ---
    const dir = (typeof targetOpp.dir === "number") ? targetOpp.dir : 0;
    const hx = Math.cos(dir), hy = Math.sin(dir);

    // si no hay heading confiable (raro), caemos a “entre rival y nuestro arco”
    let pressPoint = new Vector(
      targetOpp.pos.x + hx * this.standoff,
      targetOpp.pos.y + hy * this.standoff
    );

    // orientar mirando al dribbler
    const faceAngle = Math.atan2(
      targetOpp.pos.y - this.robot.pos.y,
      targetOpp.pos.x - this.robot.pos.x
    );

    this.mover!.run(new Vector(pressPoint.x, pressPoint.y), faceAngle);
  }
}

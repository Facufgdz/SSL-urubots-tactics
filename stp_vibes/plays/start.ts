// plays/start.ts
import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { log } from "base/amun";
import { defense } from "stp_vibes/tactics/defense";
import { transitionToDribbler } from "stp_vibes/tactics/transition";
import { Attack } from "stp_vibes/tactics/attack";

export class Start {
  private defense: defense | null = null;
  private transition: transitionToDribbler | null = null;
  private attack: Attack | null = null;

  // anti-spam para logs
  private lastLogMs = 0;
  private log(msg: string) {
    const now = Date.now();
    if (now - this.lastLogMs > 500) { // logea como máx. 2 veces por segundo
      log(`[TACTIC] ${msg}`);
      this.lastLogMs = now;
    }
  }

  run() {
    const robots: FriendlyRobot[] = (World as any).FriendlyRobots ?? [];
    if (robots.length === 0) return;

    const ball = (World as any).Ball?.pos;
    if (!ball) return;

    // ¿Algún aliado a ≤ 1 m de la pelota?
    const allyNear = robots.some((r) => {
      if (!r?.pos) return false;
      const dx = r.pos.x - ball.x;
      const dy = r.pos.y - ball.y;
      return dx * dx + dy * dy <= 1.0 * 1.0;
    });

    // ¿Algún rival a ≤ 0.5 m de la pelota? (tu umbral original)
    const opponents = (World as any).OpponentRobots ?? [];
    const R = 0.5;
    const r2 = R * R;
    const rivalCerca =
      opponents?.some((opp: any) => {
        if (!opp || opp.isVisible === false || !opp.pos) return false;
        const dx = opp.pos.x - ball.x;
        const dy = opp.pos.y - ball.y;
        return dx * dx + dy * dy <= r2;
      }) ?? false;

    // Prioridad: ATTACK si aliado cerca; si no, DEFENSE si rival cerca; si no, TRANSITION
    if (allyNear) {
      this.attack ??= new Attack(robots);
      this.log("→ Attack");
      this.attack.run();
      return;
    }

    if (rivalCerca) {
      this.defense ??= new defense(robots);
      this.log("→ Defense");
      this.defense.run();
      return;
    }

    this.transition ??= new transitionToDribbler(robots);
    this.log("→ Transition");
    this.transition.run();
  }
}

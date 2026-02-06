import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { MoveTo } from "stp_vibes/skills/moveto";
import * as geom from "base/geom";
// import * as vis from "base/vis";
import { Goalkeeping } from "stp_vibes/skills/goalkeeper";
import * as Field from "base/field";

export class Attack {
  // Estado para histeresis: guardamos si el robot ya estaba en modo disparo
  private isShooting = false;
  private lastCarrierId: number = -1;

  constructor(robots?: FriendlyRobot[]) { }

  run() {
    const robots = World.FriendlyRobots;
    const ballPos = World.Ball.pos;

    if (!World.Ball.isPositionValid() || robots.length === 0) return;

    // 1. Selección de Carrier (portador)
    let carrier: FriendlyRobot | undefined;
    let bestDist = Infinity;

    // Identificar al arquero dinámicamente
    const keeperId = World.FriendlyKeeper?.id;

    // Si la pelota está en el área, FORZAMOS que el carrier sea el arquero
    const isBallInDefenseArea = Field.isInFriendlyDefenseArea(ballPos, 0);

    for (const r of robots) {
      // Si la pelota está en el área, ignoramos a todos los que NO sean el arquero
      // Si keeperId no está definido, esto podría fallar, así que asumimos que si está en área solo el keeper debería ir.
      if (isBallInDefenseArea) {
        if (keeperId !== undefined && r.id !== keeperId) continue;
        // Fallback: si no tenemos keeper ID, tal vez deberíamos dejar que cualquiera vaya? 
        // O mejor: si definimos que "solo el arquero tiene superpoderes", y no sabemos quien es, nadie va?
        // Asumamos que FriendlyKeeper siempre está definido en partido.
      }

      const d = r.pos.distanceTo(ballPos);
      if (d < bestDist) {
        bestDist = d;
        carrier = r;
      }
    }

    if (!carrier) return;

    // Resetear estado si cambia el robot activo
    if (this.lastCarrierId !== carrier.id) {
      this.isShooting = false;
      this.lastCarrierId = carrier.id;
    }

    // 2. Selección de Objetivo (Pase vs Arco)
    const goal = World.Geometry.OpponentGoal;
    const carrierDistToGoal = carrier.pos.distanceTo(goal);

    let passTarget: FriendlyRobot | undefined;
    let minTeammateDist = carrierDistToGoal;

    for (const r of robots) {
      if (r.id === carrier.id) continue;
      const d = r.pos.distanceTo(goal);
      if (d < minTeammateDist - 1.0) { // Margen amplio para evitar indecisión
        minTeammateDist = d;
        passTarget = r;
      }
    }

    const targetPos = passTarget ? passTarget.pos : goal;
    const isPass = !!passTarget;

    // 3. Cálculo de Vectores
    const ballToTarget = targetPos.sub(ballPos).normalized();
    const behindBallPos = ballPos.sub(ballToTarget.mul(0.25));
    const robotToBall = ballPos.sub(carrier.pos);
    const distToBall = robotToBall.length();

    // 4. Lógica de Alineación con HISTERESIS
    const angleError = Math.abs(geom.getAngleDiff(robotToBall.angle(), ballToTarget.angle()));

    // Umbrales diferidos para entrar y salir del estado de disparo
    if (this.isShooting) {
      // CONDICIÓN DE SALIDA (Laxa):
      // Solo abortamos el disparo si nos alejamos mucho o perdemos totalmente la alineación
      if (distToBall > 0.50 || angleError > 0.60) {
        this.isShooting = false;
      }
    } else {
      // CONDICIÓN DE ENTRADA (Estricta):
      // Solo empezamos a disparar si estamos bien posicionados
      if (distToBall < 0.28 && angleError < 0.25) { // ~15 grados
        this.isShooting = true;
      }
    }

    if (this.isShooting) {
      // --- MODO DISPARO (SHOOT) ---
      // Empujamos con decisión a través de la pelota
      const shootRunTarget = ballPos.add(ballToTarget.mul(0.5));

      const moveTo = new MoveTo(carrier);
      moveTo.run(shootRunTarget, ballToTarget.angle(), 1.5, undefined, { ignoreBall: true });

      carrier.setDribblerSpeed(1.0);

      // Gatillamos el disparo si el ángulo es bueno
      const aimError = Math.abs(geom.getAngleDiff(carrier.dir, ballToTarget.angle()));
      if (aimError < 0.20) {
        carrier.shoot(isPass ? 2.5 : 4.0);
      }

    } else {
      // --- MODO APROXIMACIÓN (PREPARE) ---
      const moveTo = new MoveTo(carrier);
      const angleToBall = robotToBall.angle(); // Mirar hacia la bola

      moveTo.run(behindBallPos, angleToBall, 1.5);

      carrier.setDribblerSpeed(0.0);
    }
  }
}

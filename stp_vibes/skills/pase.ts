import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { Position } from "base/vector";
import { MoveTo } from "stp_vibes/skills/moveto";

export class PassSkill {
  private robot: FriendlyRobot;

  constructor(robot: FriendlyRobot) {
    this.robot = robot;
  }

  run(targetPosition: Position): void {
    const ball = World.Ball; // Obtener la pelota correctamente
    if (!ball || !ball.pos) return; // Asegúrate de que la pelota exista

    const ballPosition = ball.pos; // Posición de la pelota
    const robotPosition = this.robot.pos; // Posición del robot

    const distanceToBall = this.calculateDistance(robotPosition, ballPosition);

    // Si está lo suficientemente cerca, pasar la pelota
    if (distanceToBall <= 1.0) {
      this.robot.setDribblerSpeed(1.0); // Activar el dribbler
      this.passBall(targetPosition);
    } else {
      this.robot.setDribblerSpeed(0); // Desactivar el dribbler si está lejos
    }

    // Mover el robot hacia la pelota
    this.moveToBall(ballPosition);
  }

  private calculateDistance(position1: Position, position2: Position): number {
    const dx = position1.x - position2.x;
    const dy = position1.y - position2.y;
    return Math.sqrt(dx * dx + dy * dy); // Distancia euclidiana
  }

  private passBall(targetPosition: Position): void {
    // Alinea el robot hacia el compañero
    const deltaX = targetPosition.x - this.robot.pos.x;
    const deltaY = targetPosition.y - this.robot.pos.y;

    const targetOrientation = Math.atan2(deltaY, deltaX);

    // Ejecutar el pase con una potencia definida
    this.robot.shoot(0.8); // Pase raso con potencia ajustada

    // Si prefieres un pase elevado, usa chip()
    // this.robot.chip(0.8); // Pase con chip
  }

  private moveToBall(ballPosition: Position): void {
    const moveToSkill = new MoveTo(this.robot);
    const targetOrientation = Math.atan2(ballPosition.y - this.robot.pos.y, ballPosition.x - this.robot.pos.x);

    moveToSkill.run(ballPosition, targetOrientation, 1.0); // Mueve hacia la pelota y orienta el robot
  }
}

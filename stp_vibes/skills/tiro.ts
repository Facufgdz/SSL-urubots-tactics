import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { Position } from "base/vector";
import { MoveTo } from "stp_vibes/skills/moveto";

export class ShootSkill {
  private robot: FriendlyRobot;

  constructor(robot: FriendlyRobot) {
    this.robot = robot;
  }

  run(): void {
    const ball = World.Ball; // Obtener la pelota correctamente
    if (!ball || !ball.pos) return; // Asegúrate de que la pelota exista

    const ballPosition = ball.pos; // Posición de la pelota
    const robotPosition = this.robot.pos; // Posición del robot

    const distanceToBall = this.calculateDistance(robotPosition, ballPosition);

    // Si está lo suficientemente cerca, disparar al arco
    if (distanceToBall <= 1.0) {
      this.robot.setDribblerSpeed(1.0); // Activar el dribbler
      this.shootBall(ballPosition);
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

  private shootBall(ballPosition: Position): void {
    // Alinea el robot hacia el arco oponente
    const goalPosition = World.Geometry.OpponentGoal;
    const deltaX = goalPosition.x - ballPosition.x;
    const deltaY = goalPosition.y - ballPosition.y;

    const targetOrientation = Math.atan2(deltaY, deltaX);

    // Ejecutar el disparo con una potencia definida
    this.robot.shoot(1.0); // Disparo raso a máxima potencia

    // Si deseas un tiro elevado, utiliza chip() en lugar de shoot()
    // this.robot.chip(1.0); // Tiro con chip
  }

  private moveToBall(ballPosition: Position): void {
    const moveToSkill = new MoveTo(this.robot);
    const targetOrientation = Math.atan2(ballPosition.y - this.robot.pos.y, ballPosition.x - this.robot.pos.x);

    moveToSkill.run(ballPosition, targetOrientation, 1.0); // Mueve hacia la pelota y orienta el robot
  }
}

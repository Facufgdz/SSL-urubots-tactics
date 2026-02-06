import * as World from "base/world";
import { Vector } from "base/vector";
import { PassSkill } from "stp_vibes/skills/pase";
import { MoveTo } from "stp_vibes/skills/moveto";

export class FreeKick {
    constructor() { }

    run() {
        const state = World.RefereeState ?? "";
        const isOffensive = state.includes("Offensive");
        const ballPos = World.Ball.pos;
        const robots = World.FriendlyRobots;

        if (robots.length === 0) return;

        if (isOffensive) {
            // --- LÓGICA OFENSIVA: PASAR AL ALIADO MÁS CERCANO ---

            // 1. Encontrar el robot más cercano al balón para que haga el saque
            let nearestDist = Infinity;
            let kickerIndex = 0;

            for (let i = 0; i < robots.length; i++) {
                const dist = robots[i].pos.distanceTo(ballPos);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    kickerIndex = i;
                }
            }

            const kicker = robots[kickerIndex];

            // 2. Encontrar al compañero más cercano al pateador (que no sea él mismo)
            let nearestTeammateDist = Infinity;
            let targetTeammate = null;

            for (let i = 0; i < robots.length; i++) {
                if (i === kickerIndex) continue;
                const dist = robots[i].pos.distanceTo(kicker.pos);
                if (dist < nearestTeammateDist) {
                    nearestTeammateDist = dist;
                    targetTeammate = robots[i];
                }
            }

            // 3. Ejecutar el comportamiento
            for (let i = 0; i < robots.length; i++) {
                const robot = robots[i];

                if (i === kickerIndex) {
                    // El pateador usa PassSkill hacia el compañero más cercano
                    if (targetTeammate) {
                        new PassSkill(robot).run(targetTeammate.pos);
                    } else {
                        // Si no hay compañeros, solo se acerca al balón
                        new MoveTo(robot).run(ballPos, 0);
                    }
                } else {
                    // Los demás mantienen su posición o se alejan un poco para recibir
                    // Por ahora, se quedan parados donde están (MoveTo a su propia posición)
                    new MoveTo(robot).run(robot.pos, robot.dir);
                }
            }

        } else {
            // --- LÓGICA DEFENSIVA: QUEDARSE PARADOS ---
            // Simplemente mantenemos la posición actual para cada robot
            for (const robot of robots) {
                new MoveTo(robot).run(robot.pos, robot.dir);
            }
        }
    }
}

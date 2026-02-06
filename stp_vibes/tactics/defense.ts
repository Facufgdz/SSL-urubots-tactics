// tactics/defense.ts
import * as World from "base/world";
import { FriendlyRobot } from "base/robot";
import { Goalkeeping } from "stp_vibes/skills/goalkeeper";
import { presionar } from "stp_vibes/skills/presionar";
import { defensa } from "stp_vibes/skills/defensa";

export class defense {
  constructor(private robots: FriendlyRobot[]) { }

  run() {
    const robots = this.robots;
    if (!robots || robots.length === 0) return;

    // --- (SIN CAMBIOS) Golero como ya lo tenías ---
    // Usamos World.FriendlyKeeper para soportar ID dinámico (ej: ID 5 en amarillos)
    const keeper = World.FriendlyKeeper;
    if (keeper) new Goalkeeping(keeper).run();

    // === NUEVO: asignar skill de defensa a SSL1 y SSL2 ===
    const r1 = robots.find(r => r.id === 1);
    if (r1) new defensa(r1).run();

    const r2 = robots.find(r => r.id === 2);
    if (r2) new defensa(r2).run();

    // --- (SIN CAMBIOS) Presión como ya la tenías ---
    const r4 = robots.find(r => r.id === 4);
    if (r4) new presionar(r4).run();
  }
}

// stp_vibes/trainerstub.ts
import * as World from "base/world";
import type { RefereeStateType } from "base/world";

import { Halt } from "stp_vibes/plays/halt";
import { Start } from "stp_vibes/plays/start";
import { MoveCenter } from "stp_vibes/plays/movecenter";
import { KickOff } from "stp_vibes/plays/kickoff";
import { FreeKick } from "stp_vibes/plays/freekick";

type PlayLike = { run: () => void };

let currentPlay: PlayLike = new Halt();
let lastState: RefereeStateType = "";

function pickPlay(state: RefereeStateType): PlayLike {
  switch (state) {
    case "": return new Halt();       // Quietos al inicio
    case "Halt": return new Halt();
    case "Stop": return new Halt();       // No ir al centro en Stop
    case "Game": return new Start();      // START normal
    case "GameForce": return new Start();      // START forzado

    // Kickoff a favor: manejar PREPARE y EXECUTE con la misma play que ya tenés
    case "KickoffOffensivePrepare":
    case "KickoffOffensive": return new KickOff();

    // Tiros libres (Laterales, Corners, Fouls)
    case "DirectOffensive":
    case "IndirectOffensive":
    case "DirectDefensive":
    case "IndirectDefensive": return new FreeKick();

    // Fallback: mantener la play actual si llega otro estado que aún no mapeaste
    default: return currentPlay;
  }
}

export function main() {
  const state = World.RefereeState as RefereeStateType;

  if (state !== lastState) {
    const next = pickPlay(state);
    if (currentPlay?.constructor?.name !== next?.constructor?.name) {
      currentPlay = next;
    }
    lastState = state;
  }

  currentPlay.run();
}

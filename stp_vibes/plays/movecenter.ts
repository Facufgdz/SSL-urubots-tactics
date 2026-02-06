import * as World from "base/world";
import { MoveTo } from "stp_vibes/skills/moveto";
import { Vector } from "base/vector";

export class MoveCenter {

	constructor() {

	}

	run() {
		const robots = World.FriendlyRobots;

		for (const robot of robots) {
			new MoveTo(robot).run(new Vector(0, 0), 0);
		}
	}
}
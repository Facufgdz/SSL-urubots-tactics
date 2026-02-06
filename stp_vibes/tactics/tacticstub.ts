import { FriendlyRobot } from "base/robot";

export class Tacticstub {
	private robots: FriendlyRobot[];

	constructor(robots: FriendlyRobot[]) {
		this.robots = robots;
	}

	public run() {
		for (let robot of this.robots) {
			// Run skills here
		}
	}
}
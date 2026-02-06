import * as World from "base/world";

export class Halt {
	
	constructor() {
		
	}

	run() {
		for (let robot of World.FriendlyRobots) {
			if (robot.moveCommand == undefined) {
				robot.setStandby(true);
				robot.halt();
			}						
			// TODO HERE: Make calls to tactics or skills
		}
	}
}
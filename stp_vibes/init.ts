import "base/base";
import "base/entrypoints";
import * as debug from "base/debug";
import * as vis from "base/vis";
import * as plot from "base/plot";

import * as World from "base/world";
import * as EntryPoints from "base/entrypoints";
import { log } from "base/amun";
import { MoveTo } from "stp_vibes/skills/moveto";
import { Vector } from "base/vector";
import { main as trainer } from "stp_vibes/trainerstub";

function main(): boolean {
	amun.log("UruBots")
	//new MoveTo(World.FriendlyRobotsById[2]).run(new Vector(0,0), 0);

	//new Halt().run();
	
	//World.haltOwnRobots();

	trainer()

	return true;
}

EntryPoints.add("Demo", main);

function wrapper(func: () => boolean): () => void {
	function f() {
		World.update();

		func();

		// Call this function to pass robot commands set during the strategy run back to amun
		World.setRobotCommands();
		// Clear the debug tree. Otherwise old output would pile up
		debug.resetStack();
		plot._plotAggregated();
	}
	return f;
}

export let scriptInfo = { name: "UruBots Strategy", entrypoints: EntryPoints.get(wrapper) }

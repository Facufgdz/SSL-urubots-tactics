import { FriendlyRobot } from "base/robot";
import { CurvedMaxAccel } from "base/trajectory/curvedmaxaccel";
import { setDefaultObstaclesByTable, PathHelperParameters } from "base/trajectory/pathhelper";
import { Position, Vector } from "base/vector";

export class MoveTo {
	private robot: FriendlyRobot;

	constructor(robot: FriendlyRobot) {
		this.robot = robot;
	}

	// obstacles has an empty object as default, because that means none of the path helper parameters are set and the default is used
	// this includes the necessary obstacles for stop state and ball placement
	// maxSpeed is a helpful parameter to adjust for e.g. in stop state where the robots are not allowed to move faster than a certain speed
	run(targetPosition: Position, targetRobotOrientation: number, maxSpeed?: number, endSpeed?: Vector, obstacles: PathHelperParameters = {}) {
		setDefaultObstaclesByTable(this.robot.path, this.robot, obstacles);
		this.robot.trajectory.update(CurvedMaxAccel, targetPosition, targetRobotOrientation, maxSpeed, endSpeed);
	}
}
/**************************************************************************
*   Copyright 2023 Michael Eischer                                        *
*   Robotics Erlangen e.V.                                                *
*   http://www.robotics-erlangen.de/                                      *
*   info@robotics-erlangen.de                                             *
*                                                                         *
*   This program is free software: you can redistribute it and/or modify  *
*   it under the terms of the GNU General Public License as published by  *
*   the Free Software Foundation, either version 3 of the License, or     *
*   any later version.                                                    *
*                                                                         *
*   This program is distributed in the hope that it will be useful,       *
*   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
*   MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  See the         *
*   GNU General Public License for more details.                          *
*                                                                         *
*   You should have received a copy of the GNU General Public License     *
*   along with this program.  If not, see <http://www.gnu.org/licenses/>. *
**************************************************************************/


import * as Constants from "base/constants";
import * as Field from "base/field";
import * as geom from "base/geom";
import * as MathUtil from "base/mathutil";
import { Path } from "base/path";
import * as Referee from "base/referee";
import { FriendlyRobot, Robot } from "base/robot";
import { Position, Vector } from "base/vector";
import * as World from "base/world";

const G: Readonly<World.GeometryType> = World.Geometry;
const POSITION_PADDING = 0.02;
const SEED_ANGLE_MOD = geom.degreeToRadian(2);
const SEED_PREDICT_TIME = 0.5;

// this bool is a hack for the hardware challenge
// pls don't use if possible
// 0 is initialization phase
let hardwareChallenge: 0 | 1 | 2 | 3 | 4 | undefined = undefined;

export function setHardwareChallenge(challenge: 0 | 1 | 2 | 3 | 4 | undefined) {
	hardwareChallenge = challenge;
}

export function valueToRating(value: number, zero: number, one: number): number {
	return MathUtil.bound(0, (value - zero) / (one - zero), 1);
}

export const PRIORITIES = {
	GOAL: 100,
	STOP_EVACUATE_GOAL: 96,
	STOP_DEFENSE_AREA: 95,
	ROBOT: 92,
	// The obstacle in t/a/shoot should have the same priority as the ball obstacle here
	BALL: 84,
	OUT_OF_FIELD: 80,
	EVACUATE_GOAL: 76,
	// The obstacle in t/s/ballescort should have the same priority as the inner_ball obstacle here
	INNER_BALL: 68,
	OUTER_BALL: 66,
	BALL_PLACEMENT: 52,
	DEFENSE_AREA: 44,
	OPP_FIELD_HALF_INNER: 37,
	OPP_FIELD_HALF: 36,
	CATCH_BALL: 28,
	GOAL_SHOT: 20,
	PASS_MA_BALL: 13,
	PASS_BALL_STRIKER: 12
};

function addSeedTargets(path: Path, robot: FriendlyRobot) {
	if (path.addSeedTarget && robot.speed.length() > 0.1) {
		let angleMod = [-SEED_ANGLE_MOD, 0, SEED_ANGLE_MOD];
		for (let angle of angleMod) {
			let seedTarget = robot.pos + (robot.speed * SEED_PREDICT_TIME).rotated(angle);
			path.addSeedTarget(seedTarget.x, seedTarget.y);
			// vis.addPath("traj/pathhelper: seedTarget", { robot.pos, seedTarget }, vis.colors.blue)
		}
	}
}


const GOAL_AREA = [
	new Vector(-G.GoalWidth / 2 - 0.04, G.FieldHeightHalf + G.GoalDepth + 0.04),
	new Vector(G.GoalWidth / 2 + 0.04, G.FieldHeightHalf - G.GoalDepth - 0.04)
];
const GOAL_AREA_FRIENDLY = [
	-GOAL_AREA[0],
	-GOAL_AREA[1]
];
function addFriendlyDefenseAreaObstacle(path: Path, robot: FriendlyRobot) {
	// only keeper may enter friendly defense area
	// don't add obstacles for friendly defense area if the robot is in the opponent half
	// Excepción añadida: Robot ID 5 puede entrar (parche para portero amarillo)
	if (World.FriendlyKeeper !== robot && robot.id !== 5 && robot.pos.y < 0
		&& World.RefereeState !== "BallPlacementOffensive") {
		if (World.RULEVERSION === "2018") {
			path.addRect(G.FriendlyGoal.x - G.DefenseWidthHalf - POSITION_PADDING,
				G.FriendlyGoal.y - 1,
				G.FriendlyGoal.x + G.DefenseWidthHalf + POSITION_PADDING,
				G.FriendlyGoal.y + G.DefenseHeight + POSITION_PADDING,
				0, "DefenseArea", PRIORITIES.DEFENSE_AREA);
		} else {
			// line with round end caps
			path.addLine(G.FriendlyGoal.x - G.DefenseStretch / 2, G.FriendlyGoal.y,
				G.FriendlyGoal.x + G.DefenseStretch / 2, G.FriendlyGoal.y,
				G.DefenseRadius + POSITION_PADDING, "DefenseArea", PRIORITIES.DEFENSE_AREA);
		}
		if (geom.insideRect(GOAL_AREA_FRIENDLY[0], GOAL_AREA_FRIENDLY[1], robot.pos) || Field.isInFriendlyDefenseArea(robot.pos, robot.radius)) {
			path.addRect(GOAL_AREA_FRIENDLY[0].x, GOAL_AREA_FRIENDLY[0].y, GOAL_AREA_FRIENDLY[1].x, GOAL_AREA_FRIENDLY[1].y, 0, "EvacuateGoal", PRIORITIES.EVACUATE_GOAL);
		}
	}
}

function addOpponentDefenseAreaObstacle(path: Path, robot: FriendlyRobot, targetPosition: Position) {
	// don't add obstacles for opponent defense area if the robot is in the friendly half
	let oppDefAreaDist = Referee.isFriendlyFreeKickState() || Referee.isStopState() ? G.FreeKickDefenseDist + 0.05 : 0;
	const priority = oppDefAreaDist === 0 ? PRIORITIES.DEFENSE_AREA : PRIORITIES.STOP_DEFENSE_AREA;
	// TODO: adjust to rect with distance instead of larger rect
	let distance = oppDefAreaDist + POSITION_PADDING;
	if (robot.pos.y > 0 && (!Referee.isFriendlyPenaltyState()) &&
		World.RefereeState !== "BallPlacementOffensive" && hardwareChallenge !== 0) {
		if (World.RULEVERSION === "2018") {
			path.addRect(G.OpponentGoal.x - G.DefenseWidthHalf - distance,
				G.OpponentGoal.y - G.DefenseHeight - distance,
				G.OpponentGoal.x + G.DefenseWidthHalf + distance,
				G.OpponentGoal.y + 1,
				0, "DefenseArea", priority);
		} else {
			path.addLine(G.OpponentGoal.x - G.DefenseStretch / 2, G.OpponentGoal.y,
				G.OpponentGoal.x + G.DefenseStretch / 2, G.OpponentGoal.y,
				G.DefenseRadius + POSITION_PADDING, "DefenseArea", priority);
		}
		if (geom.insideRect(GOAL_AREA[0], GOAL_AREA[1], robot.pos) || Field.isInOpponentDefenseArea(robot.pos, robot.radius * 2)) {
			path.addRect(GOAL_AREA[0].x, GOAL_AREA[0].y, GOAL_AREA[1].x, GOAL_AREA[1].y, 0, "EvacuateGoal", priority === PRIORITIES.DEFENSE_AREA ? PRIORITIES.EVACUATE_GOAL : PRIORITIES.STOP_EVACUATE_GOAL);
		}
	}
}

function addOpponentFieldHalfObstacle(path: Path) {
	if (World.RefereeState === "KickoffOffensive") {
		path.addRect(-G.FieldWidthHalf - 0.5, G.FieldHeightHalf + 0.5,
			-G.CenterCircleRadius, 0.02, 0, "OppFieldHalf", PRIORITIES.OPP_FIELD_HALF);
		path.addRect(-G.CenterCircleRadius - 0.2, G.FieldHeightHalf + 0.5,
			G.CenterCircleRadius + 0.2, G.CenterCircleRadius, 0, "OppFieldHalf", PRIORITIES.OPP_FIELD_HALF_INNER);
		path.addRect(G.CenterCircleRadius, G.FieldHeightHalf + 0.5,
			G.FieldWidthHalf + 0.5, 0.02, 0, "OppFieldHalf", PRIORITIES.OPP_FIELD_HALF);
	} else {
		path.addRect(-G.FieldWidthHalf - 0.5, G.FieldHeightHalf + 0.5,
			G.FieldWidthHalf + 0.5, 0.02, 0, "OppFieldHalf", PRIORITIES.OPP_FIELD_HALF);
	}
}

function addZonedBallObstacles(robot: FriendlyRobot, innerBallDistance?: number, outerBallDistance?: number) {
	let ball = World.Ball;
	let distSq = robot.pos.distanceToSq(ball.pos);
	let outermost = Infinity;


	if (outerBallDistance != undefined) {
		outermost = outerBallDistance * outerBallDistance;
		robot.path.addCircle(ball.pos.x, ball.pos.y, ball.radius + outerBallDistance, "OuterBallObstacle", PRIORITIES.OUTER_BALL);
	}
	if (distSq < outermost && innerBallDistance != undefined) {
		outermost = innerBallDistance * innerBallDistance;
		if (ball.speed.length() >= 0.3) {
			let ballSpeedScale = ball.speed * 0.4;
			robot.path.addLine(ball.pos.x, ball.pos.y, ball.pos.x + ballSpeedScale.x, ball.pos.y + ballSpeedScale.y, ball.radius + innerBallDistance,
				"InnerBallObstacle", PRIORITIES.INNER_BALL);
		} else {
			robot.path.addCircle(ball.pos.x, ball.pos.y, ball.radius + innerBallDistance, "InnerBallObstacle", PRIORITIES.INNER_BALL);
		}
	}
	if (distSq < outermost) {
		robot.path.addCircle(ball.pos.x, ball.pos.y, ball.radius, "Ball", PRIORITIES.BALL);
	}
}

function addBallObstacle(robot: FriendlyRobot, ignoreBall?: boolean, stopBallDistance?: number, extraBallDistance?: number) {
	// Since I had some trouble figuring out the semantic when I changed this I'll document it here
	// (Even if it should be clear from the code now)
	// If we are in a defensive stop state, the ignoreBall parameter is ignored (because that is how it was before)
	// In the other two cases (ball placement and normal game), ignoreBall is considered.
	// If it is false, we don't want to set a stopDistance but still consider an eventual extraBallDistance
	// addZonedBallObstacles takes care of the undefined handling
	let isDefensiveStopState = Referee.isStopState() && World.RefereeState !== "BallPlacementOffensive" && hardwareChallenge !== 0;
	if (isDefensiveStopState) {
		if (stopBallDistance != undefined && extraBallDistance != undefined && stopBallDistance > extraBallDistance) {
			let temp = stopBallDistance;
			stopBallDistance = extraBallDistance;
			extraBallDistance = temp;
		}

		addZonedBallObstacles(robot, stopBallDistance, extraBallDistance);
	} else if (!ignoreBall) {
		addZonedBallObstacles(robot, undefined, extraBallDistance);
	}
}

function addGoalObstacle(path: Path, robot: FriendlyRobot, ignoreDefense: boolean, ignoreOppDefense: boolean) {
	const gw = G.GoalWallWidth / 2;
	// tasks like placeball may increase the field border for the pathfinding,
	// ensure that no robot tries to drive behind the goal
	const depth = G.GoalDepth + 0.5;
	// add goal obstacles for the field half the robot is in
	// TODO: wenn nicht keeper: eine fette linie oder so
	if (robot.pos.y < 0) {
		if (ignoreDefense) {
			path.addLine(G.FriendlyGoalLeft.x - gw, G.FriendlyGoalLeft.y - gw,
				G.FriendlyGoalLeft.x - gw, G.FriendlyGoalLeft.y - G.GoalDepth - gw, gw, "OwnGoal_Left", PRIORITIES.GOAL);
			path.addLine(G.FriendlyGoalRight.x + gw, G.FriendlyGoalRight.y - gw,
				G.FriendlyGoalRight.x + gw, G.FriendlyGoalRight.y - G.GoalDepth - gw, gw, "OwnGoal_Right", PRIORITIES.GOAL);
			path.addRect(G.FriendlyGoalLeft.x - G.GoalWallWidth, G.FriendlyGoalLeft.y - G.GoalDepth,
				G.FriendlyGoalRight.x + G.GoalWallWidth, G.FriendlyGoalRight.y - depth, 0, "OwnGoal_Back", PRIORITIES.GOAL);
		}
	} else if (ignoreOppDefense) {
		path.addLine(G.OpponentGoalLeft.x - gw, G.OpponentGoalLeft.y + gw,
			G.OpponentGoalLeft.x - gw, G.OpponentGoalLeft.y + G.GoalDepth + gw, gw, "OppGoal_Left", PRIORITIES.GOAL);
		path.addLine(G.OpponentGoalRight.x + gw, G.OpponentGoalRight.y + gw,
			G.OpponentGoalRight.x + gw, G.OpponentGoalRight.y + G.GoalDepth + gw, gw, "OppGoal_Right", PRIORITIES.GOAL);
		path.addRect(G.OpponentGoalLeft.x - G.GoalWallWidth, G.OpponentGoalLeft.y + G.GoalDepth,
			G.OpponentGoalRight.x + G.GoalWallWidth, G.OpponentGoalRight.y + depth, 0, "OppGoal_Back", PRIORITIES.GOAL);
	}
}

function addPenaltyObstacle(path: Path) {
	if (World.RefereeState === "PenaltyOffensivePrepare" || World.RefereeState === "PenaltyOffensive") {
		path.addRect(-G.FieldWidthHalf - 1, G.OpponentGoalRight.y + 1,
			G.FieldWidthHalf + 1, (G.OpponentGoalRight.y - (G.DefenseHeight + 0.45)), 0);
	}
}

function addBallPlacementObstacle(path: Path) {
	if (World.RefereeState === "BallPlacementOffensive" || World.RefereeState === "BallPlacementDefensive") {
		if (!World.BallPlacementPos) {
			throw new Error("Referee state ball placement without ballPlacementPos");
		}
		if (World.Ball.pos.distanceToSq(World.BallPlacementPos) > 0.001) {
			path.addLine(
				World.Ball.pos.x,
				World.Ball.pos.y,
				World.BallPlacementPos.x,
				World.BallPlacementPos.y,
				Constants.stopBallDistance + 0.1,
				"BallPlacement",
				PRIORITIES.BALL_PLACEMENT
			);
		} else {
			path.addCircle(World.Ball.pos.x, World.Ball.pos.y, Constants.stopBallDistance + 0.1, "BallPlacement");
		}
	}
}

function setDefaultObstacles(path: Path, robot: FriendlyRobot, targetPosition: Position, ignoreBall?: boolean, ignoreGoals?: boolean,
	ignoreDefenseArea?: boolean, radius: number = robot.radius, stopBallDistance: number = Constants.stopBallDistance + 0.05,
	noSeedTarget?: boolean, ignoreOpponentDefenseArea?: boolean, extraBallDistance?: number) {

	let forbidOppFieldHalf = Referee.isKickoffState();

	// set radius for path finding
	path.setRadius(radius);

	path.setOutOfFieldObstaclePriority(PRIORITIES.OUT_OF_FIELD);

	if (!noSeedTarget) {
		addSeedTargets(path, robot);
	}
	if (!ignoreDefenseArea && hardwareChallenge !== 4) {
		addFriendlyDefenseAreaObstacle(path, robot);
	}
	if (!ignoreOpponentDefenseArea && hardwareChallenge !== 4) {
		addOpponentDefenseAreaObstacle(path, robot, targetPosition);
	}
	if (forbidOppFieldHalf) {
		addOpponentFieldHalfObstacle(path);
	}
	addBallObstacle(robot, ignoreBall, stopBallDistance, extraBallDistance);

	if (!ignoreGoals) {
		addGoalObstacle(path, robot, ignoreDefenseArea || World.RefereeState === "BallPlacementOffensive", ignoreOpponentDefenseArea || World.RefereeState === "BallPlacementOffensive");
	}
}

function ignoreRobot(ownRobot: FriendlyRobot, robot: Robot): boolean {
	if (robot.speed.length() > 1 && ownRobot.pos.distanceTo(robot.pos) > 2) {
		return true;
	}
	return false;
}

function addMovingRobotObstacle(path: Path, otherRobot: Robot, safetyDistance: number) {
	const ACCELERATION = 3.0;
	const speedLength = otherRobot.speed.length();
	const brakeTime = speedLength / ACCELERATION;
	const brakePos = otherRobot.speed * (brakeTime * 0.5);
	path.addMovingCircle(0, brakeTime, otherRobot.pos, otherRobot.speed, -otherRobot.speed.withLength(ACCELERATION), otherRobot.radius + safetyDistance, PRIORITIES.ROBOT);
	if (brakeTime < 2) {
		path.addMovingCircle(brakeTime, 2, otherRobot.pos + brakePos, new Vector(0, 0), new Vector(0, 0), otherRobot.radius + safetyDistance, PRIORITIES.ROBOT);
	}
}

let robotWasSlowHysteresis = new Map<FriendlyRobot, boolean>();
function addRobotObstacles(path: Path, robot: FriendlyRobot, targetPosition: Position, ignoreFriendlyRobots?: boolean,
	ignoreOpponentRobots?: boolean, disableOpponentPrediction?: boolean, useCMA?: boolean) {
	// TODO. better robot prediction and time estimation
	// use 1 seconds for the navigation challenge
	let estimationTime = 0.1; // just a fixed time for now
	const SLOW_ROBOT = 0.3;
	const MAX_DISTANCE_TO_IGNORE = 3.5;
	if (!ignoreFriendlyRobots) {
		for (let r of World.FriendlyRobots) {
			if (r.id === robot.id) { // don't add current robot
				continue;
			}
			if (r.pos.distanceToLineSegment(robot.pos, targetPosition) > MAX_DISTANCE_TO_IGNORE) {
				continue;
			}
			if (useCMA || !r.path.lastFrameWasTrajectoryPath()) {
				if (ignoreRobot(robot, r)) {
					continue;
				}
				// use speed difference to calculate the safety distance
				let safetyDistance = MathUtil.bound(0, robot.speed.distanceTo(r.speed) * 0.05, 0.05);
				let estimatedPosition = r.pos + r.speed * estimationTime;
				// only use estimated position if it doesn't collide with the robot
				if (robot.pos.distanceToLineSegment(r.pos, estimatedPosition) >= robot.radius + r.radius
					&& r.pos.distanceTo(estimatedPosition) > 0.0001) {
					path.addLine(r.pos.x, r.pos.y, estimatedPosition.x, estimatedPosition.y,
						r.radius + safetyDistance, `OwnRobot_${r.id}`, PRIORITIES.ROBOT);
				} else {
					path.addCircle(r.pos.x, r.pos.y, r.radius + safetyDistance, `OwnRobot_${r.id}`, PRIORITIES.ROBOT);
				}
			} else {
				path.addFriendlyRobotObstacle(r, r.radius + 0.02, PRIORITIES.ROBOT);
			}
		}
	}
	if (disableOpponentPrediction) {
		estimationTime = 0;
	}
	if (!ignoreOpponentRobots) {

		const MAX_NO_FOUL_SPEED = 0.5;
		const FOUL_SPEED_HYSTERESIS = 0.1;

		let hystValue = robotWasSlowHysteresis[robot] ? FOUL_SPEED_HYSTERESIS : 0;
		let robotIsSlow = robot.speed.length() < MAX_NO_FOUL_SPEED + hystValue;
		robotWasSlowHysteresis[robot] = robotIsSlow;

		for (let r of World.OpponentRobots) {
			/** We may not use this if we're going to accelerate again */
			const willAccelerate = robot.pos.distanceTo(targetPosition) < MAX_NO_FOUL_SPEED / robot.acceleration.aBrakeFMax * 0.5 * MAX_NO_FOUL_SPEED;
			if (robotIsSlow && willAccelerate) {
				break;
			}

			if (ignoreRobot(robot, r)) {
				continue;
			}
			if (r.pos.distanceToLineSegment(robot.pos, targetPosition) > MAX_DISTANCE_TO_IGNORE) {
				continue;
			}
			// use speed difference to calculate the safety distance
			let safetyDistance = Math.max(0, valueToRating(robot.speed.distanceTo(r.speed), 0, 1.25) * 0.15 - 0.05);
			if (robot.speed.length() < 0.5) {
				safetyDistance = Math.min(safetyDistance, 0.02);
			}
			if (disableOpponentPrediction) { // be more aggressive
				safetyDistance = safetyDistance / 2;
			} else if (robot.speed.length() < SLOW_ROBOT && r.speed.length() < SLOW_ROBOT) {
				safetyDistance = safetyDistance - 0.02;
			}
			let estimatedPosition = r.pos + r.speed * estimationTime;
			// only use estimated position if it doesn't collide with the robot
			if (robot.pos.distanceToLineSegment(r.pos, estimatedPosition) >= robot.radius + r.radius
				&& r.pos.distanceTo(estimatedPosition) > 0.0001) {

				if (!useCMA && path.hasOpponentRobotObstacle()) {
					path.addOpponentRobotObstacle(r, PRIORITIES.ROBOT);
				} else {
					const absSpeed = r.speed.length();
					const brakeTime = absSpeed / r.acceleration.aBrakeFMax;
					if (brakeTime < estimationTime || useCMA) {
						// They can break in the estimation. This means that leavingTime would be INF.
						// TODO: we can trim the obstacle
						// For now, we keep the fixed obstacle
						path.addLine(r.pos.x, r.pos.y, estimatedPosition.x, estimatedPosition.y,
							r.radius + safetyDistance, `OwnRobot_${r.id}`, PRIORITIES.ROBOT);
					} else {
						// leavingTime is the time until the robot will have left the obstacle fully if he breaks as hard as possible.
						let leavingTime = (-absSpeed + Math.sqrt(absSpeed * absSpeed + 2 * r.acceleration.aBrakeFMax * (absSpeed * estimationTime + r.radius))) / r.acceleration.aBrakeFMax;
						path.addMovingLine(0, leavingTime, r.pos, new Vector(0, 0), new Vector(0, 0), estimatedPosition, new Vector(0, 0), new Vector(0, 0), r.radius + safetyDistance, PRIORITIES.ROBOT);
					}
					if (!robotIsSlow && !useCMA) {
						path.addMovingCircle(0, 0.8, r.pos, r.speed, new Vector(0, 0), r.radius + safetyDistance, PRIORITIES.ROBOT);
					}
				}

			} else {
				path.addCircle(r.pos.x, r.pos.y, r.radius + safetyDistance, `OppRobot_${r.id}`, PRIORITIES.ROBOT);
			}
		}
	}
}

export interface PathHelperParameters {
	ignoreBall?: boolean;
	ignoreGoals?: boolean;
	ignoreDefenseArea?: boolean;
	ignoreOpponentDefenseArea?: boolean;
	noSeedTarget?: boolean;
	ignoreFriendlyRobots?: boolean;
	ignoreOpponentRobots?: boolean;
	ignoreBallPlacementObstacle?: boolean;
	ignorePenaltyDistance?: boolean;
	disableOpponentPrediction?: boolean;
	pathRadius?: number;
	stopBallDistance?: number;
	extraBallDistance?: number;
	path?: Path;
}

export enum ParameterType {
	ignoreBall = "ignoreBall", ignoreGoals = "ignoreGoals", ignoreDefenseArea = "ignoreDefenseArea",
	ignoreOpponentDefenseArea = "ignoreOpponentDefenseArea", noSeedTarget = "noSeedTarget",
	ignoreFriendlyRobots = "ignoreFriendlyRobots", ignoreOpponentRobots = "ignoreOpponentRobots",
	ignoreBallPlacementObstacle = "ignoreBallPlacementObstacle", ignorePenaltyDistance = "ignorePenaltyDistance",
	disableOpponentPrediction = "disableOpponentPrediction", pathRadius = "pathRadius", stopBallDistance = "stopBallDistance",
	extraBallDistance = "extraBallDistance"
}

type BooleanParameterType = ParameterType.ignoreBall | ParameterType.ignoreGoals | ParameterType.ignoreOpponentDefenseArea |
	ParameterType.noSeedTarget | ParameterType.ignoreFriendlyRobots | ParameterType.ignoreOpponentRobots |
	ParameterType.ignoreBallPlacementObstacle | ParameterType.ignorePenaltyDistance | ParameterType.disableOpponentPrediction;

let obstacles: Map<FriendlyRobot, PathHelperParameters> = new Map<FriendlyRobot, PathHelperParameters>();

export function setObstacleParam(robot: FriendlyRobot, type: ParameterType.pathRadius, value: number): void;
export function setObstacleParam(robot: FriendlyRobot, type: ParameterType.stopBallDistance, value: number): void;
export function setObstacleParam(robot: FriendlyRobot, type: ParameterType.extraBallDistance, value: number): void;
export function setObstacleParam(robot: FriendlyRobot, type: BooleanParameterType, value: boolean): void;
export function setObstacleParam(robot: FriendlyRobot, type: ParameterType, value: any): void {
	if (!obstacles.has(robot)) {
		throw new Error(`setObstacleParam got called before setDefaultObstaclesByTable for robot ${robot.id}`);
	}
	(obstacles.get(robot) as PathHelperParameters)[type] = value;
}

export function getObstacleParam(robot: FriendlyRobot, type: BooleanParameterType): boolean;
export function getObstacleParam(robot: FriendlyRobot, type: ParameterType.pathRadius): number;
export function getObstacleParam(robot: FriendlyRobot, type: ParameterType.stopBallDistance): number;
export function getObstacleParam(robot: FriendlyRobot, type: ParameterType.extraBallDistance): number;
export function getObstacleParam(robot: FriendlyRobot, type: ParameterType): any {
	if (!obstacles.has(robot)) {
		throw new Error(`getObstacleParam got called before setDefaultObstaclesByTable for robot ${robot.id}`);
	}
	return (obstacles.get(robot) as { [name: string]: any })[type];
}

export function setDefaultObstaclesByTable(path: Path, robot: FriendlyRobot, params: PathHelperParameters) {
	if (!params) {
		throw new Error("setDefaultObstaclesByTable called with undefined parameter table");
	}

	path.clearObstacles();

	let obst = { ...params };
	obst["path"] = path || robot.path;
	obst["pathRadius"] = obst.pathRadius != undefined ? obst.pathRadius : robot.radius;
	obst["stopBallDistance"] = obst.stopBallDistance != undefined ? obst.stopBallDistance : Constants.stopBallDistance;
	obstacles.set(robot, obst);
}

export function insertObstacles(robot: FriendlyRobot, isCMA: boolean, targetPosition: Position) {
	if (!obstacles.has(robot)) {
		throw new Error("insertObstacles called without setDefaultObstacles");
	}
	let p = obstacles.get(robot) as PathHelperParameters & { path: Path };
	setDefaultObstacles(p.path, robot, targetPosition, p.ignoreBall, p.ignoreGoals, p.ignoreDefenseArea,
		p.pathRadius, p.stopBallDistance, p.noSeedTarget, p.ignoreOpponentDefenseArea, p.extraBallDistance);
	if (!p.ignoreBallPlacementObstacle) {
		addBallPlacementObstacle(p.path);
	}
	if (!p.ignorePenaltyDistance) {
		addPenaltyObstacle(p.path);
	}
	addRobotObstacles(p.path, robot, targetPosition, p.ignoreFriendlyRobots, p.ignoreOpponentRobots, p.disableOpponentPrediction, isCMA);

	// Clear obstacle params because obstacles gets kept over multiple frames
	obstacles.delete(robot);
}

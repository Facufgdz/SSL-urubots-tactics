export namespace SSL_Referee{export enum Command{
	HALT = "HALT",
	STOP = "STOP",
	NORMAL_START = "NORMAL_START",
	FORCE_START = "FORCE_START",
	PREPARE_KICKOFF_YELLOW = "PREPARE_KICKOFF_YELLOW",
	PREPARE_KICKOFF_BLUE = "PREPARE_KICKOFF_BLUE",
	PREPARE_PENALTY_YELLOW = "PREPARE_PENALTY_YELLOW",
	PREPARE_PENALTY_BLUE = "PREPARE_PENALTY_BLUE",
	DIRECT_FREE_YELLOW = "DIRECT_FREE_YELLOW",
	DIRECT_FREE_BLUE = "DIRECT_FREE_BLUE",
	INDIRECT_FREE_YELLOW = "INDIRECT_FREE_YELLOW",
	INDIRECT_FREE_BLUE = "INDIRECT_FREE_BLUE",
	TIMEOUT_YELLOW = "TIMEOUT_YELLOW",
	TIMEOUT_BLUE = "TIMEOUT_BLUE",
	GOAL_YELLOW = "GOAL_YELLOW",
	GOAL_BLUE = "GOAL_BLUE",
	BALL_PLACEMENT_YELLOW = "BALL_PLACEMENT_YELLOW",
	BALL_PLACEMENT_BLUE = "BALL_PLACEMENT_BLUE",
}}
export namespace amun{export enum DebuggerInputTarget{
	DITStrategyYellow = "DITStrategyYellow",
	DITStrategyBlue = "DITStrategyBlue",
	DITAutoref = "DITAutoref",
}}
export namespace amun{export enum PauseSimulatorReason{
	Ui = "Ui",
	WindowFocus = "WindowFocus",
	DebugBlueStrategy = "DebugBlueStrategy",
	DebugYellowStrategy = "DebugYellowStrategy",
	DebugAutoref = "DebugAutoref",
	Replay = "Replay",
	Horus = "Horus",
	Logging = "Logging",
}}
export namespace SSL_Referee_Game_Event{export enum Team{
	TEAM_UNKNOWN = "TEAM_UNKNOWN",
	TEAM_YELLOW = "TEAM_YELLOW",
	TEAM_BLUE = "TEAM_BLUE",
}}
export namespace SSL_Referee_Game_Event{export enum GameEventType{
	UNKNOWN = "UNKNOWN",
	CUSTOM = "CUSTOM",
	NUMBER_OF_PLAYERS = "NUMBER_OF_PLAYERS",
	BALL_LEFT_FIELD = "BALL_LEFT_FIELD",
	GOAL = "GOAL",
	KICK_TIMEOUT = "KICK_TIMEOUT",
	NO_PROGRESS_IN_GAME = "NO_PROGRESS_IN_GAME",
	BOT_COLLISION = "BOT_COLLISION",
	MULTIPLE_DEFENDER = "MULTIPLE_DEFENDER",
	MULTIPLE_DEFENDER_PARTIALLY = "MULTIPLE_DEFENDER_PARTIALLY",
	ATTACKER_IN_DEFENSE_AREA = "ATTACKER_IN_DEFENSE_AREA",
	ICING = "ICING",
	BALL_SPEED = "BALL_SPEED",
	ROBOT_STOP_SPEED = "ROBOT_STOP_SPEED",
	BALL_DRIBBLING = "BALL_DRIBBLING",
	ATTACKER_TOUCH_KEEPER = "ATTACKER_TOUCH_KEEPER",
	DOUBLE_TOUCH = "DOUBLE_TOUCH",
	ATTACKER_TO_DEFENCE_AREA = "ATTACKER_TO_DEFENCE_AREA",
	DEFENDER_TO_KICK_POINT_DISTANCE = "DEFENDER_TO_KICK_POINT_DISTANCE",
	BALL_HOLDING = "BALL_HOLDING",
	INDIRECT_GOAL = "INDIRECT_GOAL",
	BALL_PLACEMENT_FAILED = "BALL_PLACEMENT_FAILED",
	CHIP_ON_GOAL = "CHIP_ON_GOAL",
}}
export namespace SSL_Referee{export enum Stage{
	NORMAL_FIRST_HALF_PRE = "NORMAL_FIRST_HALF_PRE",
	NORMAL_FIRST_HALF = "NORMAL_FIRST_HALF",
	NORMAL_HALF_TIME = "NORMAL_HALF_TIME",
	NORMAL_SECOND_HALF_PRE = "NORMAL_SECOND_HALF_PRE",
	NORMAL_SECOND_HALF = "NORMAL_SECOND_HALF",
	EXTRA_TIME_BREAK = "EXTRA_TIME_BREAK",
	EXTRA_FIRST_HALF_PRE = "EXTRA_FIRST_HALF_PRE",
	EXTRA_FIRST_HALF = "EXTRA_FIRST_HALF",
	EXTRA_HALF_TIME = "EXTRA_HALF_TIME",
	EXTRA_SECOND_HALF_PRE = "EXTRA_SECOND_HALF_PRE",
	EXTRA_SECOND_HALF = "EXTRA_SECOND_HALF",
	PENALTY_SHOOTOUT_BREAK = "PENALTY_SHOOTOUT_BREAK",
	PENALTY_SHOOTOUT = "PENALTY_SHOOTOUT",
	POST_GAME = "POST_GAME",
}}
export enum SSL_FieldShapeType{
	Undefined = "Undefined",
	CenterCircle = "CenterCircle",
	TopTouchLine = "TopTouchLine",
	BottomTouchLine = "BottomTouchLine",
	LeftGoalLine = "LeftGoalLine",
	RightGoalLine = "RightGoalLine",
	HalfwayLine = "HalfwayLine",
	CenterLine = "CenterLine",
	LeftPenaltyStretch = "LeftPenaltyStretch",
	RightPenaltyStretch = "RightPenaltyStretch",
	LeftFieldLeftPenaltyStretch = "LeftFieldLeftPenaltyStretch",
	LeftFieldRightPenaltyStretch = "LeftFieldRightPenaltyStretch",
	RightFieldLeftPenaltyStretch = "RightFieldLeftPenaltyStretch",
	RightFieldRightPenaltyStretch = "RightFieldRightPenaltyStretch",
}
export namespace gameController{export namespace ControllerReply{export enum Verification{
	UNKNOWN_VERIFICATION = "UNKNOWN_VERIFICATION",
	VERIFIED = "VERIFIED",
	UNVERIFIED = "UNVERIFIED",
}}}
export namespace ssl{export namespace RobotPlan{export enum RobotRole{
	Default = "Default",
	Goalie = "Goalie",
	Defense = "Defense",
	Offense = "Offense",
}}}
export namespace gameController{export enum Team{
	UNKNOWN = "UNKNOWN",
	YELLOW = "YELLOW",
	BLUE = "BLUE",
}}
export namespace world{export enum WorldSource{
	INTERNAL_SIMULATION = "INTERNAL_SIMULATION",
	EXTERNAL_SIMULATION = "EXTERNAL_SIMULATION",
	REAL_LIFE = "REAL_LIFE",
}}
export namespace world{export namespace Geometry{export enum GeometryType{
	TYPE_2014 = "TYPE_2014",
	TYPE_2018 = "TYPE_2018",
}}}
export namespace robot{export namespace Command{export enum KickStyle{
	Linear = "Linear",
	Chip = "Chip",
}}}
export namespace amun{export namespace GameState{export enum State{
	Halt = "Halt",
	Stop = "Stop",
	Game = "Game",
	GameForce = "GameForce",
	KickoffYellowPrepare = "KickoffYellowPrepare",
	KickoffYellow = "KickoffYellow",
	PenaltyYellowPrepare = "PenaltyYellowPrepare",
	PenaltyYellow = "PenaltyYellow",
	PenaltyYellowRunning = "PenaltyYellowRunning",
	DirectYellow = "DirectYellow",
	IndirectYellow = "IndirectYellow",
	BallPlacementYellow = "BallPlacementYellow",
	KickoffBluePrepare = "KickoffBluePrepare",
	KickoffBlue = "KickoffBlue",
	PenaltyBluePrepare = "PenaltyBluePrepare",
	PenaltyBlue = "PenaltyBlue",
	PenaltyBlueRunning = "PenaltyBlueRunning",
	DirectBlue = "DirectBlue",
	IndirectBlue = "IndirectBlue",
	BallPlacementBlue = "BallPlacementBlue",
	TimeoutYellow = "TimeoutYellow",
	TimeoutBlue = "TimeoutBlue",
}}}
export namespace world{export namespace Geometry{export enum Division{
	A = "A",
	B = "B",
}}}
export namespace gameController{export enum AdvantageChoice{
	STOP = "STOP",
	CONTINUE = "CONTINUE",
}}
export namespace robot{export namespace Specs{export enum GenerationType{
	Regular = "Regular",
	Ally = "Ally",
}}}
export namespace gameController{export namespace GameEvent{export enum Type{
	UNKNOWN_GAME_EVENT_TYPE = "UNKNOWN_GAME_EVENT_TYPE",
	BALL_LEFT_FIELD_TOUCH_LINE = "BALL_LEFT_FIELD_TOUCH_LINE",
	BALL_LEFT_FIELD_GOAL_LINE = "BALL_LEFT_FIELD_GOAL_LINE",
	AIMLESS_KICK = "AIMLESS_KICK",
	ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA = "ATTACKER_TOO_CLOSE_TO_DEFENSE_AREA",
	DEFENDER_IN_DEFENSE_AREA = "DEFENDER_IN_DEFENSE_AREA",
	BOUNDARY_CROSSING = "BOUNDARY_CROSSING",
	KEEPER_HELD_BALL = "KEEPER_HELD_BALL",
	BOT_DRIBBLED_BALL_TOO_FAR = "BOT_DRIBBLED_BALL_TOO_FAR",
	BOT_PUSHED_BOT = "BOT_PUSHED_BOT",
	BOT_HELD_BALL_DELIBERATELY = "BOT_HELD_BALL_DELIBERATELY",
	BOT_TIPPED_OVER = "BOT_TIPPED_OVER",
	ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA = "ATTACKER_TOUCHED_BALL_IN_DEFENSE_AREA",
	BOT_KICKED_BALL_TOO_FAST = "BOT_KICKED_BALL_TOO_FAST",
	BOT_CRASH_UNIQUE = "BOT_CRASH_UNIQUE",
	BOT_CRASH_DRAWN = "BOT_CRASH_DRAWN",
	DEFENDER_TOO_CLOSE_TO_KICK_POINT = "DEFENDER_TOO_CLOSE_TO_KICK_POINT",
	BOT_TOO_FAST_IN_STOP = "BOT_TOO_FAST_IN_STOP",
	BOT_INTERFERED_PLACEMENT = "BOT_INTERFERED_PLACEMENT",
	POSSIBLE_GOAL = "POSSIBLE_GOAL",
	GOAL = "GOAL",
	INVALID_GOAL = "INVALID_GOAL",
	ATTACKER_DOUBLE_TOUCHED_BALL = "ATTACKER_DOUBLE_TOUCHED_BALL",
	PLACEMENT_SUCCEEDED = "PLACEMENT_SUCCEEDED",
	PENALTY_KICK_FAILED = "PENALTY_KICK_FAILED",
	NO_PROGRESS_IN_GAME = "NO_PROGRESS_IN_GAME",
	PLACEMENT_FAILED = "PLACEMENT_FAILED",
	MULTIPLE_CARDS = "MULTIPLE_CARDS",
	MULTIPLE_FOULS = "MULTIPLE_FOULS",
	BOT_SUBSTITUTION = "BOT_SUBSTITUTION",
	TOO_MANY_ROBOTS = "TOO_MANY_ROBOTS",
	CHALLENGE_FLAG = "CHALLENGE_FLAG",
	EMERGENCY_STOP = "EMERGENCY_STOP",
	UNSPORTING_BEHAVIOR_MINOR = "UNSPORTING_BEHAVIOR_MINOR",
	UNSPORTING_BEHAVIOR_MAJOR = "UNSPORTING_BEHAVIOR_MAJOR",
	PREPARED = "PREPARED",
	INDIRECT_GOAL = "INDIRECT_GOAL",
	CHIPPED_GOAL = "CHIPPED_GOAL",
	KICK_TIMEOUT = "KICK_TIMEOUT",
	ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA = "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA",
	ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED = "ATTACKER_TOUCHED_OPPONENT_IN_DEFENSE_AREA_SKIPPED",
	BOT_CRASH_UNIQUE_SKIPPED = "BOT_CRASH_UNIQUE_SKIPPED",
	BOT_PUSHED_BOT_SKIPPED = "BOT_PUSHED_BOT_SKIPPED",
	DEFENDER_IN_DEFENSE_AREA_PARTIALLY = "DEFENDER_IN_DEFENSE_AREA_PARTIALLY",
	MULTIPLE_PLACEMENT_FAILURES = "MULTIPLE_PLACEMENT_FAILURES",
}}}
export namespace gameController{export namespace ControllerReply{export enum StatusCode{
	UNKNOWN_STATUS_CODE = "UNKNOWN_STATUS_CODE",
	OK = "OK",
	REJECTED = "REJECTED",
}}}
export namespace amun{export namespace Pen{export enum Style{
	DashLine = "DashLine",
	DotLine = "DotLine",
	DashDotLine = "DashDotLine",
	DashDotDotLine = "DashDotDotLine",
}}}
export interface ProposedGameEvent{
	valid_until: number;
	proposer_id: string;
	game_event: gameController.GameEvent;
}
export interface GameEventProposalGroup{
	game_event?: gameController.GameEvent[];
	accepted?: boolean;
}
export interface SSL_Referee{
	packet_timestamp: number;
	stage: SSL_Referee.Stage;
	stage_time_left?: number;
	command: SSL_Referee.Command;
	command_counter: number;
	command_timestamp: number;
	yellow: SSL_Referee.TeamInfo;
	blue: SSL_Referee.TeamInfo;
	designated_position?: SSL_Referee.Point;
	blueTeamOnPositiveHalf?: boolean;
	gameEvent?: SSL_Referee_Game_Event;
	next_command?: SSL_Referee.Command;
	game_events_old?: gameController.GameEvent[];
	game_events?: gameController.GameEvent[];
	proposed_game_events?: ProposedGameEvent[];
	game_event_proposals?: GameEventProposalGroup[];
	source_identifier?: string;
	current_action_time_remaining?: number;
}
export interface RealismConfigErForce{
	stddev_ball_p?: number;
	stddev_robot_p?: number;
	stddev_robot_phi?: number;
	stddev_ball_area?: number;
	enable_invisible_ball?: boolean;
	ball_visibility_threshold?: number;
	camera_overlap?: number;
	dribbler_ball_detections?: number;
	camera_position_error?: number;
	robot_command_loss?: number;
	robot_response_loss?: number;
	missing_ball_detections?: number;
	vision_delay?: number;
	vision_processing_time?: number;
	simulate_dribbling?: boolean;
	object_position_offset?: number;
	missing_robot_detections?: number;
}
export namespace gameController{export interface BotId{
	id?: number;
	team?: gameController.Team;
}}
export namespace gameController{export interface Vector2{
	x: number;
	y: number;
}}
export namespace robot{export interface ControllerInput{
	spline?: robot.Spline[];
}}
export namespace robot{export interface SpeedVector{
	v_s?: number;
	v_f?: number;
	v_x?: number;
	v_y?: number;
	omega?: number;
}}
export namespace robot{export interface Command{
	controller?: robot.ControllerInput;
	v_f?: number;
	v_s?: number;
	omega?: number;
	kick_style?: robot.Command.KickStyle;
	kick_power?: number;
	dribbler?: number;
	local?: boolean;
	standby?: boolean;
	strategy_controlled?: boolean;
	force_kick?: boolean;
	network_controlled?: boolean;
	eject_sdcard?: boolean;
	cur_v_f?: number;
	cur_v_s?: number;
	cur_v_x?: number;
	cur_v_y?: number;
	cur_phi?: number;
	cur_omega?: number;
	output0?: robot.SpeedVector;
	output1?: robot.SpeedVector;
	output2?: robot.SpeedVector;
}}
export namespace robot{export interface Polynomial{
	a0: number;
	a1: number;
	a2: number;
	a3: number;
}}
export namespace robot{export interface Spline{
	t_start: number;
	t_end: number;
	x: robot.Polynomial;
	y: robot.Polynomial;
	phi: robot.Polynomial;
}}
export namespace robot{export interface LimitParameters{
	a_speedup_f_max?: number;
	a_speedup_s_max?: number;
	a_speedup_phi_max?: number;
	a_brake_f_max?: number;
	a_brake_s_max?: number;
	a_brake_phi_max?: number;
}}
export namespace robot{export interface SimulationLimits{
	a_speedup_wheel_max?: number;
	a_brake_wheel_max?: number;
}}
export namespace amun{export interface ImageVisualization{
	width: number;
	height: number;
	data: Uint8Array;
	draw_area?: amun.Rectangle;
}}
export namespace robot{export interface Specs{
	generation: number;
	year: number;
	id: number;
	type?: robot.Specs.GenerationType;
	radius?: number;
	height?: number;
	mass?: number;
	angle?: number;
	v_max?: number;
	omega_max?: number;
	shot_linear_max?: number;
	shot_chip_max?: number;
	dribbler_width?: number;
	acceleration?: robot.LimitParameters;
	strategy?: robot.LimitParameters;
	ir_param?: number;
	shoot_radius?: number;
	dribbler_height?: number;
	pattern_rotation?: number;
	simulation_limits?: robot.SimulationLimits;
	can_shoot?: boolean;
	can_dribble?: boolean;
	use_nrf?: boolean;
}}
export namespace amun{export interface Visualization{
	name: string;
	pen?: amun.Pen;
	brush?: amun.Color;
	width?: number;
	circle?: amun.Circle;
	polygon?: amun.Polygon;
	path?: amun.Path;
	background?: boolean;
	image?: amun.ImageVisualization;
}}
export namespace robot{export interface Team{
	robot?: robot.Specs[];
}}
export namespace ssl{export interface RobotPlan{
	robot_id: number;
	role?: ssl.RobotPlan.RobotRole;
	nav_target?: ssl.Pose;
	shot_target?: ssl.Location;
}}
export namespace ssl{export interface TeamPlan{
	plans?: ssl.RobotPlan[];
}}
export namespace robot{export interface SpeedStatus{
	v_f: number;
	v_s: number;
	omega: number;
}}
export namespace gameController{export namespace GameEvent{export interface IndirectGoal{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	kick_location?: gameController.Vector2;
}}}
export namespace gameController{export interface TeamRegistration{
	team_name: string;
	signature?: gameController.Signature;
}}
export interface SSL_FieldCircularArc{
	name: string;
	center: Vector2f;
	radius: number;
	a1: number;
	a2: number;
	thickness: number;
	type?: SSL_FieldShapeType;
}
export namespace gameController{export namespace GameEvent{export interface ChippedGoal{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	kick_location?: gameController.Vector2;
	max_ball_height?: number;
}}}
export namespace gameController{export interface TeamToController{
	signature?: gameController.Signature;
	desired_keeper?: number;
	advantage_choice?: gameController.AdvantageChoice;
	substitute_bot?: boolean;
	ping?: boolean;
}}
export interface SSL_GeometryFieldSize{
	field_length: number;
	field_width: number;
	goal_width: number;
	goal_depth: number;
	boundary_width: number;
	field_lines?: SSL_FieldLineSegment[];
	field_arcs?: SSL_FieldCircularArc[];
	penalty_area_depth?: number;
	penalty_area_width?: number;
}
export namespace gameController{export interface ControllerToTeam{
	controller_reply?: gameController.ControllerReply;
}}
export interface SSL_GeometryCameraCalibration{
	camera_id: number;
	focal_length: number;
	principal_point_x: number;
	principal_point_y: number;
	distortion: number;
	q0: number;
	q1: number;
	q2: number;
	q3: number;
	tx: number;
	ty: number;
	tz: number;
	derived_camera_world_tx?: number;
	derived_camera_world_ty?: number;
	derived_camera_world_tz?: number;
	pixel_image_width?: number;
	pixel_image_height?: number;
}
export namespace world{export interface State{
	time: number;
	ball?: world.Ball;
	yellow?: world.Robot[];
	blue?: world.Robot[];
	radio_response?: robot.RadioResponse[];
	is_simulated?: boolean;
	has_vision_data?: boolean;
	mixed_team_info?: ssl.TeamPlan;
	tracking_aoi?: world.TrackingAOI;
	simple_tracking_yellow?: world.Robot[];
	simple_tracking_blue?: world.Robot[];
	simple_tracking_ball?: world.Ball;
	reality?: world.SimulatorState[];
	vision_frames?: SSL_WrapperPacket[];
	vision_frame_times?: number[];
	system_delay?: number;
	world_source?: world.WorldSource;
}}
export interface SSL_BallModelStraightTwoPhase{
	acc_slide: number;
	acc_roll: number;
	k_switch: number;
}
export namespace gameController{export interface ControllerReply{
	status_code?: gameController.ControllerReply.StatusCode;
	reason?: string;
	next_token?: string;
	verification?: gameController.ControllerReply.Verification;
}}
export interface Vector2f{
	x: number;
	y: number;
}
export namespace robot{export interface ExtendedError{
	motor_1_error: boolean;
	motor_2_error: boolean;
	motor_3_error: boolean;
	motor_4_error: boolean;
	dribbler_error: boolean;
	kicker_error: boolean;
	kicker_break_beam_error?: boolean;
	motor_encoder_error?: boolean;
	main_sensor_error?: boolean;
	temperature?: number;
}}
export namespace world{export interface SimRobot{
	id: number;
	p_x: number;
	p_y: number;
	p_z: number;
	rotation: world.Quaternion;
	v_x: number;
	v_y: number;
	v_z: number;
	r_x: number;
	r_y: number;
	r_z: number;
	touches_ball?: boolean;
}}
export namespace world{export interface SimulatorState{
	blue_robots?: world.SimRobot[];
	yellow_robots?: world.SimRobot[];
	ball?: world.SimBall;
	time?: number;
}}
export interface SSL_BallModelChipFixedLoss{
	damping_xy_first_hop: number;
	damping_xy_other_hops: number;
	damping_z: number;
}
export namespace gameController{export interface Signature{
	token: string;
	pkcs1v15: Uint8Array;
}}
export interface SSL_DetectionBall{
	confidence: number;
	area?: number;
	x: number;
	y: number;
	z?: number;
	pixel_x: number;
	pixel_y: number;
}
export namespace SSL_Referee_Game_Event{export interface Originator{
	team: SSL_Referee_Game_Event.Team;
	botId?: number;
}}
export interface SSL_FieldLineSegment{
	name: string;
	p1: Vector2f;
	p2: Vector2f;
	thickness: number;
	type?: SSL_FieldShapeType;
}
export namespace robot{export interface RadioResponse{
	time?: number;
	generation: number;
	id: number;
	battery?: number;
	packet_loss_rx?: number;
	packet_loss_tx?: number;
	estimated_speed?: robot.SpeedStatus;
	ball_detected?: boolean;
	cap_charged?: boolean;
	error_present?: boolean;
	radio_rtt?: number;
	extended_error?: robot.ExtendedError;
	is_blue?: boolean;
}}
export namespace gameController{export namespace GameEvent{export interface BallLeftField{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
}}}
export namespace world{export interface SimBall{
	p_x: number;
	p_y: number;
	p_z: number;
	v_x: number;
	v_y: number;
	v_z: number;
	angular_x?: number;
	angular_y?: number;
	angular_z?: number;
}}
export namespace amun{export interface SimulatorWorstCaseVision{
	min_robot_detection_time?: number;
	min_ball_detection_time?: number;
}}
export namespace gameController{export namespace GameEvent{export interface BotCrashUnique{
	by_team: gameController.Team;
	violator?: number;
	victim?: number;
	location?: gameController.Vector2;
	crash_speed?: number;
	speed_diff?: number;
	crash_angle?: number;
}}}
export interface SSL_DetectionRobot{
	confidence: number;
	robot_id?: number;
	x: number;
	y: number;
	orientation?: number;
	pixel_x: number;
	pixel_y: number;
	height?: number;
}
export interface SSL_GeometryModels{
	straight_two_phase?: SSL_BallModelStraightTwoPhase;
	chip_fixed_loss?: SSL_BallModelChipFixedLoss;
}
export namespace ssl{export interface Location{
	x: number;
	y: number;
}}
export namespace world{export interface Quaternion{
	i: number;
	j: number;
	k: number;
	real: number;
}}
export namespace amun{export interface CommandSimulator{
	enable?: boolean;
	simulator_setup?: amun.SimulatorSetup;
	vision_worst_case?: amun.SimulatorWorstCaseVision;
	realism_config?: RealismConfigErForce;
	set_simulator_state?: world.SimulatorState;
	ssl_control?: sslsim.SimulatorControl;
}}
export namespace gameController{export namespace GameEvent{export interface BotPushedBot{
	by_team: gameController.Team;
	violator?: number;
	victim?: number;
	location?: gameController.Vector2;
	pushed_distance?: number;
}}}
export interface SSL_DetectionFrame{
	frame_number: number;
	t_capture: number;
	t_sent: number;
	camera_id: number;
	balls?: SSL_DetectionBall[];
	robots_yellow?: SSL_DetectionRobot[];
	robots_blue?: SSL_DetectionRobot[];
}
export interface SSL_GeometryData{
	field: SSL_GeometryFieldSize;
	calib?: SSL_GeometryCameraCalibration[];
	models?: SSL_GeometryModels;
}
export namespace ssl{export interface Pose{
	loc?: ssl.Location;
	heading?: number;
}}
export namespace world{export interface BallPosition{
	time: number;
	p_x: number;
	p_y: number;
	derived_z?: number;
	v_x?: number;
	v_y?: number;
	system_delay?: number;
	time_diff_scaled?: number;
	camera_id?: number;
	area?: number;
	vision_processing_time?: number;
}}
export namespace amun{export interface CommandControl{
	commands?: robot.RadioCommand[];
}}
export namespace gameController{export namespace GameEvent{export interface AttackerTouchedOpponentInDefenseArea{
	by_team: gameController.Team;
	by_bot?: number;
	victim?: number;
	location?: gameController.Vector2;
}}}
export namespace world{export interface Ball{
	p_x: number;
	p_y: number;
	p_z?: number;
	v_x: number;
	v_y: number;
	v_z?: number;
	touchdown_x?: number;
	touchdown_y?: number;
	is_bouncing?: boolean;
	max_speed?: number;
	raw?: world.BallPosition[];
}}
export namespace amun{export interface Rectangle{
	topleft: amun.Point;
	bottomright: amun.Point;
}}
export namespace amun{export namespace CommandStrategyAutomaticEntrypoints{export interface EntrypointForStage{
	stage: SSL_Referee.Stage;
	entry_point: string;
}}}
export namespace world{export interface Robot{
	id: number;
	p_x: number;
	p_y: number;
	phi: number;
	v_x: number;
	v_y: number;
	omega: number;
	raw?: world.RobotPosition[];
}}
export namespace world{export interface RobotPosition{
	time: number;
	p_x: number;
	p_y: number;
	phi: number;
	v_x?: number;
	v_y?: number;
	system_delay?: number;
	time_diff_scaled?: number;
	omega?: number;
	camera_id?: number;
	vision_processing_time?: number;
}}
export interface SSL_WrapperPacket{
	detection?: SSL_DetectionFrame;
	geometry?: SSL_GeometryData;
}
export namespace world{export interface TrackingAOI{
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}}
export namespace sslsim{export interface SimulatorControl{
	teleport_ball?: sslsim.TeleportBall;
	teleport_robot?: sslsim.TeleportRobot[];
	simulation_speed?: number;
}}
export namespace gameController{export namespace GameEvent{export interface EmergencyStop{
	by_team: gameController.Team;
}}}
export namespace sslsim{export interface TeleportRobot{
	id: gameController.BotId;
	x?: number;
	y?: number;
	orientation?: number;
	v_x?: number;
	v_y?: number;
	v_angular?: number;
	present?: boolean;
	by_force?: boolean;
}}
export namespace amun{export interface Command{
	simulator?: amun.CommandSimulator;
	referee?: amun.CommandReferee;
	set_team_blue?: robot.Team;
	set_team_yellow?: robot.Team;
	strategy_blue?: amun.CommandStrategy;
	strategy_yellow?: amun.CommandStrategy;
	strategy_autoref?: amun.CommandStrategy;
	control?: amun.CommandControl;
	transceiver?: amun.CommandTransceiver;
	tracking?: amun.CommandTracking;
	amun?: amun.CommandAmun;
	mixed_team_destination?: amun.HostAddress;
	robot_move_blue?: amun.RobotMoveCommand[];
	robot_move_yellow?: amun.RobotMoveCommand[];
	debugger_input?: amun.CommandDebuggerInput;
	pause_simulator?: amun.PauseSimulatorCommand;
	replay?: amun.CommandReplay;
	playback?: amun.CommandPlayback;
	record?: amun.CommandRecord;
}}
export namespace gameController{export namespace GameEvent{export interface ChallengeFlag{
	by_team: gameController.Team;
}}}
export namespace world{export interface Geometry{
	line_width: number;
	field_width: number;
	field_height: number;
	boundary_width: number;
	goal_width: number;
	goal_depth: number;
	goal_wall_width: number;
	center_circle_radius: number;
	defense_radius: number;
	defense_stretch: number;
	free_kick_from_defense_dist: number;
	penalty_spot_from_field_line_dist: number;
	penalty_line_from_spot_dist: number;
	goal_height: number;
	defense_width?: number;
	defense_height?: number;
	type?: world.Geometry.GeometryType;
	division?: world.Geometry.Division;
	ball_model?: world.BallModel;
	corner_block_cathetus_length?: number;
}}
export namespace gameController{export namespace GameEvent{export interface TooManyRobots{
	by_team: gameController.Team;
	num_robots_allowed?: number;
	num_robots_on_field?: number;
	ball_location?: gameController.Vector2;
}}}
export namespace gameController{export namespace GameEvent{export interface PenaltyKickFailed{
	by_team: gameController.Team;
	location?: gameController.Vector2;
}}}
export namespace amun{export interface GameState{
	stage: SSL_Referee.Stage;
	stage_time_left?: number;
	state: amun.GameState.State;
	yellow: SSL_Referee.TeamInfo;
	blue: SSL_Referee.TeamInfo;
	designated_position?: SSL_Referee.Point;
	game_event?: SSL_Referee_Game_Event;
	goals_flipped?: boolean;
	is_real_game_running?: boolean;
	current_action_time_remaining?: number;
	next_state?: amun.GameState.State;
	game_event_2019?: gameController.GameEvent[];
}}
export namespace amun{export interface TransceiverConfiguration{
	channel: number;
}}
export namespace gameController{export namespace GameEvent{export interface AttackerDoubleTouchedBall{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
}}}
export namespace gameController{export namespace GameEvent{export interface Goal{
	by_team: gameController.Team;
	kicking_team?: gameController.Team;
	kicking_bot?: number;
	location?: gameController.Vector2;
	kick_location?: gameController.Vector2;
	max_ball_height?: number;
	num_robots_by_team?: number;
	last_touch_by_team?: number;
	message?: string;
}}}
export namespace amun{export interface CommandTransceiver{
	enable?: boolean;
	charge?: boolean;
	configuration?: amun.TransceiverConfiguration;
	network_configuration?: amun.HostAddress;
	use_network?: boolean;
	simulator_configuration?: amun.SimulatorNetworking;
}}
export namespace gameController{export namespace GameEvent{export interface BotInterferedPlacement{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
}}}
export namespace gameController{export interface AutoRefRegistration{
	identifier: string;
	signature?: gameController.Signature;
}}
export namespace gameController{export namespace GameEvent{export interface BotTooFastInStop{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	speed?: number;
}}}
export namespace gameController{export interface AutoRefToController{
	signature?: gameController.Signature;
	game_event?: gameController.GameEvent;
}}
export namespace amun{export interface RobotMoveCommand{
	id: number;
	p_x?: number;
	p_y?: number;
}}
export namespace gameController{export namespace GameEvent{export interface DefenderTooCloseToKickPoint{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	distance?: number;
}}}
export namespace amun{export interface SimulatorSetup{
	geometry: world.Geometry;
	camera_setup?: SSL_GeometryCameraCalibration[];
}}
export namespace gameController{export interface ControllerToAutoRef{
	controller_reply?: gameController.ControllerReply;
}}
export namespace gameController{export namespace GameEvent{export interface BotCrashDrawn{
	bot_yellow?: number;
	bot_blue?: number;
	location?: gameController.Vector2;
	crash_speed?: number;
	speed_diff?: number;
	crash_angle?: number;
}}}
export namespace amun{export interface CommandReferee{
	active?: boolean;
	command?: Uint8Array;
	use_internal_autoref?: boolean;
	use_automatic_robot_exchange?: boolean;
}}
export namespace gameController{export namespace GameEvent{export interface BotTippedOver{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	ball_location?: gameController.Vector2;
}}}
export namespace logfile{export interface LogRequest{
	path: string;
}}
export namespace amun{export interface SimulatorNetworking{
	control_simulator: boolean;
	control_blue: boolean;
	control_yellow: boolean;
	port_blue: number;
	port_yellow: number;
}}
export namespace gameController{export namespace GameEvent{export interface BotHeldBallDeliberately{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	duration?: number;
}}}
export namespace world{export interface BallModel{
	fast_deceleration?: number;
	slow_deceleration?: number;
	switch_ratio?: number;
	z_damping?: number;
	xy_damping?: number;
}}
export namespace gameController{export namespace GameEvent{export interface BoundaryCrossing{
	by_team: gameController.Team;
	location?: gameController.Vector2;
}}}
export namespace gameController{export namespace GameEvent{export interface AimlessKick{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	kick_location?: gameController.Vector2;
}}}
export namespace amun{export interface Point{
	x: number;
	y: number;
}}
export namespace gameController{export namespace GameEvent{export interface PlacementSucceeded{
	by_team: gameController.Team;
	time_taken?: number;
	precision?: number;
	distance?: number;
}}}
export namespace amun{export interface Flag{
}}
export namespace amun{export interface Path{
	point?: amun.Point[];
}}
export namespace sslsim{export interface TeleportBall{
	x?: number;
	y?: number;
	z?: number;
	vx?: number;
	vy?: number;
	vz?: number;
	teleport_safely?: boolean;
	roll?: boolean;
	by_force?: boolean;
}}
export namespace gameController{export namespace GameEvent{export interface BotSubstitution{
	by_team: gameController.Team;
}}}
export namespace amun{export interface CommandRecord{
	use_logfile_location?: boolean;
	save_backlog?: amun.Flag;
	run_logging?: boolean;
	for_replay?: boolean;
	request_backlog?: number;
	overwrite_record_filename?: string;
}}
export namespace amun{export interface Polygon{
	point?: amun.Point[];
}}
export namespace gameController{export namespace GameEvent{export interface Prepared{
	time_taken?: number;
}}}
export namespace amun{export interface CommandPlayback{
	seek_time?: number;
	seek_packet?: number;
	seek_time_backwards?: number;
	playback_speed?: number;
	toggle_paused?: amun.Flag;
	run_playback?: boolean;
	log_path?: logfile.LogRequest;
	instant_replay?: amun.Flag;
	export_vision_log?: string;
	get_uid?: amun.Flag;
	find_logfile?: string;
	playback_limit?: number;
}}
export namespace gameController{export namespace GameEvent{export interface KeeperHeldBall{
	by_team: gameController.Team;
	location?: gameController.Vector2;
	duration?: number;
}}}
export namespace amun{export interface CommandReplay{
	enable?: boolean;
	enable_blue_strategy?: boolean;
	blue_strategy?: amun.CommandStrategy;
	enable_yellow_strategy?: boolean;
	yellow_strategy?: amun.CommandStrategy;
}}
export namespace amun{export interface Color{
	red?: number;
	green?: number;
	blue?: number;
	alpha?: number;
}}
export namespace gameController{export namespace GameEvent{export interface UnsportingBehaviorMinor{
	by_team: gameController.Team;
	reason: string;
}}}
export namespace amun{export interface CommandDebuggerInput{
	strategy_type: amun.DebuggerInputTarget;
	disable?: amun.CommandDebuggerInputDisable;
	queue_line?: amun.CommandDebuggerInputLine;
}}
export namespace amun{export interface Pen{
	style?: amun.Pen.Style;
	color?: amun.Color;
}}
export namespace gameController{export namespace GameEvent{export interface UnsportingBehaviorMajor{
	by_team: gameController.Team;
	reason: string;
}}}
export namespace amun{export interface PauseSimulatorCommand{
	reason: amun.PauseSimulatorReason;
	pause?: boolean;
	toggle?: boolean;
}}
export namespace amun{export interface UserInput{
	radio_command?: robot.RadioCommand[];
	move_command?: amun.RobotMoveCommand[];
}}
export namespace robot{export interface RadioCommand{
	generation: number;
	id: number;
	is_blue?: boolean;
	command: robot.Command;
	command_time?: number;
	use_nrf?: boolean;
}}
export namespace gameController{export interface GameEvent{
	type?: gameController.GameEvent.Type;
	origin?: string[];
	ball_left_field_touch_line?: gameController.GameEvent.BallLeftField;
	ball_left_field_goal_line?: gameController.GameEvent.BallLeftField;
	aimless_kick?: gameController.GameEvent.AimlessKick;
	attacker_too_close_to_defense_area?: gameController.GameEvent.AttackerTooCloseToDefenseArea;
	defender_in_defense_area?: gameController.GameEvent.DefenderInDefenseArea;
	boundary_crossing?: gameController.GameEvent.BoundaryCrossing;
	keeper_held_ball?: gameController.GameEvent.KeeperHeldBall;
	bot_dribbled_ball_too_far?: gameController.GameEvent.BotDribbledBallTooFar;
	bot_pushed_bot?: gameController.GameEvent.BotPushedBot;
	bot_held_ball_deliberately?: gameController.GameEvent.BotHeldBallDeliberately;
	bot_tipped_over?: gameController.GameEvent.BotTippedOver;
	attacker_touched_ball_in_defense_area?: gameController.GameEvent.AttackerTouchedBallInDefenseArea;
	bot_kicked_ball_too_fast?: gameController.GameEvent.BotKickedBallTooFast;
	bot_crash_unique?: gameController.GameEvent.BotCrashUnique;
	bot_crash_drawn?: gameController.GameEvent.BotCrashDrawn;
	defender_too_close_to_kick_point?: gameController.GameEvent.DefenderTooCloseToKickPoint;
	bot_too_fast_in_stop?: gameController.GameEvent.BotTooFastInStop;
	bot_interfered_placement?: gameController.GameEvent.BotInterferedPlacement;
	possible_goal?: gameController.GameEvent.Goal;
	goal?: gameController.GameEvent.Goal;
	invalid_goal?: gameController.GameEvent.Goal;
	attacker_double_touched_ball?: gameController.GameEvent.AttackerDoubleTouchedBall;
	placement_succeeded?: gameController.GameEvent.PlacementSucceeded;
	penalty_kick_failed?: gameController.GameEvent.PenaltyKickFailed;
	no_progress_in_game?: gameController.GameEvent.NoProgressInGame;
	placement_failed?: gameController.GameEvent.PlacementFailed;
	multiple_cards?: gameController.GameEvent.MultipleCards;
	multiple_fouls?: gameController.GameEvent.MultipleFouls;
	bot_substitution?: gameController.GameEvent.BotSubstitution;
	too_many_robots?: gameController.GameEvent.TooManyRobots;
	challenge_flag?: gameController.GameEvent.ChallengeFlag;
	emergency_stop?: gameController.GameEvent.EmergencyStop;
	unsporting_behavior_minor?: gameController.GameEvent.UnsportingBehaviorMinor;
	unsporting_behavior_major?: gameController.GameEvent.UnsportingBehaviorMajor;
	prepared?: gameController.GameEvent.Prepared;
	indirect_goal?: gameController.GameEvent.IndirectGoal;
	chipped_goal?: gameController.GameEvent.ChippedGoal;
	kick_timeout?: gameController.GameEvent.KickTimeout;
	attacker_touched_opponent_in_defense_area?: gameController.GameEvent.AttackerTouchedOpponentInDefenseArea;
	attacker_touched_opponent_in_defense_area_skipped?: gameController.GameEvent.AttackerTouchedOpponentInDefenseArea;
	bot_crash_unique_skipped?: gameController.GameEvent.BotCrashUnique;
	bot_pushed_bot_skipped?: gameController.GameEvent.BotPushedBot;
	defender_in_defense_area_partially?: gameController.GameEvent.DefenderInDefenseAreaPartially;
	multiple_placement_failures?: gameController.GameEvent.MultiplePlacementFailures;
}}
export namespace amun{export interface Circle{
	p_x: number;
	p_y: number;
	radius: number;
}}
export interface SSL_Referee_Game_Event{
	gameEventType: SSL_Referee_Game_Event.GameEventType;
	originator?: SSL_Referee_Game_Event.Originator;
	message?: string;
}
export namespace SSL_Referee{export interface Point{
	x: number;
	y: number;
}}
export namespace gameController{export namespace GameEvent{export interface NoProgressInGame{
	location?: gameController.Vector2;
	time?: number;
}}}
export namespace amun{export interface CommandDebuggerInputDisable{
}}
export namespace SSL_Referee{export interface TeamInfo{
	name: string;
	score: number;
	red_cards: number;
	yellow_card_times?: number[];
	yellow_cards: number;
	timeouts: number;
	timeout_time: number;
	goalie: number;
	foul_counter?: number;
	ball_placement_failures?: number;
	can_place_ball?: boolean;
	max_allowed_bots?: number;
	bot_substitution_intent?: boolean;
	ball_placement_failures_reached?: boolean;
}}
export namespace gameController{export namespace GameEvent{export interface KickTimeout{
	by_team: gameController.Team;
	location?: gameController.Vector2;
	time?: number;
}}}
export namespace amun{export interface CommandAmun{
	vision_port?: number;
	referee_port?: number;
	tracker_port?: number;
	change_option?: amun.CommandStrategyChangeOption;
}}
export namespace gameController{export namespace GameEvent{export interface BotDribbledBallTooFar{
	by_team: gameController.Team;
	by_bot?: number;
	start?: gameController.Vector2;
	end?: gameController.Vector2;
}}}
export namespace amun{export interface CommandStrategy{
	load?: amun.CommandStrategyLoad;
	close?: amun.CommandStrategyClose;
	reload?: boolean;
	auto_reload?: boolean;
	enable_debug?: boolean;
	debug?: amun.CommandStrategyTriggerDebugger;
	performance_mode?: boolean;
	start_profiling?: boolean;
	finish_and_save_profile?: string;
	tournament_mode?: boolean;
	automatic_entrypoints?: amun.CommandStrategyAutomaticEntrypoints;
}}
export namespace gameController{export namespace GameEvent{export interface DefenderInDefenseArea{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	distance?: number;
}}}
export namespace amun{export interface CommandStrategyAutomaticEntrypoints{
	mapping?: amun.CommandStrategyAutomaticEntrypoints.EntrypointForStage[];
}}
export namespace gameController{export namespace GameEvent{export interface BotKickedBallTooFast{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	initial_ball_speed?: number;
	chipped?: boolean;
}}}
export namespace amun{export interface CommandStrategyTriggerDebugger{
}}
export namespace gameController{export namespace GameEvent{export interface AttackerTouchedBallInDefenseArea{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	distance?: number;
}}}
export namespace amun{export interface CommandStrategyClose{
}}
export namespace gameController{export namespace GameEvent{export interface DefenderInDefenseAreaPartially{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	distance?: number;
	ball_location?: gameController.Vector2;
}}}
export namespace amun{export interface CommandStrategyLoad{
	filename: string;
	entry_point?: string;
}}
export namespace gameController{export namespace GameEvent{export interface PlacementFailed{
	by_team: gameController.Team;
	remaining_distance?: number;
}}}
export namespace amun{export interface CommandDebuggerInputLine{
	line?: string;
}}
export namespace gameController{export namespace GameEvent{export interface AttackerTooCloseToDefenseArea{
	by_team: gameController.Team;
	by_bot?: number;
	location?: gameController.Vector2;
	distance?: number;
	ball_location?: gameController.Vector2;
}}}
export namespace amun{export interface HostAddress{
	host: string;
	port: number;
}}
export namespace gameController{export namespace GameEvent{export interface MultiplePlacementFailures{
	by_team: gameController.Team;
}}}
export namespace amun{export interface CommandStrategyChangeOption{
	name: string;
	value: boolean;
}}
export namespace gameController{export namespace GameEvent{export interface MultipleFouls{
	by_team: gameController.Team;
}}}
export namespace amun{export interface CommandTracking{
	aoi_enabled?: boolean;
	aoi?: world.TrackingAOI;
	system_delay?: number;
	reset?: boolean;
	enable_virtual_field?: boolean;
	field_transform?: amun.VirtualFieldTransform;
	virtual_geometry?: world.Geometry;
	tracking_replay_enabled?: boolean;
	ball_model?: world.BallModel;
}}
export namespace gameController{export namespace GameEvent{export interface MultipleCards{
	by_team: gameController.Team;
}}}
export namespace amun{export interface VirtualFieldTransform{
	a11: number;
	a12: number;
	a21: number;
	a22: number;
	offsetX: number;
	offsetY: number;
}}

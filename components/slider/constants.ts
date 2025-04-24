import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const SLIDER_WIDTH = width * 0.9;
export const KNOB_SIZE = 60;
export const MAX_SLIDE = SLIDER_WIDTH - KNOB_SIZE * 0.5;
export const TRAIL_COUNT = 5;
export const FRICTION = 0.9;
export const TRAIL_COLORS = [
	"#1ca9c9",
	"#008080",
	"#FFA500",
	"#5F0A87",
	"#FF007F",
];

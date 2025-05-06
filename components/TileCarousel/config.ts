import { Dimensions } from "react-native";
import { data } from "./carousel-data";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const ITEM_WIDTH = SCREEN_WIDTH * 0.5;
export const ITEM_SPACING = 16;
export const SIDE_VISIBLE_ITEMS = 2;
export const TIMER_INTERVAL = 2000;
export const DOT_SIZE = 10;
export const DOT_SPACING = 3;
export const TOTAL_ITEMS = data.length ?? 7;

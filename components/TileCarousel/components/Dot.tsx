import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { useDotProgressAnimation } from "../hooks/useDotProgressAnimation";
import { DOT_SIZE, DOT_SPACING } from "../config";

interface DotProps {
	index: number;
	activeIndex: number;
	isSliderPaused: boolean;
	direction: number;
}

export const Dot = ({
	index,
	activeIndex,
	isSliderPaused,
	direction,
}: DotProps) => {
	const { dotStyle, dotInnerStyle } = useDotProgressAnimation({
		index,
		activeIndex,
		isSliderPaused,
		direction,
	});

	return (
		<Animated.View style={[styles.dot, dotStyle]}>
			<Animated.View style={[styles.dotInner, dotInnerStyle]} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	dot: {
		width: DOT_SIZE,
		height: DOT_SIZE,
		borderRadius: DOT_SIZE / 2,
		backgroundColor: "rgba(25, 25, 25, 0.25)",
		marginHorizontal: DOT_SPACING,
		overflow: "visible",
	},
	dotInner: {
		width: DOT_SIZE,
		height: DOT_SIZE,
		borderRadius: DOT_SIZE / 2,
		backgroundColor: "rgba(0, 0, 0, 1)",
	},
});

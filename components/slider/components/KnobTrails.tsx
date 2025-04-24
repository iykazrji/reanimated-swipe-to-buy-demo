import Animated, {
	SharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet } from "react-native";
import { TRAIL_COLORS, KNOB_SIZE } from "../constants";
import { TrailProps } from "./types";
import { useTrailAnimation } from "./hooks/useTrailAnimation";

const Trail = ({ index, knobTranslateX, color }: TrailProps) => {
	const { translateXOffset, animatedTrailWidth, opacity } = useTrailAnimation(
		{
			index,
			knobTranslateX,
		}
	);

	const trailStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: Math.max(0, translateXOffset.value) }],
		width: animatedTrailWidth.value,
		opacity: opacity.value,
		backgroundColor: color,
	}));

	return <Animated.View style={[styles.trail, trailStyle]} />;
};

interface KnobTrailsProps {
	knobTranslateX: SharedValue<number>;
}

export const KnobTrails = ({ knobTranslateX }: KnobTrailsProps) => {
	return (
		<>
			{TRAIL_COLORS.map((color, index) => (
				<Trail
					key={`trail-${index}`}
					index={index}
					knobTranslateX={knobTranslateX}
					color={color}
				/>
			))}
		</>
	);
};

const styles = StyleSheet.create({
	trail: {
		position: "absolute",
		width: KNOB_SIZE,
		height: KNOB_SIZE,
		borderRadius: KNOB_SIZE / 6,
		opacity: 1,
		zIndex: 2,
	},
});

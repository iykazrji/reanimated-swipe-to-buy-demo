import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { KNOB_SIZE } from "../constants";
import { KnobProps } from "./types";
import useKnobGesture from "./hooks/useKnobGesture";

export const Knob = ({ handleComplete, onKnobSwipe }: KnobProps) => {
	const { panGesture, translateX } = useKnobGesture({
		handleComplete,
		onKnobSwipe,
	});

	const sliderStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={[styles.knob, sliderStyle]}>
				<Animated.Text style={styles.knobIcon}>→</Animated.Text>
			</Animated.View>
		</GestureDetector>
	);
};

const styles = StyleSheet.create({
	knob: {
		width: KNOB_SIZE,
		height: KNOB_SIZE,
		borderRadius: KNOB_SIZE / 6,
		backgroundColor: "#000",
		justifyContent: "center",
		alignItems: "center",
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		zIndex: 5,
		position: "relative",
	},
	knobIcon: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});

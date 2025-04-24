import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, { SharedValue, useSharedValue } from "react-native-reanimated";
import { KnobTrails } from "./components/KnobTrails";
import { Knob } from "./components/Knob";
import { SLIDER_WIDTH, KNOB_SIZE } from "./constants";
import { useSliderAnimations } from "./hooks/useSliderAnimations";
import { SliderText } from "./components/SliderText";
import { BuyingText } from "./components/BuyingText";

export default function SlideToConfirm() {
	const knobTranslateX = useSharedValue(0);
	const isDragging = useSharedValue(false);

	const handleComplete = () => {
		console.log("Purchase completed!");
		// handle the actual purchase logic
	};

	const onKnobSwipe = (state: {
		translateX: SharedValue<number>;
		isDragging: SharedValue<boolean>;
	}) => {
		knobTranslateX.value = state.translateX.value;
		isDragging.value = state.isDragging.value;
	};

	const {
		slideToBuyContainerStyle,
		buyingContainerStyle,
		sliderTextStyle,
		buyingTextStyle,
	} = useSliderAnimations({
		knobTranslateX,
		isDragging,
	});

	return (
		<View style={styles.container}>
			<View style={styles.sliderContainer}>
				<Knob
					handleComplete={handleComplete}
					onKnobSwipe={onKnobSwipe}
				/>
				<KnobTrails knobTranslateX={knobTranslateX} />
				<SliderText
					containerStyle={slideToBuyContainerStyle}
					textStyle={sliderTextStyle}
				/>
				<BuyingText
					containerStyle={buyingContainerStyle}
					textStyle={buyingTextStyle}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
	},
	sliderContainer: {
		width: SLIDER_WIDTH,
		height: KNOB_SIZE,
		backgroundColor: "#e0e0e0",
		borderRadius: KNOB_SIZE / 6,
		padding: 0,
		justifyContent: "center",
		position: "relative",
		overflow: "hidden",
	},
});

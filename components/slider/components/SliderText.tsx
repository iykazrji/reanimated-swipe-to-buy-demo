import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";

interface SliderTextProps {
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
}

export const SliderText = ({ containerStyle, textStyle }: SliderTextProps) => {
	return (
		<Animated.View style={[styles.sliderTextWrapper, containerStyle]}>
			<Animated.Text style={[styles.sliderText, textStyle]}>
				Swipe to buy →
			</Animated.Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	sliderTextWrapper: {
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	sliderText: {
		color: "#666",
		fontSize: 20,
		fontWeight: "bold",
	},
});

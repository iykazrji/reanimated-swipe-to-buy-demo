import React from "react";
import { StyleSheet, TextStyle } from "react-native";
import Animated from "react-native-reanimated";
import { ViewStyle } from "react-native";

interface BuyingTextProps {
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
}

export const BuyingText = ({ containerStyle, textStyle }: BuyingTextProps) => {
	return (
		<Animated.View style={[styles.buyingTextWrapper, containerStyle]}>
			<Animated.Text style={[styles.buyingText, textStyle]}>
				Buying...
			</Animated.Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	buyingTextWrapper: {
		position: "absolute",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#76D8EA",
		height: "100%",
		zIndex: -1,
	},
	buyingText: {
		color: "#000",
		fontSize: 20,
		fontWeight: "bold",
	},
});

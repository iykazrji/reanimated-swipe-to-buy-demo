import React from "react";
import { View } from "react-native";
import Slider from "@/components/slider/Slider";

export default function SwipeToBuy() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Slider />
		</View>
	);
}

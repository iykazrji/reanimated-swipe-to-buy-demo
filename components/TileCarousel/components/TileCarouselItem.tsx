import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
	SharedValue,
	LinearTransition,
	useSharedValue,
	useAnimatedReaction,
	runOnJS,
	useAnimatedStyle,
} from "react-native-reanimated";

import { useCarouselItemAnimation } from "../hooks/useCarouselItemAnimation";
import { useImageAnimation } from "../hooks/useImageAnimation";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface CarouselItemProps {
	index: number;
	activeIndex: SharedValue<number>;
	itemWidth: number;
	itemSpacing: number;
	sideVisibleItems: number;
	item: CarouselItemData;
	offsetX: SharedValue<number>;
	slideDirection: SharedValue<number>;
}

export type CarouselItemData = {
	id: string;
	title: string;
	description: string;
	image: string;
};

export const CarouselItem: React.FC<CarouselItemProps> = ({
	index,
	itemWidth,
	itemSpacing,
	sideVisibleItems,
	slideDirection,
	item,
	offsetX,
	activeIndex,
}) => {
	const imageOpacity = useSharedValue(0);
	const { animatedStyle, rotationStyle } = useCarouselItemAnimation({
		index,
		itemWidth,
		itemSpacing,
		sideVisibleItems,
		offsetX,
		slideDirection,
	});

	const imageAnimatedStyle = useImageAnimation({ imageOpacity });

	const tileLayoutTransition = LinearTransition.springify()
		.damping(10)
		.stiffness(100);

	const zIndexAnimatedStyle = useAnimatedStyle(() => {
		const totalItems = 7; // This should match the number of items in your data array
		const currentActiveIndex = offsetX.value % totalItems;
		const distance = Math.abs(index - currentActiveIndex);

		const normalizedDistance = Math.min(distance, totalItems - distance);

		let zIndex = 0;
		if (normalizedDistance < 0.65) zIndex = 100;
		else if (normalizedDistance < 1.65) zIndex = 10;
		else if (normalizedDistance < 2.65) zIndex = 1;
		return {
			zIndex: zIndex,
		};
	});

	return (
		<Animated.View
			key={item.id}
			style={[
				{
					position: "absolute",
					width: itemWidth,
					height: itemWidth,
					justifyContent: "center",
					alignItems: "center",
				},
				zIndexAnimatedStyle,
				animatedStyle,
			]}
			renderToHardwareTextureAndroid
			shouldRasterizeIOS
		>
			<Animated.View
				style={[
					rotationStyle,
					{
						width: "100%",
						height: "100%",
						backgroundColor: "white",
						borderRadius: 8,
						padding: 5,
					},
				]}
				renderToHardwareTextureAndroid
				shouldRasterizeIOS
			>
				<Animated.Image
					source={{ uri: item.image }}
					style={[styles.image, imageAnimatedStyle]}
					layout={tileLayoutTransition}
				/>
			</Animated.View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: SCREEN_WIDTH,
		height: 300,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: 8,
	},
});

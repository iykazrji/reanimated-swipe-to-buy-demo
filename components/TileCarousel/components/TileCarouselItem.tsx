import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import Animated, {
	SharedValue,
	LinearTransition,
	useSharedValue,
	useAnimatedReaction,
	runOnJS,
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

	const [currentOffset, setCurrentOffset] = useState(0);

	const imageAnimatedStyle = useImageAnimation({ imageOpacity });

	const tileLayoutTransition = LinearTransition.springify()
		.damping(10)
		.stiffness(100);

	useAnimatedReaction(
		() => offsetX.value,
		(activeIndex, prevActiveIndex) => {
			if (activeIndex !== prevActiveIndex) {
				runOnJS(setCurrentOffset)(
					Math.round(Math.abs(index - activeIndex))
				);
			}
		}
	);

	const derivedZIndex = useMemo(() => {
		if (currentOffset === 0) return 100;
		if (currentOffset === 1) return 10;
		if (currentOffset === 2) return 1;
		return 0;
	}, [currentOffset]);

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
					zIndex: derivedZIndex,
				},
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

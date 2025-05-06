import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedReaction,
} from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { CarouselItem, CarouselItemData } from "./components/TileCarouselItem";
import { useCarouselGesture } from "./hooks/useCarouselGesture";
import { useCarouselTimer } from "./hooks/useCarouselTimer";
import { ITEM_WIDTH, ITEM_SPACING, SIDE_VISIBLE_ITEMS } from "./config";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
interface Carousel3DProps {
	data: CarouselItemData[];
	onCarouselChangeEvent: ({
		index,
		direction,
		isPaused,
	}: {
		index?: number;
		direction?: number;
		isPaused?: boolean;
	}) => void;
}

export function TileCarousel({ data, onCarouselChangeEvent }: Carousel3DProps) {
	const {
		gesture,
		activeIndex,
		offsetX,
		slideDirection,
		pauseSlider,
		setPauseSlider,
		scrollToIndex,
	} = useCarouselGesture({
		data,
		itemWidth: ITEM_WIDTH,
		itemSpacing: ITEM_SPACING,
		onCarouselChangeEvent,
	});

	useCarouselTimer({
		activeIndex,
		slideDirection,
		pauseSlider,
		setPauseSlider,
		scrollToIndex,
		data,
		offsetX,
		onCarouselChangeEvent,
	});

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={styles.container}>
				{data.map((item, index) => {
					return (
						<CarouselItem
							key={`${index}-${item.id}`}
							index={index}
							activeIndex={activeIndex}
							itemWidth={ITEM_WIDTH}
							itemSpacing={ITEM_SPACING}
							sideVisibleItems={SIDE_VISIBLE_ITEMS}
							item={item}
							offsetX={offsetX}
							slideDirection={slideDirection}
						/>
					);
				})}
			</Animated.View>
		</GestureDetector>
	);
}

const styles = StyleSheet.create({
	container: {
		width: SCREEN_WIDTH,
		height: ITEM_WIDTH,
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: 10,
	},
});

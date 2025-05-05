import { useState } from "react";
import { Gesture } from "react-native-gesture-handler";
import {
	useSharedValue,
	runOnJS,
	useAnimatedReaction,
	withSpring,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { CarouselItemData } from "../components/TileCarouselItem";

interface UseCarouselGestureProps {
	data: CarouselItemData[];
	itemWidth: number;
	itemSpacing: number;
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

export const useCarouselGesture = ({
	data,
	itemWidth,
	itemSpacing,
	onCarouselChangeEvent,
}: UseCarouselGestureProps) => {
	const fullItemWidth = itemWidth + itemSpacing;
	const activeIndex = useSharedValue(0);
	const offsetX = useSharedValue(0);
	const slideDirection = useSharedValue(1); // 1 for right, -1 for left
	const [pauseSlider, setPauseSlider] = useState(false);

	const gesture = Gesture.Pan()
		.onStart(() => {
			offsetX.value = activeIndex.value;
			runOnJS(setPauseSlider)(true);
		})
		.onUpdate((e) => {
			const dragProgress = -e.translationX / fullItemWidth;
			offsetX.value = withSpring(activeIndex.value + dragProgress, {
				stiffness: 100,
				damping: 10,
				mass: 1,
			});
			runOnJS(setPauseSlider)(true);
		})
		.onEnd((e) => {
			const dragProgress = -e.translationX / fullItemWidth;
			const newIndex = Math.round(activeIndex.value + dragProgress);

			if (newIndex < activeIndex.value) {
				slideDirection.value = -1;
			} else {
				slideDirection.value = 1;
			}

			activeIndex.value = Math.max(
				0,
				Math.min(data.length - 1, newIndex)
			);
			offsetX.value = withSpring(activeIndex.value, {
				stiffness: 100,
				damping: 100,
				mass: 1,
			});
			runOnJS(setPauseSlider)(false);
		});

	const scrollToIndex = (index: number) => {
		activeIndex.value = index;
		offsetX.value = withSpring(index, {
			stiffness: 50,
			damping: 200,
			mass: 1,
		});
	};

	useAnimatedReaction(
		() => activeIndex.value,
		(currentIndex) => {
			runOnJS(onCarouselChangeEvent)({
				index: currentIndex,
			});
		}
	);

	useAnimatedReaction(
		() => slideDirection.value,
		(direction) => {
			runOnJS(onCarouselChangeEvent)({
				direction,
			});
		}
	);

	return {
		gesture,
		activeIndex,
		offsetX,
		slideDirection,
		pauseSlider,
		setPauseSlider,
		scrollToIndex,
	};
};

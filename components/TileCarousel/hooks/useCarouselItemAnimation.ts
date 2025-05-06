import {
	useAnimatedStyle,
	interpolate,
	Extrapolation,
	withSpring,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { SharedValue } from "react-native-reanimated";
import { TOTAL_ITEMS } from "../config";

interface UseCarouselItemAnimationProps {
	index: number;
	itemWidth: number;
	itemSpacing: number;
	sideVisibleItems: number;
	slideDirection: SharedValue<number>;
	offsetX: SharedValue<number>;
}

export const useCarouselItemAnimation = ({
	index,
	itemWidth,
	itemSpacing,
	sideVisibleItems,
	slideDirection,
	offsetX,
}: UseCarouselItemAnimationProps) => {
	const fullItemWidth = itemWidth + itemSpacing;

	const animatedStyle = useAnimatedStyle(() => {
		// Calculate the visual position based on the continuous offset
		const visualPosition = offsetX.value % TOTAL_ITEMS;
		const itemVisualOffset =
			(index - visualPosition + TOTAL_ITEMS) % TOTAL_ITEMS;
		const normalizedOffset =
			itemVisualOffset > TOTAL_ITEMS / 2
				? itemVisualOffset - TOTAL_ITEMS
				: itemVisualOffset;
		const absoluteOffset = Math.abs(normalizedOffset);

		const forwardTranslateX = withSpring(
			interpolate(
				normalizedOffset,
				[-3, -2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2, 3],
				[
					-fullItemWidth * 0.5,
					-fullItemWidth * 0.6,
					-fullItemWidth * 0.35,
					-fullItemWidth * 0.35,
					-fullItemWidth * 0.4,
					0,
					fullItemWidth * 0.1,
					fullItemWidth * 0.25,
					fullItemWidth * 0.4,
					fullItemWidth * 0.6,
					fullItemWidth * 0.5,
				],
				Extrapolation.CLAMP
			),
			{
				mass: 1,
				damping: 100,
				stiffness: 300,
			}
		);

		const translateX = forwardTranslateX;

		const opacity = withTiming(
			interpolate(
				absoluteOffset,
				[sideVisibleItems, sideVisibleItems + 0.5],
				[1, 0],
				Extrapolation.CLAMP
			),
			{ duration: 10 }
		);
		return {
			transform: [
				{
					translateX,
				},
			],
			opacity,
		};
	});

	const rotationStyle = useAnimatedStyle(() => {
		// Calculate the visual position based on the continuous offset
		const visualPosition = offsetX.value % TOTAL_ITEMS;
		const itemVisualOffset =
			(index - visualPosition + TOTAL_ITEMS) % TOTAL_ITEMS;
		const normalizedOffset =
			itemVisualOffset > TOTAL_ITEMS / 2
				? itemVisualOffset - TOTAL_ITEMS
				: itemVisualOffset;

		const rotateY = interpolate(
			normalizedOffset,
			[-3, -2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2, 3],
			[30, 30, 30, 40, 35, 0, -25, -30, -30, -30, -30],
			Extrapolation.CLAMP
		);

		const scale = withSpring(
			interpolate(
				normalizedOffset,
				[-3, -2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2, 3],
				[0.65, 0.65, 0.75, 0.8, 0.9, 1, 0.9, 0.8, 0.75, 0.65, 0.65],
				Extrapolation.CLAMP
			),
			{
				mass: 1,
				damping: 100,
				stiffness: 300,
			}
		);

		return {
			transform: [
				{ perspective: 400 },
				{ rotateY: `${rotateY}deg` },
				{ scale },
			],
		};
	});

	return {
		animatedStyle,
		rotationStyle,
	};
};

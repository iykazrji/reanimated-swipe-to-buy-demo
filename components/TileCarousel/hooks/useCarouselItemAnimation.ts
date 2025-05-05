import { Platform } from "react-native";
import {
	useAnimatedStyle,
	interpolate,
	Extrapolation,
	withSpring,
	withTiming,
	Easing,
} from "react-native-reanimated";
import { SharedValue } from "react-native-reanimated";

const IS_IOS = Platform.OS === "ios";

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
		const offset = index - offsetX.value;
		const isActive = offset === 0;
		const absoluteOffset = Math.abs(offset);

		const forwardTranslateX = withSpring(
			interpolate(
				offset,
				[-2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2],
				[
					-fullItemWidth * 0.6,
					-fullItemWidth * 0.35,
					-fullItemWidth * 0.35,
					-fullItemWidth * 0.4,
					0,
					fullItemWidth * 0.1,
					fullItemWidth * 0.25,
					fullItemWidth * 0.4,
					fullItemWidth * 0.6,
				],
				Extrapolation.CLAMP
			),
			{
				mass: 1,
				damping: 100,
				stiffness: 300,
			}
		);
		const backwardTranslateX = withSpring(
			interpolate(
				offset,
				[-2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2],
				[
					-fullItemWidth * 0.6,
					-fullItemWidth * 0.35,
					-fullItemWidth * 0.25,
					-fullItemWidth * 0.1,
					0,
					fullItemWidth * 0.4,
					fullItemWidth * 0.35,
					fullItemWidth * 0.35,
					fullItemWidth * 0.6,
				],
				Extrapolation.CLAMP
			),
			{
				mass: 1,
				damping: 100,
				stiffness: 300,
			}
		);

		const translateX =
			slideDirection.value === 1 ? forwardTranslateX : backwardTranslateX;

		const zIndex = Math.round(
			interpolate(
				absoluteOffset,
				[0, 1, 2],
				[100, 10, 1],
				Extrapolation.CLAMP
			)
		);
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
		const offset = index - offsetX.value;
		const rotateY = interpolate(
			offset,
			[-2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2],
			[30, 30, 40, 35, 0, -25, -30, -30, -30],
			Extrapolation.CLAMP
		);

		const scale = withSpring(
			interpolate(
				offset,
				[-2, -1, -0.5, -0.25, 0, 0.25, 0.5, 1, 2],
				[0.65, 0.75, 0.8, 0.9, 1, 0.9, 0.8, 0.75, 0.65],
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

import { useEffect } from "react";
import {
	useSharedValue,
	useAnimatedReaction,
	withTiming,
	cancelAnimation,
	runOnJS,
	useAnimatedStyle,
	withSpring,
	withSequence,
} from "react-native-reanimated";
import { TIMER_INTERVAL, DOT_SIZE } from "../config";

interface UseDotProgressAnimationProps {
	index: number;
	activeIndex: number;
	isSliderPaused: boolean;
	direction: number;
}

export const useDotProgressAnimation = ({
	index,
	activeIndex,
	isSliderPaused,
	direction,
}: UseDotProgressAnimationProps) => {
	const isActive = useSharedValue(false);
	const dotProgress = useSharedValue(DOT_SIZE);

	useEffect(() => {
		isActive.value = activeIndex === index;
	}, [activeIndex]);

	const startDotProgressAnimation = (isActive: boolean) => {
		const forwardProgressConfig = withSequence(
			withTiming(DOT_SIZE, {
				duration: 0,
			}),
			withTiming(isActive ? DOT_SIZE * 4 : DOT_SIZE, {
				duration: isActive ? TIMER_INTERVAL : 0,
			})
		);
		const backwardProgressConfig = withSequence(
			withTiming(DOT_SIZE * 4, {
				duration: 0,
			}),
			withTiming(isActive ? DOT_SIZE : DOT_SIZE * 4, {
				duration: isActive ? TIMER_INTERVAL : 0,
			})
		);

		dotProgress.value =
			direction === 1 ? forwardProgressConfig : backwardProgressConfig;
	};

	useAnimatedReaction(
		() => isActive.value,
		(isActive, previousActiveState) => {
			if (isActive !== previousActiveState) {
				runOnJS(startDotProgressAnimation)(isActive);
			}
		}
	);

	useEffect(() => {
		if (isSliderPaused) {
			cancelAnimation(dotProgress);
		} else {
			startDotProgressAnimation(isActive.value);
		}
	}, [isSliderPaused]);

	const dotStyle = useAnimatedStyle(() => ({
		width: withSpring(isActive.value ? DOT_SIZE * 4 : DOT_SIZE, {
			mass: 4,
			damping: 200,
			stiffness: 450,
		}),
	}));

	const dotInnerStyle = useAnimatedStyle(() => ({
		width: dotProgress.value,
		opacity: isActive.value ? 1 : 0,
	}));

	return {
		isActive,
		dotProgress,
		dotStyle,
		dotInnerStyle,
	};
};

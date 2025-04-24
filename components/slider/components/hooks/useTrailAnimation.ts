import {
	SharedValue,
	useDerivedValue,
	interpolate,
} from "react-native-reanimated";
import { TRAIL_COUNT, MAX_SLIDE, KNOB_SIZE } from "../../constants";

interface UseTrailAnimationProps {
	index: number;
	knobTranslateX: SharedValue<number>;
}

export const useTrailAnimation = ({
	index,
	knobTranslateX,
}: UseTrailAnimationProps) => {
	const trailIndex = TRAIL_COUNT - index;

	const slideProgress = useDerivedValue(() => {
		return 1 - (MAX_SLIDE - knobTranslateX.value) / MAX_SLIDE;
	});

	const translateXOffset = useDerivedValue(() => {
		return interpolate(
			slideProgress.value,
			[0, 0.25, 1],
			[
				knobTranslateX.value,
				knobTranslateX.value - KNOB_SIZE * 1.5 * trailIndex,
				knobTranslateX.value,
			]
		);
	});

	const animatedTrailWidth = useDerivedValue(() => {
		return interpolate(
			knobTranslateX.value,
			[0, MAX_SLIDE * 0.25, MAX_SLIDE],
			[KNOB_SIZE, KNOB_SIZE * 2.05, KNOB_SIZE]
		);
	});

	const opacity = useDerivedValue(() => {
		return knobTranslateX.value > 0 ? 1 : 0;
	});

	return {
		translateXOffset,
		animatedTrailWidth,
		opacity,
	};
};

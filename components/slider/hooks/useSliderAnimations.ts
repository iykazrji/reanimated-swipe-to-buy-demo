import {
	SharedValue,
	useAnimatedStyle,
	withSpring,
	interpolate,
	Extrapolation,
} from "react-native-reanimated";
import { SLIDER_WIDTH, MAX_SLIDE, KNOB_SIZE } from "../constants";

interface UseSliderAnimationsProps {
	knobTranslateX: SharedValue<number>;
	isDragging: SharedValue<boolean>;
}

export const useSliderAnimations = ({
	knobTranslateX,
	isDragging,
}: UseSliderAnimationsProps) => {
	const sliderTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			knobTranslateX.value,
			[0, MAX_SLIDE * 0.8],
			[1, 0],
			Extrapolation.CLAMP
		);

		return {
			opacity,
		};
	});

	const buyingTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			knobTranslateX.value,
			[MAX_SLIDE * 0.5, MAX_SLIDE],
			[0.15, 1],
			Extrapolation.CLAMP
		);

		return {
			opacity,
		};
	});

	const slideToBuyContainerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: withSpring(
					isDragging.value ? knobTranslateX.value * 0.65 : 0
				),
			},
		],
	}));

	const buyingContainerStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: interpolate(
					knobTranslateX.value,
					[0, MAX_SLIDE * 1.05],
					[-SLIDER_WIDTH, 0],
					Extrapolation.CLAMP
				),
			},
		],
	}));

	return {
		sliderTextStyle,
		buyingTextStyle,
		slideToBuyContainerStyle,
		buyingContainerStyle,
	};
};

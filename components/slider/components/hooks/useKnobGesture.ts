import { Gesture } from "react-native-gesture-handler";
import {
	useSharedValue,
	withSpring,
	runOnJS,
	useDerivedValue,
} from "react-native-reanimated";
import { MAX_SLIDE, KNOB_SIZE, FRICTION } from "../../constants";
import { setAnimatedTimeout } from "@/utils/setAnimatedTimeout";
import { KnobProps } from "../types";

const useKnobGesture = (props: KnobProps) => {
	const translateX = useSharedValue(0);
	const isDragging = useSharedValue(false);
	const contextX = useSharedValue(0);
	const lastTranslation = useSharedValue(0);
	const resetSlider = () => {
		translateX.value = withSpring(0);
	};

	const panGesture = Gesture.Pan()
		.onBegin(() => {
			isDragging.value = true;
			contextX.value = translateX.value;
			lastTranslation.value = 0;
		})
		.onUpdate((event) => {
			// Calculate friction by taking only a percentage of the movement
			const delta = event.translationX - lastTranslation.value;
			const frictionDelta = delta * FRICTION;

			// Update the last translation for next calculation
			lastTranslation.value = event.translationX;

			// Apply the friction delta to the current position
			const newValue = Math.max(
				0,
				Math.min(translateX.value + frictionDelta, MAX_SLIDE)
			);
			translateX.value = newValue;
		})
		.onEnd(() => {
			isDragging.value = false;

			if (translateX.value > MAX_SLIDE - KNOB_SIZE * 0.65) {
				translateX.value = withSpring(MAX_SLIDE + KNOB_SIZE * 1.5);

				runOnJS(props.handleComplete)();

				// Reset after 2 seconds
				setAnimatedTimeout(() => {
					runOnJS(resetSlider)();
				}, 2000);
			} else {
				translateX.value = withSpring(0);
			}
		});

	useDerivedValue(() => {
		runOnJS(props.onKnobSwipe)({
			translateX,
			isDragging,
		});
	}, [translateX, isDragging]);

	return {
		panGesture,
		translateX,
	};
};

export default useKnobGesture;

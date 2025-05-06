import { useEffect } from "react";
import { useSharedValue, runOnJS, withSpring } from "react-native-reanimated";
import { CarouselItemData } from "../components/TileCarouselItem";
import { TIMER_INTERVAL } from "../config";

interface UseCarouselTimerProps {
	activeIndex: { value: number };
	slideDirection: { value: number };
	pauseSlider: boolean;
	setPauseSlider: (value: boolean) => void;
	scrollToIndex: (index: number) => void;
	data: CarouselItemData[];
	offsetX: { value: number };
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

export const useCarouselTimer = ({
	activeIndex,
	slideDirection,
	pauseSlider,
	setPauseSlider,
	scrollToIndex,
	data,
	offsetX,
	onCarouselChangeEvent,
}: UseCarouselTimerProps) => {
	const timer = useSharedValue<number | null>(null);

	useEffect(() => {
		onCarouselChangeEvent({
			isPaused: pauseSlider,
		});
	}, [pauseSlider]);

	const startTimer = () => {
		"worklet";
		setPauseSlider(false);
		return setInterval(() => {
			"worklet";
			if (pauseSlider) return;
			const totalItems = data.length;
			let nextIndex = offsetX.value + slideDirection.value;
			const normalizedIndex = (nextIndex + totalItems) % totalItems;

			// Update activeIndex with normalized value but keep offsetX continuous
			activeIndex.value = normalizedIndex;
			offsetX.value = withSpring(nextIndex, {
				stiffness: 50,
				damping: 200,
				mass: 1,
			});
		}, TIMER_INTERVAL);
	};

	useEffect(() => {
		if (pauseSlider) {
			timer.value && runOnJS(clearInterval)(timer.value);
			timer.value = null;
			return;
		}
		timer.value = startTimer();

		return () => {
			if (timer.value) {
				clearInterval(timer.value);
			}
		};
	}, [pauseSlider]);
};

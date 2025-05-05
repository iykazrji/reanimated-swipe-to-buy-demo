import { useEffect } from "react";
import { useSharedValue, runOnJS } from "react-native-reanimated";
import { CarouselItemData } from "../components/TileCarouselItem";
import { TIMER_INTERVAL } from "../config";

interface UseCarouselTimerProps {
	activeIndex: { value: number };
	slideDirection: { value: number };
	pauseSlider: boolean;
	setPauseSlider: (value: boolean) => void;
	scrollToIndex: (index: number) => void;
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

export const useCarouselTimer = ({
	activeIndex,
	slideDirection,
	pauseSlider,
	setPauseSlider,
	scrollToIndex,
	data,
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
			let nextIndex = activeIndex.value + slideDirection.value;

			if (nextIndex >= data.length) {
				slideDirection.value = -1;
				nextIndex = data.length - 2;
			} else if (nextIndex < 0) {
				slideDirection.value = 1;
				nextIndex = 1;
			}

			scrollToIndex(nextIndex);
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

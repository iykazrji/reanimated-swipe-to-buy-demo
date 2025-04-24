import { SharedValue } from "react-native-reanimated";

export interface TrailProps {
	index: number;
	knobTranslateX: SharedValue<number>;
	color: string;
}

export interface KnobState {
	translateX: SharedValue<number>;
	isDragging: SharedValue<boolean>;
}

export interface KnobProps {
	handleComplete: () => void;
	onKnobSwipe: (state: KnobState) => void;
}

import { useEffect } from "react";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { SharedValue } from "react-native-reanimated";

interface UseImageAnimationProps {
	imageOpacity: SharedValue<number>;
}

export const useImageAnimation = ({ imageOpacity }: UseImageAnimationProps) => {
	useEffect(() => {
		imageOpacity.value = withTiming(1, { duration: 1000 });
	}, []);

	const imageAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: imageOpacity.value,
		};
	});

	return imageAnimatedStyle;
};

import { View } from "react-native";
import { TileCarousel } from "@/components/TileCarousel/TileCarousel";
import { CarouselPagination } from "@/components/TileCarousel/components/CarouselPagination";
import { useState } from "react";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";
import { data } from "@/components/TileCarousel/carousel-data";
export default function Carousel() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [pauseSlider, setPauseSlider] = useState(false);
	const [direction, setDirection] = useState(1);

	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<View style={{ flex: 1 }}>
				<Animated.View
					style={{
						marginHorizontal: 20,
						marginVertical: 20,
					}}
				>
					{/* Title Text */}
					<SlideTitle
						title={data[activeIndex].title}
						id={data[activeIndex].id}
					/>
					<SlideDescription
						description={data[activeIndex].description}
						id={data[activeIndex].id}
					/>
				</Animated.View>
				<TileCarousel
					data={data}
					onCarouselChangeEvent={({ index, direction, isPaused }) => {
						if (index !== undefined)
							setActiveIndex(Math.round(index));
						if (direction !== undefined) setDirection(direction);
						if (isPaused !== undefined) setPauseSlider(isPaused);
					}}
				/>
				<CarouselPagination
					activeIndex={activeIndex}
					totalItems={data.length}
					isSliderPaused={pauseSlider}
					direction={direction}
				/>
			</View>
		</View>
	);
}

const SlideTitle = ({ title, id }: { title: string; id: string }) => {
	return (
		<Animated.Text
			key={id}
			layout={LinearTransition.springify()}
			entering={FadeIn}
			exiting={FadeOut}
			style={{ fontSize: 30, fontWeight: "bold" }}
		>
			{title}
		</Animated.Text>
	);
};

const SlideDescription = ({
	description,
	id,
}: {
	description: string;
	id: string;
}) => {
	return (
		<Animated.Text
			key={id}
			layout={LinearTransition.springify()}
			entering={FadeIn}
			exiting={FadeOut}
			style={{ fontSize: 16, marginTop: 10 }}
		>
			{description}
		</Animated.Text>
	);
};

import { View, Text } from "react-native";
import { TileCarousel } from "@/components/TileCarousel/TileCarousel";
import { CarouselPagination } from "@/components/TileCarousel/components/CarouselPagination";
import { useState } from "react";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";
const data = [
	{
		id: "1",
		index: 0,
		title: "Mountain Retreat",
		description: "Scenic views and peaceful surroundings",
		image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
	},
	{
		id: "2",
		index: 1,
		title: "Beach Paradise",
		description: "Crystal clear waters and white sand beaches",
		image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb",
	},
	{
		id: "3",
		index: 2,
		title: "Urban Adventure",
		description: "Discover the secrets of the city",
		image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
	},
	{
		id: "4",
		index: 3,
		title: "Forest Escape",
		description: "Get lost in the tranquility of nature",
		image: "https://images.unsplash.com/photo-1511497584788-876760111969",
	},
	{
		id: "5",
		index: 4,
		title: "Desert Oasis",
		description: "Experience the beauty of arid landscapes",
		image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
	},
	{
		id: "6",
		index: 5,
		title: "Mountain Retreat",
		description: "Scenic views and peaceful surroundings",
		image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
	},
	{
		id: "7",
		index: 6,
		title: "Beach Paradise",
		description: "Crystal clear waters and white sand beaches",
		image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb",
	},
	// {
	// 	id: "8",
	// 	title: "Urban Adventure",
	// 	description: "Discover the secrets of the city",
	// 	image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
	// },
	// {
	// 	id: "9",
	// 	title: "Forest Escape",
	// 	description: "Get lost in the tranquility of nature",
	// 	image: "https://images.unsplash.com/photo-1511497584788-876760111969",
	// },
	// {
	// 	id: "10",
	// 	title: "Desert Oasis",
	// 	description: "Experience the beauty of arid landscapes",
	// 	image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
	// },
];

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

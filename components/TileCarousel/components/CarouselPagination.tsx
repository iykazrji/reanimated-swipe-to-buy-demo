import { View, StyleSheet } from "react-native";
import { Dot } from "./Dot";

interface CarouselPaginationProps {
	activeIndex: number;
	totalItems: number;
	isSliderPaused: boolean;
	direction: number;
}

export function CarouselPagination({
	activeIndex,
	totalItems,
	isSliderPaused,
	direction,
}: CarouselPaginationProps) {
	return (
		<View style={styles.container}>
			{Array.from({ length: totalItems }).map((_, index) => (
				<Dot
					key={index}
					index={index}
					activeIndex={activeIndex}
					isSliderPaused={isSliderPaused}
					direction={direction}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
});

import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Swipe to buy Animation",
					tabBarIcon: ({ color }) => (
						<Text style={styles.tabBarIcon}>📦</Text>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "blue" : "gray",
								fontWeight: focused ? "bold" : "normal",
							}}
						>
							Swipe to buy
						</Text>
					),
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										color={
											Colors[colorScheme ?? "light"].text
										}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="carousel"
				options={{
					title: "Carousel",
					tabBarIcon: ({ color }) => (
						<Text style={styles.tabBarIcon}>🎠</Text>
					),
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "blue" : "gray",
								fontWeight: focused ? "bold" : "normal",
							}}
						>
							Carousel
						</Text>
					),
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										color={
											Colors[colorScheme ?? "light"].text
										}
										style={{
											marginRight: 15,
											opacity: pressed ? 0.5 : 1,
										}}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBarIcon: {
		fontSize: 24,
	},
});

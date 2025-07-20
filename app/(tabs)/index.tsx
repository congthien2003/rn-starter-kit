import { StyleSheet, View } from "react-native";

import { AppText, ImageCarousel } from "@/components";
import { commonStyles } from "@/styles/common";
import Animated, { FadeIn } from "react-native-reanimated";

const mockImages = [
	{
		id: "1",
		uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
	},
	{
		id: "2",
		uri: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
	},
	{
		id: "3",
		uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
	},
	{
		id: "4",
		uri: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
	},
	{
		id: "5",
		uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
	},
];

export default function HomeScreen() {
	return (
		<Animated.ScrollView style={commonStyles.container}>
			<Animated.View style={styles.hero}>
				<View style={styles.titleContainer}>
					<AppText variant="h2">Welcome to my starter app</AppText>
				</View>
				<View style={styles.hero}>
					<ImageCarousel images={mockImages} height={250} />
				</View>
				<View style={styles.cardContainer}>
					<Animated.View style={styles.cardItems}>
						<AppText variant="h3">Caloríe</AppText>
						<AppText
							style={{
								fontSize: 15,
							}}>
							1000
						</AppText>
						<AppText>Kcal</AppText>
					</Animated.View>
					<Animated.View style={styles.cardItems} entering={FadeIn}>
						<AppText variant="h3">Caloríe</AppText>
						<AppText
							style={{
								fontSize: 15,
							}}>
							1000
						</AppText>
						<AppText>Kcal</AppText>
					</Animated.View>
				</View>
			</Animated.View>
		</Animated.ScrollView>
	);
}

const styles = StyleSheet.create({
	hero: {
		backgroundColor: "#fdfdfd",
	},
	titleContainer: {
		padding: 8,
	},
	cardContainer: {
		display: "flex",
		flex: 1,
		flexDirection: "row",
		gap: 16,
		padding: 8,
		paddingHorizontal: 16,
	},
	cardItems: {
		flex: 1,
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#88c0d0",
		borderRadius: 16,
		padding: 16,
		paddingVertical: 24,
	},
});

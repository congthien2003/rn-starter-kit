import { Colors } from "@/constants/Colors";
import { useLoadingStore } from "@/stores/loadingStore";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { AppText } from ".";

export const LoadingOverlay = () => {
	const { isLoading, loadingText } = useLoadingStore();

	if (!isLoading) return null;

	return (
		<View style={styles.overlay}>
			<View style={styles.container}>
				<ActivityIndicator size="large" color={Colors.light.tint} />
				{loadingText && (
					<View style={styles.textContainer}>
						<AppText variant="body">{loadingText}</AppText>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 9999,
	},
	container: {
		backgroundColor: Colors.light.background,
		padding: 24,
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	textContainer: {
		marginTop: 12,
		alignItems: "center",
	},
});

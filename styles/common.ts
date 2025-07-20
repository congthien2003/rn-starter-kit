import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
	// Layout
	container: {
		flex: 1,
	},
	centerContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	rowSpaceBetween: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	rowCenter: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},

	// Spacing
	padding: {
		padding: 16,
	},
	paddingHorizontal: {
		paddingHorizontal: 16,
	},
	paddingVertical: {
		paddingVertical: 16,
	},
	margin: {
		margin: 16,
	},
	marginHorizontal: {
		marginHorizontal: 16,
	},
	marginVertical: {
		marginVertical: 16,
	},

	// Card styles
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},

	// Button styles
	button: {
		backgroundColor: Colors.light.tint,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonSecondary: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: Colors.light.tint,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonDisabled: {
		backgroundColor: "#ccc",
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 24,
		alignItems: "center",
		justifyContent: "center",
	},

	// Input styles
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 12,
		fontSize: 16,
		backgroundColor: "#fff",
	},
	inputFocused: {
		borderColor: Colors.light.tint,
	},
	inputError: {
		borderColor: "#ff4444",
	},

	// Divider
	divider: {
		height: 1,
		backgroundColor: "#eee",
		marginVertical: 16,
	},

	// Badge
	badge: {
		backgroundColor: Colors.light.tint,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 4,
		alignSelf: "flex-start",
	},

	// Avatar
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#ddd",
		alignItems: "center",
		justifyContent: "center",
	},
	avatarLarge: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#ddd",
		alignItems: "center",
		justifyContent: "center",
	},

	// Loading
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	// Error
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	errorText: {
		color: "#ff4444",
		textAlign: "center",
		marginTop: 8,
	},

	// Empty state
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	emptyText: {
		color: "#666",
		textAlign: "center",
		marginTop: 16,
	},
});

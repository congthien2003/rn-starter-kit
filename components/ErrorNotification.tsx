import { Colors } from "@/constants/Colors";
import { useErrorStore } from "@/stores/errorStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AppText } from "./AppText";

export const ErrorNotification = () => {
	const { errors, removeError } = useErrorStore();

	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				removeError(errors[0].id);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [errors, removeError]);

	if (errors.length === 0) return null;

	const error = errors[0];

	const getBackgroundColor = () => {
		switch (error.type) {
			case "error":
				return Colors.light.error;
			case "warning":
				return Colors.light.warning;
			case "info":
				return Colors.light.info;
			case "success":
				return Colors.light.success;
			default:
				return Colors.light.error;
		}
	};

	const getIcon = () => {
		switch (error.type) {
			case "error":
				return "close-circle";
			case "warning":
				return "warning";
			case "info":
				return "information-circle";
			case "success":
				return "checkmark-circle";
			default:
				return "close-circle";
		}
	};

	return (
		<Animated.View
			style={[
				styles.container,
				{ backgroundColor: getBackgroundColor() },
			]}
			entering={FadeIn}
			exiting={FadeOut}>
			<View style={styles.content}>
				<Ionicons
					name={getIcon() as any}
					size={20}
					color="white"
					style={styles.icon}
				/>
				<AppText style={styles.text} variant="body">
					{error.message}
				</AppText>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 50,
		left: 16,
		right: 16,
		padding: 16,
		borderRadius: 16,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1000,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginRight: 8,
	},
	text: {
		color: "white",
		flex: 1,
		fontWeight: "500",
	},
});

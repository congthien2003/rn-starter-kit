import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
	variant?: "h1" | "h2" | "h3" | "body" | "caption" | "button";
	color?: string;
}

export const AppText: React.FC<AppTextProps> = ({
	children,
	style,
	variant = "body",
	color,
	...props
}) => {
	// Force light mode only
	const themeColors = Colors.light;
	const textColor = color || themeColors.text;

	return (
		<Text
			style={[styles.base, styles[variant], { color: textColor }, style]}
			allowFontScaling={false}
			{...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	base: {
		fontFamily: "Roboto_400Regular",
	},
	h1: {
		fontSize: 32,
		fontFamily: "Roboto_700Bold",
		lineHeight: 40,
	},
	h2: {
		fontSize: 24,
		fontFamily: "Roboto_600SemiBold",
		lineHeight: 32,
	},
	h3: {
		fontSize: 20,
		fontFamily: "Roboto_600SemiBold",
		lineHeight: 28,
	},
	body: {
		fontSize: 16,
		fontFamily: "Roboto_400Regular",
		lineHeight: 24,
	},
	caption: {
		fontSize: 14,
		fontFamily: "Roboto_400Regular",
		lineHeight: 20,
	},
	button: {
		fontSize: 16,
		fontFamily: "Roboto_500Medium",
		lineHeight: 24,
	},
});

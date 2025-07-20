import { Colors } from "@/constants/Colors";
import React from "react";
import {
	ActivityIndicator,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

export interface AppButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	size?: "small" | "medium" | "large";
	onPress?: () => void;
	disabled?: boolean;
	loading?: boolean;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	style?: any;
}

export const AppButton: React.FC<AppButtonProps> = ({
	children,
	variant = "primary",
	size = "medium",
	onPress,
	disabled = false,
	loading = false,
	icon,
	iconPosition = "left",
	style,
}) => {
	// Force light mode only
	const themeColors = Colors.light;

	const getButtonStyle = () => {
		const baseStyle = [styles.base, styles[size]];

		switch (variant) {
			case "primary":
				return [...baseStyle, styles.primary];
			case "secondary":
				return [...baseStyle, styles.secondary];
			case "outline":
				return [...baseStyle, styles.outline];
			case "ghost":
				return [...baseStyle, styles.ghost];
			case "danger":
				return [...baseStyle, styles.danger];
			default:
				return baseStyle;
		}
	};

	const getTextStyle = () => {
		const baseStyle = [styles.text, styles[`${size}Text`]];

		switch (variant) {
			case "primary":
				return [...baseStyle, styles.primaryText];
			case "secondary":
				return [...baseStyle, styles.secondaryText];
			case "outline":
				return [...baseStyle, styles.outlineText];
			case "ghost":
				return [...baseStyle, styles.ghostText];
			case "danger":
				return [...baseStyle, styles.dangerText];
			default:
				return baseStyle;
		}
	};

	const textStyle = disabled
		? [...getTextStyle(), styles.disabledText]
		: getTextStyle();

	const buttonStyle = disabled
		? [...getButtonStyle(), styles.disabled]
		: getButtonStyle();

	return (
		<Pressable
			style={[buttonStyle, style]}
			onPress={onPress}
			disabled={disabled || loading}
			android_ripple={{ color: "rgba(0,0,0,0.1)" }}>
			{loading ? (
				<ActivityIndicator
					color={variant === "primary" ? "white" : themeColors.tint}
					size="small"
				/>
			) : (
				<View style={styles.content}>
					{icon && iconPosition === "left" && (
						<View style={styles.leftIcon}>{icon}</View>
					)}
					<Text style={textStyle}>{children}</Text>
					{icon && iconPosition === "right" && (
						<View style={styles.rightIcon}>{icon}</View>
					)}
				</View>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	base: {
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	small: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		minHeight: 36,
	},
	medium: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		minHeight: 48,
	},
	large: {
		paddingHorizontal: 32,
		paddingVertical: 16,
		minHeight: 56,
	},
	primary: {
		backgroundColor: Colors.light.tint,
	},
	secondary: {
		backgroundColor: Colors.light.backgroundSecondary,
	},
	outline: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: Colors.light.border,
	},
	ghost: {
		backgroundColor: "transparent",
	},
	danger: {
		backgroundColor: Colors.light.error,
	},
	disabled: {
		opacity: 0.6,
	},
	content: {
		flexDirection: "row",
		alignItems: "center",
	},
	leftIcon: {
		marginRight: 8,
	},
	rightIcon: {
		marginLeft: 8,
	},
	text: {
		fontFamily: "Roboto_500Medium",
		fontSize: 16,
	},
	smallText: {
		fontSize: 14,
	},
	mediumText: {
		fontSize: 16,
	},
	largeText: {
		fontSize: 18,
	},
	primaryText: {
		color: "white",
	},
	secondaryText: {
		color: Colors.light.text,
	},
	outlineText: {
		color: Colors.light.text,
	},
	ghostText: {
		color: Colors.light.text,
	},
	dangerText: {
		color: "white",
	},
	disabledText: {
		color: Colors.light.textSecondary,
	},
});

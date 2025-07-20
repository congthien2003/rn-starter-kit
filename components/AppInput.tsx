import { Colors } from "@/constants/Colors";
import React, { forwardRef } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { AppText } from "./AppText";

export interface AppInputProps extends TextInputProps {
	label?: string;
	error?: string;
	helperText?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	containerStyle?: any;
}

export const AppInput = forwardRef<TextInput, AppInputProps>(function AppInput(
	{
		label,
		error,
		helperText,
		leftIcon,
		rightIcon,
		containerStyle,
		style,
		placeholderTextColor,
		...props
	},
	ref
) {
	return (
		<View style={[styles.container, containerStyle]}>
			{label && (
				<AppText variant="body" style={styles.label}>
					{label}
				</AppText>
			)}

			<View
				style={[
					styles.inputContainer,
					error && styles.inputContainerError,
					props.editable === false && styles.inputContainerDisabled,
				]}>
				{leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

				<TextInput
					ref={ref}
					style={[
						styles.input,
						leftIcon ? styles.inputWithLeftIcon : null,
						rightIcon ? styles.inputWithRightIcon : null,
						style,
					]}
					placeholderTextColor={
						placeholderTextColor || Colors.light.textSecondary
					}
					{...props}
				/>

				{rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
			</View>

			{(error || helperText) && (
				<AppText
					variant="caption"
					style={[styles.helperText, error && styles.errorText]}>
					{error || helperText}
				</AppText>
			)}
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	label: {
		marginBottom: 8,
		fontWeight: "600",
		color: Colors.light.text,
		fontFamily: "Roboto_500Medium",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.light.border,
		borderRadius: 8,
		backgroundColor: Colors.light.background,
		minHeight: 48,
	},
	inputContainerError: {
		borderColor: Colors.light.error,
	},
	inputContainerDisabled: {
		backgroundColor: Colors.light.backgroundSecondary,
		opacity: 0.6,
	},
	input: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		color: Colors.light.text,
		fontFamily: "Roboto_400Regular",
	},
	inputWithLeftIcon: {
		paddingLeft: 8,
	},
	inputWithRightIcon: {
		paddingRight: 8,
	},
	leftIcon: {
		paddingLeft: 16,
		paddingRight: 8,
	},
	rightIcon: {
		paddingRight: 16,
		paddingLeft: 8,
	},
	helperText: {
		marginTop: 4,
		color: Colors.light.textSecondary,
		fontFamily: "Roboto_400Regular",
	},
	errorText: {
		color: Colors.light.error,
		fontFamily: "Roboto_400Regular",
	},
});

import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeScreenProps {
	children: React.ReactNode;
	style?: ViewStyle;
	scrollable?: boolean;
	keyboardAvoidingView?: boolean;
	contentContainerStyle?: ViewStyle;
}

export const SafeScreen: React.FC<SafeScreenProps> = ({
	children,
	style,
	scrollable = false,
	keyboardAvoidingView = true,
	contentContainerStyle,
}) => {
	if (scrollable) {
		return (
			<SafeAreaView style={[styles.container, style]}>
				<KeyboardAwareScrollView
					style={styles.scrollView}
					contentContainerStyle={[
						styles.scrollContent,
						contentContainerStyle,
					]}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}>
					{children}
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}

	if (keyboardAvoidingView) {
		return (
			<SafeAreaView style={[styles.container, style]}>
				<KeyboardAwareScrollView
					style={styles.keyboardAvoidingView}
					contentContainerStyle={[
						styles.keyboardContent,
						contentContainerStyle,
					]}
					keyboardShouldPersistTaps="handled"
					scrollEnabled={false}>
					{children}
				</KeyboardAwareScrollView>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={[styles.container, style]}>
			<View style={[styles.content, contentContainerStyle]}>
				{children}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	keyboardContent: {
		flex: 1,
	},
});

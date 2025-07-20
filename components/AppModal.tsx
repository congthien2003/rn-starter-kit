import { Colors } from "@/constants/Colors";
import React, { useEffect, useMemo } from "react";
import { Animated, Modal, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./AppText";

interface AppModalProps {
	visible: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
}

export const AppModal: React.FC<AppModalProps> = ({
	visible,
	onClose,
	title,
	children,
}) => {
	// Force light mode only
	const themeColors = Colors.light;

	const fadeAnim = useMemo(() => new Animated.Value(0), []);
	const scaleAnim = useMemo(() => new Animated.Value(0.8), []);

	useEffect(() => {
		if (visible) {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.spring(scaleAnim, {
					toValue: 1,
					tension: 100,
					friction: 8,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(fadeAnim, {
					toValue: 0,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 0.8,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [visible, fadeAnim, scaleAnim]);

	return (
		<Modal
			visible={visible}
			transparent
			animationType="none"
			onRequestClose={onClose}>
			<Animated.View
				style={[
					styles.overlay,
					{
						opacity: fadeAnim,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					},
				]}>
				<Pressable style={styles.backdrop} onPress={onClose} />
				<Animated.View
					style={[
						styles.container,
						{
							backgroundColor: themeColors.background,
							transform: [{ scale: scaleAnim }],
						},
					]}>
					{title && (
						<View style={styles.header}>
							<AppText variant="h3" style={styles.title}>
								{title}
							</AppText>
						</View>
					)}
					<View style={styles.content}>{children}</View>
				</Animated.View>
			</Animated.View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	container: {
		margin: 20,
		borderRadius: 12,
		padding: 0,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		maxWidth: "90%",
		maxHeight: "80%",
	},
	header: {
		padding: 20,
		borderBottomWidth: 1,
		borderBottomColor: Colors.light.border,
	},
	title: {
		textAlign: "center",
	},
	content: {
		padding: 20,
	},
});

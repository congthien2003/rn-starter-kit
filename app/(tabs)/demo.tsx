import {
	AppButton,
	AppInput,
	AppModal,
	AppText,
	ImageCarousel,
} from "@/components";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/libs/axios";
import { useErrorStore } from "@/stores/errorStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { commonStyles } from "@/styles/common";
import Slider from "@react-native-community/slider";
import { FlashList } from "@shopify/flash-list";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

// Mock data for FlashList
const mockData = Array.from({ length: 100 }, (_, index) => ({
	id: index.toString(),
	title: `Item ${index + 1}`,
	description: `This is item number ${index + 1} in the list`,
	value: Math.floor(Math.random() * 1000),
}));

// Mock images for ImageCarousel
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

export default function DemoScreen() {
	const [modalVisible, setModalVisible] = useState(false);
	const [inputText, setInputText] = useState("");
	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const { showLoading, hideLoading } = useLoadingStore();
	const { addError } = useErrorStore();
	const { user, logout } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	// Slider state
	const [sliderValue, setSliderValue] = useState(50);
	const [volumeValue, setVolumeValue] = useState(75);

	// Media Library state
	const [mediaPermission, setMediaPermission] =
		useState<MediaLibrary.PermissionStatus | null>(null);
	const [mediaAssets, setMediaAssets] = useState<MediaLibrary.Asset[]>([]);
	const [isLoadingMedia, setIsLoadingMedia] = useState(false);

	useEffect(() => {
		checkMediaPermission();
	}, []);

	const checkMediaPermission = async () => {
		const permission = await MediaLibrary.getPermissionsAsync();
		setMediaPermission(permission.status);
	};

	const requestMediaPermission = async () => {
		try {
			const permission = await MediaLibrary.requestPermissionsAsync();
			setMediaPermission(permission.status);

			if (permission.status === "granted") {
				addError("Media permission granted!", "success");
			} else {
				addError("Media permission denied", "error");
			}
		} catch (error) {
			addError("Failed to request media permission", "error");
		}
	};

	const loadMediaAssets = async () => {
		if (mediaPermission !== "granted") {
			addError("Media permission required", "error");
			return;
		}

		try {
			setIsLoadingMedia(true);
			const assets = await MediaLibrary.getAssetsAsync({
				first: 20,
				mediaType: ["photo", "video"],
			});
			setMediaAssets(assets.assets);
			addError(`Loaded ${assets.assets.length} media assets`, "success");
		} catch (error) {
			addError("Failed to load media assets", "error");
		} finally {
			setIsLoadingMedia(false);
		}
	};

	const handleShowLoading = () => {
		showLoading("Loading...");
		setTimeout(() => {
			hideLoading();
		}, 2000);
	};

	const handleApiCall = async () => {
		try {
			setIsLoading(true);
			await api.get("/auth/me");
		} catch (error) {
			// Error already handled by useApiCall
			console.log("API call failed:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleShowError = () => {
		addError("This is a demo error message", "error");
	};

	const handleShowWarning = () => {
		addError("This is a demo warning message", "warning");
	};

	const handleShowInfo = () => {
		addError("This is a demo info message", "info");
	};

	const handleShowSuccess = () => {
		addError("This is a demo success message", "success");
	};

	const renderFlashListItem = ({ item }: { item: (typeof mockData)[0] }) => (
		<View style={styles.flashListItem}>
			<AppText variant="h3">{item.title}</AppText>
			<AppText variant="body">{item.description}</AppText>
			<AppText variant="caption">Value: {item.value}</AppText>
		</View>
	);

	return (
		// <SafeScreen scrollable>
		<>
			<ImageCarousel
				images={mockImages}
				height={250}
				showIndicators={true}
				showTitles={true}
			/>
			<ScrollView style={commonStyles.padding}>
				<AppText variant="h1" style={commonStyles.marginVertical}>
					Component Demo
				</AppText>

				{/* User Info */}
				<View style={commonStyles.card}>
					<AppText variant="h3">User Info</AppText>
					<AppText variant="body">
						{user ? `Welcome, ${user.name}!` : "Not logged in"}
					</AppText>
					{user && (
						<AppButton variant="primary" onPress={logout}>
							Logout
						</AppButton>
					)}
				</View>

				{/* Image Carousel with Custom Width Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">
						Image Carousel (Custom Width)
					</AppText>
					<AppText variant="body" style={{ marginBottom: 16 }}>
						Carousel with custom width (300px) - fits container
						perfectly:
					</AppText>

					<View style={{ alignItems: "center" }}>
						<ImageCarousel
							images={mockImages}
							height={200}
							width={300}
							showIndicators={true}
							showTitles={true}
						/>
					</View>

					<AppText
						variant="caption"
						style={{ marginTop: 8, textAlign: "center" }}>
						Width: 300px - Perfect fit for container
					</AppText>
				</View>

				{/* Slider Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">Slider Components</AppText>

					<AppText variant="body" style={styles.sliderLabel}>
						Basic Slider: {sliderValue.toFixed(0)}
					</AppText>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={100}
						value={sliderValue}
						onValueChange={setSliderValue}
						minimumTrackTintColor="#007AFF"
						maximumTrackTintColor="#DEDEDE"
						thumbTintColor="#007AFF"
					/>

					<AppText variant="body" style={styles.sliderLabel}>
						Volume Slider: {volumeValue.toFixed(0)}%
					</AppText>
					<Slider
						style={styles.slider}
						minimumValue={0}
						maximumValue={100}
						value={volumeValue}
						onValueChange={setVolumeValue}
						minimumTrackTintColor="#34C759"
						maximumTrackTintColor="#DEDEDE"
						thumbTintColor="#34C759"
						step={5}
					/>

					<View style={styles.sliderButtons}>
						<AppButton
							variant="outline"
							size="small"
							onPress={() => setSliderValue(0)}
							style={styles.sliderButton}>
							Reset
						</AppButton>
						<AppButton
							variant="outline"
							size="small"
							onPress={() => setVolumeValue(50)}
							style={styles.sliderButton}>
							Reset Volume
						</AppButton>
					</View>
				</View>

				{/* FlashList Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">
						FlashList (Optimized FlatList)
					</AppText>
					<AppText variant="body" style={{ marginBottom: 8 }}>
						High-performance list with 100 items:
					</AppText>

					<View style={styles.flashListContainer}>
						<FlashList
							data={mockData}
							renderItem={renderFlashListItem}
							estimatedItemSize={80}
							keyExtractor={(item) => item.id}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				</View>

				{/* Media Library Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">Media Library Access</AppText>

					<AppText variant="body" style={{ marginBottom: 8 }}>
						Permission Status: {mediaPermission || "Unknown"}
					</AppText>

					{mediaPermission !== "granted" && (
						<AppButton
							variant="primary"
							onPress={requestMediaPermission}
							style={{ marginBottom: 8 }}>
							Request Media Permission
						</AppButton>
					)}

					{mediaPermission === "granted" && (
						<AppButton
							variant="outline"
							onPress={loadMediaAssets}
							loading={isLoadingMedia}
							style={{ marginBottom: 8 }}>
							{isLoadingMedia
								? "Loading..."
								: "Load Media Assets"}
						</AppButton>
					)}

					{mediaAssets.length > 0 && (
						<View style={styles.mediaInfo}>
							<AppText variant="body">
								Loaded {mediaAssets.length} assets
							</AppText>
							<AppText variant="caption">
								First asset: {mediaAssets[0]?.filename}
							</AppText>
						</View>
					)}
				</View>

				{/* AppInput Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">AppInput Components</AppText>

					<AppInput
						label="Basic Input"
						placeholder="Enter text here..."
						value={inputText}
						onChangeText={setInputText}
						helperText="This is a helper text"
					/>

					<AppInput
						label="Email Input"
						placeholder="Enter your email"
						value={emailText}
						onChangeText={setEmailText}
						keyboardType="email-address"
						autoCapitalize="none"
						error="Email is required"
					/>

					<AppInput
						label="Password Input"
						placeholder="Enter your password"
						value={passwordText}
						onChangeText={setPasswordText}
						secureTextEntry
						helperText="Password must be at least 6 characters"
					/>

					<AppInput
						label="Disabled Input"
						placeholder="This input is disabled"
						value="Disabled value"
						editable={false}
					/>
				</View>

				{/* API Hook Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">useApiCall Hook Demo</AppText>

					<AppText variant="body" style={{ marginBottom: 8 }}>
						Test API call with error handling and success messages:
					</AppText>
					<AppButton
						variant="outline"
						onPress={handleApiCall}
						loading={isLoading}
						style={{ marginBottom: 8 }}>
						{isLoading ? "Processing..." : "Test API Call"}
					</AppButton>
				</View>

				{/* Error Handling Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">Error Handling</AppText>

					<AppText variant="body" style={{ marginBottom: 8 }}>
						Error Notifications:
					</AppText>
					<AppButton
						variant="danger"
						onPress={handleShowError}
						style={{ marginBottom: 8 }}>
						Show Error
					</AppButton>

					<AppButton
						variant="outline"
						onPress={handleShowWarning}
						style={{ marginBottom: 8 }}>
						Show Warning
					</AppButton>

					<AppButton
						variant="primary"
						onPress={handleShowInfo}
						style={{ marginBottom: 16 }}>
						Show Info
					</AppButton>

					<AppButton
						variant="outline"
						onPress={handleShowSuccess}
						style={{
							marginBottom: 16,
							color: "white",
							backgroundColor: "green",
						}}>
						Show Success
					</AppButton>
				</View>

				{/* AppButton Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">AppButton Variants</AppText>

					{/* Primary Buttons */}
					<AppText variant="body" style={{ marginBottom: 8 }}>
						Primary Buttons:
					</AppText>
					<AppButton
						variant="primary"
						onPress={handleShowLoading}
						style={{ marginBottom: 8 }}>
						Show Loading
					</AppButton>

					<AppButton
						variant="primary"
						size="small"
						onPress={() => console.log("Small button")}
						style={{ marginBottom: 8 }}>
						Small Button
					</AppButton>

					<AppButton
						variant="primary"
						size="large"
						onPress={() => console.log("Large button")}
						style={{ marginBottom: 16 }}>
						Large Button
					</AppButton>

					{/* Secondary Buttons */}
					<AppText variant="body" style={{ marginBottom: 8 }}>
						Secondary Buttons:
					</AppText>
					<AppButton
						variant="secondary"
						onPress={() => console.log("Secondary")}
						style={{ marginBottom: 8 }}>
						Secondary
					</AppButton>

					<AppButton
						variant="outline"
						onPress={() => console.log("Outline")}
						style={{ marginBottom: 8 }}>
						Outline
					</AppButton>

					<AppButton
						variant="ghost"
						onPress={() => console.log("Ghost")}
						style={{ marginBottom: 8 }}>
						Ghost
					</AppButton>

					<AppButton
						variant="danger"
						onPress={() => console.log("Danger")}
						style={{ marginBottom: 16 }}>
						Danger
					</AppButton>

					{/* Buttons with Icons */}
					<AppText variant="body" style={{ marginBottom: 8 }}>
						Buttons with Icons:
					</AppText>
					<AppButton
						variant="primary"
						icon={<AppText style={{ color: "white" }}>→</AppText>}
						iconPosition="right"
						onPress={() => setModalVisible(true)}
						style={{ marginBottom: 8 }}>
						Open Modal
					</AppButton>

					<AppButton
						variant="outline"
						icon={<AppText>←</AppText>}
						iconPosition="left"
						onPress={() => console.log("Back button")}
						style={{ marginBottom: 8 }}>
						Back
					</AppButton>

					{/* Disabled Buttons */}
					<AppText variant="body" style={{ marginBottom: 8 }}>
						Disabled Buttons:
					</AppText>
					<AppButton
						variant="primary"
						disabled
						onPress={() => console.log("Disabled")}
						style={{ marginBottom: 8 }}>
						Disabled Primary
					</AppButton>

					<AppButton
						variant="outline"
						disabled
						onPress={() => console.log("Disabled")}
						style={{ marginBottom: 16 }}>
						Disabled Outline
					</AppButton>
				</View>

				{/* Layout Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">Layout</AppText>
					<View style={commonStyles.rowSpaceBetween}>
						<AppText variant="body">Left</AppText>
						<AppText variant="body">Right</AppText>
					</View>
					<View style={commonStyles.divider} />
					<View style={commonStyles.rowCenter}>
						<AppText variant="body">Centered</AppText>
					</View>
				</View>

				{/* Badge Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">Badge</AppText>
					<View style={commonStyles.badge}>
						<AppText style={{ color: "white", fontSize: 12 }}>
							New
						</AppText>
					</View>
				</View>

				{/* Avatar Demo */}
				<View style={commonStyles.card}>
					<AppText variant="h3">Avatar</AppText>
					<View style={commonStyles.row}>
						<View style={commonStyles.avatar}>
							<AppText variant="caption">JD</AppText>
						</View>
						<View
							style={[
								commonStyles.avatarLarge,
								{ marginLeft: 16 },
							]}>
							<AppText variant="body">JD</AppText>
						</View>
					</View>
				</View>

				{/* Modal */}
				<AppModal
					visible={modalVisible}
					onClose={() => setModalVisible(false)}
					title="Demo Modal">
					<AppText variant="body">
						This is a demo modal. You can put any content here.
					</AppText>
					<AppButton
						variant="primary"
						onPress={() => setModalVisible(false)}
						style={{ marginTop: 16 }}>
						Close
					</AppButton>
				</AppModal>
			</ScrollView>
		</>

		// </SafeScreen>
	);
}

const styles = StyleSheet.create({
	slider: {
		width: "100%",
		height: 40,
		marginBottom: 16,
	},
	sliderLabel: {
		marginBottom: 8,
		fontWeight: "500",
	},
	sliderButtons: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 8,
	},
	sliderButton: {
		flex: 1,
		marginHorizontal: 4,
	},
	flashListContainer: {
		height: 200,
		marginTop: 8,
	},
	flashListItem: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
		backgroundColor: "white",
	},
	mediaInfo: {
		marginTop: 8,
		padding: 8,
		backgroundColor: "#f5f5f5",
		borderRadius: 4,
	},
});

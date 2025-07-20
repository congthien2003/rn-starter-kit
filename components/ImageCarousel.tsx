import { Image } from "expo-image";
import React, { useRef, useState } from "react";
import {
	Dimensions,
	LayoutChangeEvent,
	Modal,
	ScrollView,
	StatusBar,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { AppText } from "./AppText";

const { width: screenWidth } = Dimensions.get("window");

interface ImageItem {
	id: string;
	uri: string;
	title?: string;
	description?: string;
}

interface ImageCarouselProps {
	images: ImageItem[];
	height?: number;
	width?: number; // Custom width prop
	showIndicators?: boolean;
	showTitles?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
	images,
	height = 200,
	width, // Optional custom width
	showIndicators = true,
	showTitles = true,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
	const [containerWidth, setContainerWidth] = useState(width || screenWidth);
	const scrollViewRef = useRef<ScrollView>(null);

	// Use custom width if provided, otherwise use container width
	const carouselWidth = width || containerWidth;

	const handleLayout = (event: LayoutChangeEvent) => {
		if (!width) {
			// Only update if no custom width is provided
			setContainerWidth(event.nativeEvent.layout.width);
		}
	};

	const handleScroll = (event: any) => {
		const contentOffset = event.nativeEvent.contentOffset.x;
		const index = Math.round(contentOffset / carouselWidth);
		setCurrentIndex(index);
	};

	const scrollToIndex = (index: number) => {
		scrollViewRef.current?.scrollTo({
			x: index * carouselWidth,
			animated: true,
		});
	};

	const openImageDetail = (image: ImageItem) => {
		setSelectedImage(image);
	};

	const closeImageDetail = () => {
		setSelectedImage(null);
	};

	if (!images || images.length === 0) {
		return (
			<View style={[styles.container, { height, width: carouselWidth }]}>
				<AppText variant="body" style={styles.noImages}>
					No images available
				</AppText>
			</View>
		);
	}

	return (
		<>
			<View
				style={[styles.container, { height, width: carouselWidth }]}
				onLayout={handleLayout}>
				<ScrollView
					ref={scrollViewRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					style={styles.scrollView}>
					{images.map((image, index) => (
						<TouchableOpacity
							key={image.id}
							style={[
								styles.imageContainer,
								{ width: carouselWidth },
							]}
							onPress={() => openImageDetail(image)}
							activeOpacity={0.9}>
							<Image
								source={{ uri: image.uri }}
								style={styles.image}
								contentFit="cover"
								placeholder="Loading..."
								transition={200}
							/>
							{showTitles && image.title && (
								<View style={styles.imageOverlay}>
									<AppText
										variant="h3"
										style={styles.imageTitle}>
										{image.title}
									</AppText>
									{image.description && (
										<AppText
											variant="body"
											style={styles.imageDescription}>
											{image.description}
										</AppText>
									)}
								</View>
							)}
						</TouchableOpacity>
					))}
				</ScrollView>

				{/* Indicators */}
				{showIndicators && images.length > 1 && (
					<View style={styles.indicatorsContainer}>
						{images.map((_, index) => (
							<TouchableOpacity
								key={index}
								style={[
									styles.indicator,
									index === currentIndex &&
										styles.activeIndicator,
								]}
								onPress={() => scrollToIndex(index)}
							/>
						))}
					</View>
				)}

				{/* Image Counter */}
				{images.length > 1 && (
					<View style={styles.counterContainer}>
						<AppText variant="caption" style={styles.counter}>
							{currentIndex + 1} / {images.length}
						</AppText>
					</View>
				)}
			</View>

			{/* Image Detail Modal */}
			<Modal
				visible={!!selectedImage}
				transparent
				animationType="fade"
				onRequestClose={closeImageDetail}>
				<StatusBar hidden />
				<View style={styles.modalOverlay}>
					<TouchableOpacity
						style={styles.modalBackground}
						activeOpacity={1}
						onPress={closeImageDetail}
					/>
					<View style={styles.modalContent}>
						<TouchableOpacity
							style={styles.closeButton}
							onPress={closeImageDetail}>
							<AppText style={styles.closeButtonText}>✕</AppText>
						</TouchableOpacity>

						{selectedImage && (
							<>
								<Image
									source={{ uri: selectedImage.uri }}
									style={styles.detailImage}
									contentFit="contain"
									placeholder="Loading..."
									transition={300}
								/>

								{selectedImage.title && (
									<View style={styles.detailInfo}>
										<AppText
											variant="h2"
											style={styles.detailTitle}>
											{selectedImage.title}
										</AppText>
										{selectedImage.description && (
											<AppText
												variant="body"
												style={
													styles.detailDescription
												}>
												{selectedImage.description}
											</AppText>
										)}
									</View>
								)}
							</>
						)}
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		overflow: "hidden",
	},
	scrollView: {
		flex: 1,
	},
	imageContainer: {
		height: "100%",
		position: "relative",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		padding: 16,
	},
	imageTitle: {
		color: "white",
		marginBottom: 4,
	},
	imageDescription: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 14,
	},
	indicatorsContainer: {
		position: "absolute",
		bottom: 20,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	indicator: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
		marginHorizontal: 4,
	},
	activeIndicator: {
		backgroundColor: "white",
		width: 24,
	},
	counterContainer: {
		position: "absolute",
		top: 16,
		right: 16,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	counter: {
		color: "white",
		fontSize: 12,
	},
	noImages: {
		textAlign: "center",
		color: "#666",
		marginTop: 80,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalBackground: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	modalContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	closeButton: {
		position: "absolute",
		top: 50,
		right: 20,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
	closeButtonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	detailImage: {
		width: screenWidth - 40,
		height: screenWidth - 40,
		borderRadius: 12,
	},
	detailInfo: {
		position: "absolute",
		bottom: 100,
		left: 20,
		right: 20,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		padding: 16,
		borderRadius: 12,
	},
	detailTitle: {
		color: "white",
		marginBottom: 8,
		textAlign: "center",
	},
	detailDescription: {
		color: "rgba(255, 255, 255, 0.8)",
		textAlign: "center",
		lineHeight: 20,
	},
});

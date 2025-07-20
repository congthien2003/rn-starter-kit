/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
	light: {
		text: "#11181C",
		textSecondary: "#687076",
		background: "#fff",
		backgroundSecondary: "#f8f9fa",
		tint: tintColorLight,
		icon: "#687076",
		tabIconDefault: "#687076",
		tabIconSelected: tintColorLight,
		border: "#e1e5e9",
		error: "#dc3545",
		success: "#28a745",
		warning: "#ffc107",
		info: "#17a2b8",
	},
	dark: {
		text: "#ECEDEE",
		textSecondary: "#9BA1A6",
		background: "#151718",
		backgroundSecondary: "#1a1d1e",
		tint: tintColorDark,
		icon: "#9BA1A6",
		tabIconDefault: "#9BA1A6",
		tabIconSelected: tintColorDark,
		border: "#2a2d2e",
		error: "#ff6b6b",
		success: "#51cf66",
		warning: "#ffd43b",
		info: "#74c0fc",
	},
};

import {
	Roboto_400Regular,
	Roboto_500Medium,
	Roboto_600SemiBold,
	Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { ErrorNotification, LoadingOverlay, SafeScreen } from "@/components";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		Roboto_400Regular,
		Roboto_500Medium,
		Roboto_600SemiBold,
		Roboto_700Bold,
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<AuthProvider>
			<ThemeProvider value={DefaultTheme}>
				<SafeScreen>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Screen
							name="(tabs)"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="auth/login"
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="auth/register"
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar style="auto" />
					<LoadingOverlay />
					<ErrorNotification />
				</SafeScreen>
			</ThemeProvider>
		</AuthProvider>
	);
}

import { Tabs } from "expo-router";
import React from "react";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.light.tint,
				tabBarInactiveTintColor: Colors.light.tabIconDefault,
				tabBarStyle: {
					backgroundColor: Colors.light.background,
					borderTopColor: Colors.light.border,
				},
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={24} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={24}
							name="paperplane.fill"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="demo"
				options={{
					title: "Demo",
					tabBarIcon: ({ color }) => (
						<IconSymbol
							size={24}
							name="square.grid.2x2.fill"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

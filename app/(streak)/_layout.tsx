import { Tabs, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
	const colorScheme = useColorScheme() ?? "light";
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({ title: 'Streak' });
	}, [navigation]);
  
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: TabBarBackground,
				tabBarStyle: Platform.select({
					ios: {
						position: "absolute",
						backgroundColor: Colors[colorScheme].background,
					},
					default: {
						backgroundColor: Colors[colorScheme].background,
					},
				}),
			}}
		>
			<Tabs.Screen
				name="index" // This is for the Home screen
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="house.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="history/index" // Correct path to the history screen
				options={{
					title: "History",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="history" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}

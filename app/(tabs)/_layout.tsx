import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {

// 탭 네비
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "홈" }} />
      <Tabs.Screen name="explore" options={{ title: "탐색" }} />

    </Tabs>
  );
}

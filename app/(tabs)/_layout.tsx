// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "홈" }}></Tabs.Screen>
      <Tabs.Screen name="Profile" options={{ title: "프로필" }} />
    </Tabs>
  );
}

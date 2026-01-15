import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootNavigator from "@/navigation/RootNavigator";
import { useState } from "react";

export default function RootLayout() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <RootNavigator toggleTheme={toggleTheme} theme={theme} />
          <StatusBar style={theme === "dark" ? "light" : "dark"} />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

import { Ionicons } from "@expo/vector-icons";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const router = useRouter();
  const isDark = theme === "dark";

  const headerBg = isDark ? "#111" : "#fff";
  const textColor = isDark ? "#fff" : "#111";

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: headerBg,
            },
            headerTintColor: textColor,
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 22,
              color: textColor,
            },
            headerLeft: ({ canGoBack }) =>
              canGoBack ? (
                <Pressable
                  onPress={() => router.back()}
                  style={{
                    marginLeft: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    backgroundColor: isDark ? "#222" : "#F3F4F6",
                    borderRadius: 12,
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    shadowOffset: { width: 0, height: 2 },
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={22}
                    color={textColor}
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: textColor,
                    }}
                  >
                    Back
                  </Text>
                </Pressable>
              ) : null,
            headerRight: () => (
              <Pressable
                onPress={toggleTheme}
                style={{
                  marginRight: 12,
                  padding: 8,
                  borderRadius: 16,
                  backgroundColor: isDark ? "#222" : "#F3F4F6",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  shadowOffset: { width: 0, height: 2 },
                }}
              >
                <Text style={{ fontSize: 18 }}>{isDark ? "🌞" : "🌙"}</Text>
              </Pressable>
            ),
          }}
        >
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="topics/index" options={{ title: "Topics" }} />
          <Stack.Screen
            name="topics/[topic]/[key]/index"
            options={{ title: "Topic Menu" }}
          />
          <Stack.Screen
            name="topics/[topic]/[key]/learning/index"
            options={{ title: "Learning" }}
          />
          <Stack.Screen
            name="topics/[topic]/[key]/quiz/index"
            options={{ title: "Quiz" }}
          />
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

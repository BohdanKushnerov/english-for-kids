import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import TopicMenuScreen from "../screens/TopicMenuScreen";
import TopicsScreen from "../screens/TopicsScreen";
import LearningScreen from "@/screens/LearningScreen";
import QuizScreen from "@/screens/QuizScreen";

export type RootStackParamList = {
  Home: undefined;
  Topics: undefined;
  TopicMenu: { topic: string };
  Learning: { topicKey: string; title: string };
  Quiz: { topicKey: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type RootNavigatorProps = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export default function RootNavigator({
  theme,
  toggleTheme,
}: RootNavigatorProps) {
  const isDark = theme === "dark";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? "#111" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 20,
        },
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable
              onPress={() => router.back()}
              style={{
                paddingHorizontal: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDark ? "#fff" : "#000"}
              />
              <Text
                style={{
                  marginLeft: 4,
                  color: isDark ? "#fff" : "#000",
                  fontSize: 16,
                }}
              >
                Back
              </Text>
            </Pressable>
          ) : null,
        headerRight: () => (
          <Pressable onPress={toggleTheme} style={{ paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 18 }}>{isDark ? "🌞" : "🌙"}</Text>
          </Pressable>
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Topics" component={TopicsScreen} />
      <Stack.Screen name="TopicMenu" component={TopicMenuScreen} />
      <Stack.Screen name="Learning" component={LearningScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}

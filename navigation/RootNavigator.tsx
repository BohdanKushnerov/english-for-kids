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
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme === "dark" ? "#111" : "#fff" },
        headerTintColor: theme === "dark" ? "#fff" : "#000",
        headerLeft: ({ canGoBack }) =>
          canGoBack ? (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingHorizontal: 12 }}
            >
              <Ionicons
                name="arrow-back"
                size={26}
                color={theme === "dark" ? "#fff" : "#000"}
              />
            </Pressable>
          ) : null,
        headerRight: () => (
          <Pressable onPress={toggleTheme} style={{ paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 16 }}>
              {theme === "dark" ? "🌞" : "🌙"}
            </Text>
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

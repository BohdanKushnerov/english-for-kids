import PrimaryButton from "@/components/ui/PrimaryButton";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    Speech.speak(" ", {
      volume: 0,
      language: "en-US",
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>👋 Hello!</Text>
        <Text style={[styles.subtitle, { color: colors.text }]}>
          Let’s learn English together
        </Text>

        <PrimaryButton
          title="Start learning"
          onPress={() => router.push("/topics")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 32,
  },
});

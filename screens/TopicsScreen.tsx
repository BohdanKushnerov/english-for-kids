import PrimaryButton from "@/components/ui/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Topics">;

const TOPICS = [
  {
    key: "Numbers",
    title: "Numbers",
    preview: "123",
  },
  {
    key: "Colors",
    title: "Colors",
    previewColors: ["#FF3B30", "#34C759", "#007AFF"],
  },
  {
    key: "Animals",
    title: "Animals",
    preview: "🐶🐱",
  },
  {
    key: "Alphabet",
    title: "Alphabet",
    preview: "A B C",
  },
  {
    key: "Gastronomy",
    title: "Gastronomy",
    preview: "🍎🍞",
  },
  {
    key: "Shapes",
    title: "Shapes",
    preview: "🔵⭐",
  },
  {
    key: "Clothes",
    title: "Clothes",
    preview: "👞👚",
  },
];

export default function TopicsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a topic</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {TOPICS.map((topic) => (
            <View key={topic.key} style={styles.card}>
              <View style={styles.previewCircle}>
                {topic.previewColors ? (
                  <View style={styles.colorRow}>
                    {topic.previewColors.map((color) => (
                      <View
                        key={color}
                        style={[styles.colorDot, { backgroundColor: color }]}
                      />
                    ))}
                  </View>
                ) : (
                  <Text style={styles.previewText}>{topic.preview}</Text>
                )}
              </View>

              <PrimaryButton
                title={topic.title}
                onPress={() =>
                  navigation.navigate("TopicMenu", { topic: topic.key })
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8F9FB",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 28,
    textAlign: "center",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    width: "48%",
    // iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    // Android
    elevation: 4,
    alignItems: "center",
  },

  previewCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F1F3F6",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  previewText: {
    fontSize: 32,
    fontWeight: "800",
  },

  colorRow: {
    flexDirection: "row",
    gap: 6,
  },

  colorDot: {
    width: 18,
    height: 18,
    borderRadius: 6,
  },

  scrollContent: {
    paddingBottom: 24,
  },
});

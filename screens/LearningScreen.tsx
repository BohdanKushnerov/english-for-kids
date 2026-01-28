import { topicsData } from "@/data/topics";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Learning">;

export default function LearningScreen({ route }: Props) {
  const { topicKey, title } = route.params;
  const items = topicsData[topicKey] || [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      speak(items[index].label);
    }
  }, [index, items]);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: "en-US" });
  };

  const next = () => {
    if (index + 1 < items.length) setIndex(index + 1);
    else router.back();
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : items.length - 1));
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No data for this topic</Text>
      </View>
    );
  }

  const current = items[index];
  const screenWidth = Dimensions.get("window").width;
  const imageSize = Math.min(screenWidth * 0.7, 250); // адаптивный размер

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{title}</Text>

      {current.color && (
        <View
          style={[
            styles.colorBox,
            {
              backgroundColor: current.color,
              width: imageSize,
              height: imageSize,
            },
          ]}
        />
      )}

      {current.image && (
        <Image
          source={current.image}
          style={[styles.image, { width: imageSize, height: imageSize }]}
          resizeMode="contain"
        />
      )}

      <Text style={styles.word}>{current.label}</Text>

      <View style={styles.controls}>
        <Pressable onPress={prev} style={styles.button}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </Pressable>

        <Pressable
          onPress={() => speak(current.label)}
          style={[styles.button, styles.speakButton]}
        >
          <Ionicons name="volume-high" size={28} color="#fff" />
        </Pressable>

        <Pressable onPress={next} style={styles.button}>
          <Ionicons name="arrow-forward" size={28} color="#fff" />
        </Pressable>
      </View>

      <Text style={styles.counter}>
        {index + 1} / {items.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#F9FAFB",
  },
  topic: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 30,
    textAlign: "center",
  },
  colorBox: {
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#CBD5E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  image: {
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  word: {
    fontSize: 38,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 25,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 10,
  },
  button: {
    padding: 14,
    backgroundColor: "#4CAF50",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  speakButton: {
    backgroundColor: "#19B181",
  },
  counter: {
    marginTop: 25,
    fontSize: 16,
    color: "#6B7280",
  },
  emptyText: {
    fontSize: 18,
    color: "#9CA3AF",
  },
});

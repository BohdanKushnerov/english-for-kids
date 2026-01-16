import { topicsData } from "@/data/topics";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";
import * as Speech from "expo-speech";
import { router } from "expo-router";


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
    Speech.speak(text, {
      language: "en-US",
    });
  };

  const next = () => {
    // setIndex((prev) => (prev + 1 < items.length ? prev + 1 : 0));
    if (index + 1 < items.length) {
      setIndex(index + 1);
    } else {
      // попытка перелистнуть после последнего элемента
      router.back();
    }
  };
  

  const prev = () => {
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : items.length - 1));
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data for this topic</Text>
      </View>
    );
  }

  const current = items[index];

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{title}</Text>

      {current.color && (
        <View style={[styles.colorBox, { backgroundColor: current.color }]} />
      )}

      {current.image && (
        <Image
          source={current.image}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text style={styles.word}>{current.label}</Text>

      <View style={styles.controls}>
        <Pressable onPress={prev} style={styles.button}>
          <Ionicons name="arrow-back" size={30} />
        </Pressable>

        <Pressable onPress={() => speak(current.label)} style={styles.button}>
          <Ionicons name="volume-high" size={30} />
        </Pressable>

        <Pressable onPress={next} style={styles.button}>
          <Ionicons name="arrow-forward" size={30} />
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
    padding: 20,
  },
  topic: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  colorBox: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  word: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginTop: 10,
  },
  button: {
    padding: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 12,
  },
  counter: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

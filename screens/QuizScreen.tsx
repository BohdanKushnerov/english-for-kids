import { LearnItem, topicsData } from "@/data/topics";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route }: Props) {
  const { topicKey, title } = route.params;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState<LearnItem[]>([]);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [disabledIndexes, setDisabledIndexes] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const items = useMemo(() => {
    const data = topicsData[topicKey] || [];
    return [...data].sort(() => Math.random() - 0.5);
  }, [topicKey]);

  useEffect(() => {
    const generateQuestion = () => {
      setDisabledIndexes([]);

      const correctItem = items[questionIndex];

      let otherItems = items.filter((_, i) => i !== questionIndex);

      otherItems = shuffleArray(otherItems).slice(0, 3);

      const allOptions = shuffleArray([correctItem, ...otherItems]);

      setOptions(allOptions);

      speak(correctItem.label);
    };

    if (items.length > 0) {
      generateQuestion();
    }
  }, [items, questionIndex, topicKey]);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: "en-US" });
  };

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (option: any, index: number) => {
    const correctItem = items[questionIndex];

    if (option.label === correctItem.label) {
      setCorrect(correct + 1);

      if (questionIndex + 1 < items.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setShowResult(true);
      }
    } else {
      setWrong(wrong + 1);
      setDisabledIndexes([...disabledIndexes, index]);
    }
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No data for this topic</Text>
      </View>
    );
  }

  const current = items[questionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{title}</Text>

      <View style={styles.topRow}>
        <Text style={styles.score}>
          Correct: {correct} | Wrong: {wrong}
        </Text>
      </View>

      <Text style={styles.question}>Choose the correct picture</Text>

      <Text style={styles.currentWord}>{current.label}</Text>

      <Pressable onPress={() => speak(current.label)}>
        <Ionicons name="volume-high" size={30} />
      </Pressable>

      <View style={styles.grid}>
        {options.map((option, index) => {
          const isDisabled = disabledIndexes.includes(index);

          return (
            <Pressable
              key={index}
              onPress={() => handleAnswer(option, index)}
              disabled={isDisabled}
              style={[styles.card, isDisabled && styles.wrongCard]}
            >
              {option.image ? (
                <Image
                  source={option.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={[
                    styles.colorPreview,
                    { backgroundColor: option.color },
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.counter}>
        {questionIndex + 1} / {items.length}
      </Text>

      <Modal visible={showResult} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Results</Text>

            <Text style={styles.modalText}>Correct: {correct}</Text>
            <Text style={styles.modalText}>Wrong: {wrong}</Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => {
                setCorrect(0);
                setWrong(0);
                setQuestionIndex(0);
                setShowResult(false);
              }}
            >
              <Text style={styles.modalButtonText}>Try Again</Text>
            </Pressable>

            <Pressable style={styles.modalButton} onPress={() => router.back()}>
              <Text style={styles.modalButtonText}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },

  topic: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
  },

  currentWord: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },

  score: {
    fontSize: 18,
    fontWeight: "600",
  },

  question: {
    fontSize: 20,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },

  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  wrongCard: {
    backgroundColor: "#ffcccc",
  },

  image: {
    width: 120,
    height: 120,
  },

  colorPreview: {
    width: "85%",
    aspectRatio: 1,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#d0d0d0",
  },

  counter: {
    marginTop: 10,
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 5,
  },

  modalButton: {
    marginTop: 10,
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

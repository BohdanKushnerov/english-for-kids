import ResultQuizModal from "@/components/ResultQuizModal/ResultQuizModal";
import { LearnItem, topicsData } from "@/data/topics";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Speech from "expo-speech";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
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
    if (!items.length) return;

    setDisabledIndexes([]);

    const correctItem = items[questionIndex];
    const otherItems = items
      .filter((_, i) => i !== questionIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    setOptions([correctItem, ...otherItems].sort(() => Math.random() - 0.5));

    speak(correctItem.label);
  }, [items, questionIndex]);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: "en-US" });
  };

  const handleAnswer = (option: LearnItem, index: number) => {
    const correctItem = items[questionIndex];

    if (option.label === correctItem.label) {
      setCorrect((v) => v + 1);

      if (questionIndex + 1 < items.length) {
        setQuestionIndex((v) => v + 1);
      } else {
        setShowResult(true);
      }
    } else {
      setWrong((v) => v + 1);
      setDisabledIndexes((v) => [...v, index]);
    }
  };

  if (!items.length) {
    return (
      <View style={styles.container}>
        <Text>No data for this topic</Text>
      </View>
    );
  }

  const handleClickRefreshQuiz = () => {
    setCorrect(0);
    setWrong(0);
    setQuestionIndex(0);
    setShowResult(false);
  };

  const current = items[questionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.topic}>{title}</Text>

      <Text style={styles.score}>
        ✅ {correct} | ❌ {wrong}
      </Text>

      <Text style={styles.question}>Choose the correct picture</Text>

      {title !== "Alphabet" && (
        <Text style={styles.currentWord}>{current.label}</Text>
      )}

      <Pressable style={styles.soundBtn} onPress={() => speak(current.label)}>
        <Ionicons name="volume-high" size={28} color="#4F46E5" />
      </Pressable>

      <View style={styles.grid}>
        {options.map((option, index) => {
          const disabled = disabledIndexes.includes(index);

          return (
            <Pressable
              key={index}
              disabled={disabled}
              onPress={() => handleAnswer(option, index)}
              style={[styles.card, disabled && styles.wrongCard]}
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

      <ResultQuizModal
        handleClickRefreshQuiz={handleClickRefreshQuiz}
        correct={correct}
        showResult={showResult}
        wrong={wrong}
      />
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
    marginBottom: 6,
  },

  score: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },

  question: {
    fontSize: 20,
    marginBottom: 10,
  },

  currentWord: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 8,
  },

  soundBtn: {
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },

  card: {
    width: "48%",
    aspectRatio: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  wrongCard: {
    backgroundColor: "#FECACA",
  },

  image: {
    width: 120,
    height: 120,
  },

  colorPreview: {
    width: "85%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },

  counter: {
    marginTop: 12,
    fontSize: 16,
  },
});

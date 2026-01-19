import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import PrimaryButton from "@/components/ui/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "TopicMenu">;

export default function TopicMenuScreen({ route, navigation }: Props) {
  const { topic } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{topic}</Text>

      <PrimaryButton
        title="📖 Learn words"
        onPress={() =>
          navigation.navigate("Learning", {
            topicKey: topic.toLowerCase(),
            title: topic,
          })
        }
      />

      <PrimaryButton
        title="🎧 Find picture by word"
        onPress={() => {
          navigation.navigate("Quiz", {
            topicKey: topic.toLowerCase(),
            title: topic,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
});

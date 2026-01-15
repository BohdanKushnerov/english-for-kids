import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import PrimaryButton from "@/components/ui/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "Topics">;

const TOPICS = ["Numbers", "Colors", "Animals"];

export default function TopicsScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a topic</Text>

      {TOPICS.map((topic) => (
        <PrimaryButton
          key={topic}
          title={topic}
          onPress={() => navigation.navigate("TopicMenu", { topic })}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
});

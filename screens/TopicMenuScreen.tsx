import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import PrimaryButton from "@/components/ui/PrimaryButton";

type Props = NativeStackScreenProps<RootStackParamList, "TopicMenu">;

const MENU_ITEMS = [
  { key: "learn", title: "📖 Learn words", type: "learning" },
  { key: "quiz", title: "🎧 Find picture by word", type: "quiz" },
];

export default function TopicMenuScreen({ route, navigation }: Props) {
  const { topic } = route.params;

  const numColumns = 2;
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 24 * 2 - 16) / numColumns; // padding *2 + gap

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{topic}</Text>

      <FlatList
        data={MENU_ITEMS}
        numColumns={numColumns}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={[styles.card, { width: cardWidth }]}>
            <PrimaryButton
              title={item.title}
              onPress={() => {
                if (item.type === "learning") {
                  navigation.navigate("Learning", {
                    topicKey: topic.toLowerCase(),
                    title: topic,
                  });
                } else {
                  navigation.navigate("Quiz", {
                    topicKey: topic.toLowerCase(),
                    title: topic,
                  });
                }
              }}
            />
          </View>
        )}
      />
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
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 24,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 12,

    // iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },

    // Android
    elevation: 4,
  },
});

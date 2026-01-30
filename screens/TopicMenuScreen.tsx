import PrimaryButton from "@/components/ui/PrimaryButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

const MENU_ITEMS = [
  { key: "learning", title: "📖 Learn words"},
  { key: "quiz", title: "🎧 Find picture by word"},
];

export default function TopicMenuScreen() {
  const router = useRouter();
  const { key } = useLocalSearchParams<{ key: string }>();

  const topicKey = String(key);
  const title = topicKey.toUpperCase();

  const numColumns = 2;
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 24 * 2 - 16) / numColumns;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

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
                router.push(
                  item.key === "learning"
                    ? `/topics/${topicKey.toLowerCase()}/${item.key}/learning`
                    : `/topics/${topicKey.toLowerCase()}/${item.key}/quiz`
                );
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

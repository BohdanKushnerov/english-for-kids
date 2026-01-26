import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ResultQuizModalProps {
  handleClickRefreshQuiz: () => void;
  showResult: boolean;
  correct: number;
  wrong: number;
}

export default function ResultQuizModal({
  handleClickRefreshQuiz,
  showResult,
  correct,
  wrong,
}: ResultQuizModalProps) {
  return (
    <Modal visible={showResult} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modal}>
          <Ionicons name="trophy-outline" size={48} color="#F59E0B" />

          <Text style={styles.modalTitle}>Results</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
              <Text style={styles.statLabel}>Correct</Text>
              <Text style={styles.statValue}>{correct}</Text>
            </View>

            <View style={styles.statBox}>
              <Ionicons name="close-circle" size={24} color="#EF4444" />
              <Text style={styles.statLabel}>Wrong</Text>
              <Text style={styles.statValue}>{wrong}</Text>
            </View>
          </View>

          <Pressable
            style={[styles.modalButton, styles.primaryBtn]}
            onPress={handleClickRefreshQuiz}
          >
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.modalBtnText}>Try Again</Text>
          </Pressable>

          <Pressable
            style={[styles.modalButton, styles.secondaryBtn]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
            <Text style={[styles.modalBtnText, { color: "#111827" }]}>
              Back
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    elevation: 10,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 10,
  },

  statsRow: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 16,
  },

  statBox: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    width: 120,
  },

  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },

  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 12,
  },

  primaryBtn: {
    backgroundColor: "#4CAF50",
  },

  secondaryBtn: {
    backgroundColor: "#E5E7EB",
  },

  modalBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

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
          {/* Иконка трофея */}
          <View style={styles.iconCircle}>
            <Ionicons name="trophy-outline" size={48} color="#F59E0B" />
          </View>

          {/* Заголовок */}
          <Text style={styles.modalTitle}>Your Results</Text>

          {/* Статистика */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { backgroundColor: "#ECFDF5" }]}>
              <Ionicons name="checkmark-circle" size={28} color="#22C55E" />
              <Text style={styles.statLabel}>Correct</Text>
              <Text style={styles.statValue}>{correct}</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: "#FEF2F2" }]}>
              <Ionicons name="close-circle" size={28} color="#EF4444" />
              <Text style={styles.statLabel}>Wrong</Text>
              <Text style={styles.statValue}>{wrong}</Text>
            </View>
          </View>

          <View style={styles.buttonsRow}>
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
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFFAEB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#F59E0B",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  modalTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 24,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
    marginBottom: 28,
  },

  statBox: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  statLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },

  modalButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
  },

  primaryBtn: {
    backgroundColor: "#22C55E",
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

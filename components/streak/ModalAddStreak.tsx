import ModalWrapper from "@/components/ui/Modal/ModalWrapper";
import { useSQLiteContext } from "expo-sqlite";
import { useRef, useState } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedButton } from "../ThemedButton";

export default function ModalAddStreak({
	visible,
	onClose,
	onFinishSave,
}: {
	visible: boolean;
	onClose: () => void;
	onFinishSave: () => void;
}) {
	const db = useSQLiteContext();
	const streakName = useRef("");
	const [loading, setLoading] = useState(false);
	const closeModal = () => {
		onClose();
		streakName.current = "";
	};
	const handleSave = async () => {
		if (streakName.current.trim() === "") {
			return;
		}
		setLoading(true);
		const currentDate = new Date().getTime();
		try {
			await db.runAsync(
				"INSERT INTO streak (title, start_date, current_streak_date, status) VALUES (?, ?, ?, ?)",
				streakName.current.trim(),
				currentDate,
				currentDate,
				"active",
			);

			onFinishSave();
			streakName.current = "";
			setLoading(false);
		} catch (err) {
			console.error({ err });
		}
	};
	return (
		<ModalWrapper
			visible={visible}
			title="Streak to Break Next!"
			onClose={closeModal}
		>
			<TextInput
				style={styles.input}
				placeholder="Name of the streak"
				onChangeText={(text) => {
					streakName.current = text;
				}}
			/>
			<View style={styles.modalActions}>
				<ThemedButton
					title="Cancel"
					onPress={closeModal}
					disabled={loading}
					type="transparent"
				/>
				<View style={styles.saveButtonContainer}>
					{loading ? (
						<ActivityIndicator size="small" color="#000" animating={loading} />
					) : (
						<ThemedButton
							type="confirmation"
							title="Let's Streak!"
							onPress={handleSave}
						/>
					)}
				</View>
			</View>
		</ModalWrapper>
	);
}

const styles = StyleSheet.create({
	saveButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	input: {
		height: 40,
		borderColor: "#ddd",
		borderWidth: 1,
		borderRadius: 4,
		paddingHorizontal: 8,
		marginBottom: 20,
		backgroundColor: "#fff"
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		columnGap: 8,
	},
});

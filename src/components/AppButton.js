import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export default function AppButton({ title, onPress, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: COLORS.primaryDark,
  },
  disabled: {
    backgroundColor: COLORS.disabled,
  },
  text: {
    color: COLORS.textOnPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
});

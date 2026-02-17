import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function AppButton({ title, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 6,
    width: '100%',
  },
  pressed: {
    backgroundColor: COLORS.primaryDark,
  },
  disabled: {
    backgroundColor: COLORS.disabled,
  },
  text: {
    color: COLORS.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

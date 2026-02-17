import { View, TextInput, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { COLORS } from '../theme/colors';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

export default function FloatingInput({
  label,
  value,
  onChangeText,
}: Props) {
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const labelStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 11],
    }),
    color: animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['#6B7280', '#04849e'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        {label}
      </Animated.Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        onFocus={() =>
          Animated.timing(animated, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }).start()
        }
        onBlur={() => {
          if (!value) {
            Animated.timing(animated, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }).start();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    position: 'relative',
  },

  label: {
    position: 'absolute',
    left: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    zIndex: 1,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.textQuaternary,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 17,
    color: '#000',
  },
});

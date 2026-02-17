import { Pressable, View, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';
import { COLORS } from '../theme/colors';

type Props = {
  value: boolean;
  onChange: (val: boolean) => void;
};

export default function Toggle({ value, onChange }: Props) {
  const translateX = useRef(new Animated.Value(value ? 18 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 18 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={[
        styles.container,
        { backgroundColor: value ? COLORS.primary : '#ccc' },
      ]}
    >
      <Animated.View
        style={[
          styles.thumb,
          { transform: [{ translateX }] },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 4,
    justifyContent: 'center',
  },

  thumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
  },
});

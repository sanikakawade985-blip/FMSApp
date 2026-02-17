import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

const { height } = Dimensions.get('window');

export default function ServiceScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.redBg} />
      <View style={styles.whiteSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  redBg: {
    top: 0,
    height: height * 0.11,
    backgroundColor: COLORS.primary,
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 10,
  },
});

import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable, Modal } from 'react-native';
import { COLORS } from '../../theme/colors';
import { useState } from 'react';
import { useDoubleBackExit } from '../../../hooks/useDoubleBackExit';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
    const [filter, setFilter] = useState<'Today' | 'Week' | 'Month' | 'Year'>(
      'Today'
    );
    const [dropdownVisible, setDropdownVisible] = useState(false);
    useDoubleBackExit();

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />

      <View style={styles.greetingRow}>
        <Text style={styles.headerGreeting}>Hello, Technician</Text>
        <Pressable style={styles.filterButton} onPress={() => setDropdownVisible(true)} >
          <Text style={styles.headerSub}>{filter}</Text>
          <Ionicons name="chevron-down" size={18} color="#FEE2E2" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.whiteSheet}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.profileTitle}>Profile Completion</Text>

        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>

        <Text style={styles.dateText}>Showing data for <Text style={[{color: '#212121'}]}>03-02-2026</Text></Text>

        <View style={styles.progressRow}>
          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <Text style={styles.circleValue}>0</Text>
              <Text style={styles.circleLabel}>Total Task</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <Text style={[styles.stat, { color: '#08cb50' }]}>00  Completed</Text>
            <Text style={[styles.stat, { color: '#f97316' }]}>00  Ongoing</Text>
            <Text style={[styles.stat, { color: '#9ca3af' }]}>00  InActive</Text>
            <Text style={[styles.stat, { color: '#dc2626' }]}>00  Rejected</Text>
            <Text style={styles.stat}>00  OnHold</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={dropdownVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <Pressable onPress={() => setDropdownVisible(false)} />
          <View style={styles.dropdown}>
            {(['Today', 'Week', 'Month', 'Year'] as const).map((item) => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setFilter(item);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </Pressable>
            ))}
          </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.primary },
  redBg: {
    top: 0,
    height: height * 0.1,
    backgroundColor: COLORS.primary,
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    //marginTop: 1,
    padding: 10,
  },
  profileTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
  },
  progressFill: {
    width: '70%',
    height: 6,
    backgroundColor: '#f59e0b',
    borderRadius: 3,
  },
  dateText: {
    marginVertical: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  circleWrapper: { alignItems: 'center', marginVertical: 20 },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 12,
    borderColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleValue: { fontSize: 28, fontWeight: '700' },
  circleLabel: { color: '#6b7280', fontSize: 16, fontWeight: '400' },
  stats: { marginTop: 10 },
  stat: { fontSize: 16, marginVertical: 4, fontWeight: '500' },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  greetingRow: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    height: 40,
  },

  headerGreeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 35,
  },

  headerSub: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 400,
  },

  dropdown: {
    position: 'absolute',
    top: 75,
    right: 18,
    backgroundColor: '#fff',
    borderRadius: 2,
    width: 140,
    elevation: 6,
  },

  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  dropdownText: {
    fontSize: 14,
    color: COLORS.textQuaternary,
    fontWeight: '500',
  },
});

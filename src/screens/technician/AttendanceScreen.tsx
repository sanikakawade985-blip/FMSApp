import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { TechnicianTabParamList } from '../../navigation/TechnicianTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type NavigationProp = BottomTabNavigationProp<
  TechnicianTabParamList,
  'Attendance'
>;

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function AttendanceScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedDate, setSelectedDate] = useState<number>(21);

  const renderCalendar = () => {
    const daysInMonth = 31;
    const startDay = 4;
    const cells = [];

    for (let i = 0; i < startDay; i++) {
      cells.push(<View key={`e-${i}`} style={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const selected = day === selectedDate;

      cells.push(
        <Pressable
          key={day}
          style={[styles.dayCell, selected && styles.selectedDay]}
          onPress={() => setSelectedDate(day)}
        >
          <Text style={selected ? styles.selectedText : styles.dayText}>
            {day}
          </Text>
        </Pressable>
      );
    }

    return cells;
  };

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.tabRow}>
          <Pressable style={styles.activeTab}>
            <Text style={styles.activeTabText}>ATTENDANCE</Text>
          </Pressable>
          <Pressable style={styles.inactiveTab} onPress={() => navigation.navigate('Leave')}>
            <Text style={styles.inactiveTabText}>LEAVES</Text>
          </Pressable>
        </View>

        <Text style={styles.monthText}>January 2026</Text>

        <View style={styles.weekRow}>
          {DAYS.map((d, index) => (
            <Text key={`${d}-${index}`} style={styles.weekText}>
              {d}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>{renderCalendar()}</View>

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#f87171' }]}>
            <Text style={styles.summaryText}>Total Absent</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.summaryText}>Total Present</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.summaryText}>Total Idle</Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: '#000' }]}>
            <Text style={styles.summaryText}>Total Leave</Text>
          </View>
        </View>

        <View style={styles.checkCard}>
          <Text style={styles.checkText}>CheckIn :</Text>
          <Text style={styles.checkText}>CheckOut :</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    height: 100,
    paddingTop: 120,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: '#f5d7d784',
    paddingVertical: 5,
    paddingHorizontal: 45,
    height: 40,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
  },
  inactiveTab: {
    paddingVertical: 5,
    paddingHorizontal: 45,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  inactiveTabText: {
    fontSize: 18,
    fontWeight: '400',
    color: COLORS.textQuaternary,
  },
  monthText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginVertical: 15,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  weekText: {
    width: '14%',
    textAlign: 'center',
    color: '#84868a',
    fontWeight: '500',
    fontSize: 16,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 6,
  },
  dayCell: {
    width: '14%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  dayText: {
    fontSize: 14,
    color: '#111',
  },
  selectedDay: {
    backgroundColor: '#22c55e',
    borderRadius: 100,
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 100,
  },
  summaryCard: {
    width: 78,
    height: 78,
    borderRadius: 14,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  summaryText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },
  checkCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 4,
  },
  checkText: {
    fontSize: 14,
    marginVertical: 4,
  },
});

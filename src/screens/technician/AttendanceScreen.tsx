import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { useState, useCallback } from 'react';
import { COLORS } from '../../theme/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TechnicianTabParamList } from '../../navigation/TechnicianTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { getAttendanceMonthlyApi } from '../../services/attendanceApi';
import { useAuthStore } from '../../store/authStore';

type NavigationProp = BottomTabNavigationProp<
  TechnicianTabParamList,
  'Attendance'
>;

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function AttendanceScreen() {

  const navigation = useNavigation<NavigationProp>();

  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());

  const token = useAuthStore((s) => s.token);
  const userId = useAuthStore((s) => s.uid);

  useFocusEffect(
    useCallback(() => {
      loadAttendance();
    }, [token, userId])
  );

  const loadAttendance = async () => {
    try {
      if (!token || !userId) return;

      const res = await getAttendanceMonthlyApi(token, Number(userId));

      if (Array.isArray(res?.ResultData)) {
        setAttendanceData(res.ResultData);
      } else {
        setAttendanceData([]);
      }

    } catch (err) {
      console.log('Attendance error:', err);
      setAttendanceData([]);
    }
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const selectedFullDate = new Date(year, month, selectedDate);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const attendanceMap = attendanceData.reduce((acc: any, item: any) => {

    if (!item?.Date) return acc;

    const date = item.Date.split('T')[0];
    acc[date] = item;

    return acc;

  }, {});

  const renderCalendar = () => {

    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={i} style={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {

      const selected = selectedDate === day;

      const dateStr =
        `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const attendance = attendanceMap[dateStr];

      let dotColor;

      if (attendance?.AttendanceTypeId === 2) dotColor = '#22c55e'; // Present
      if (attendance?.AttendanceTypeId === 3) dotColor = '#f87171'; // Absent
      if (attendance?.AttendanceTypeId === 5) dotColor = '#f59e0b'; // Idle
      if (attendance?.AttendanceTypeId === 6) dotColor = '#000'; // Leave

      const isFuture = new Date(year, month, day) > today;

      cells.push(
        <Pressable
          key={day}
          style={[styles.dayCell, selected && styles.selectedDay]}
          onPress={() => setSelectedDate(day)}
        >

          <Text
            style={[
              styles.dayText,
              isFuture && { color: '#ccc' },
              selected && styles.selectedText,
            ]}
          >
            {day}
          </Text>

          {dotColor && (
            <View style={[styles.dot, { backgroundColor: dotColor }]} />
          )}

        </Pressable>
      );
    }

    return cells;
  };

  const selectedAttendance = attendanceData.find((a) => {

    if (!a?.Date) return false;

    const date = a.Date.split('T')[0];

    const selected =
      `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;

    return date === selected;

  });

  const present = attendanceData.filter(a => a.AttendanceTypeId === 2).length;
  const absent = attendanceData.filter(a => a.AttendanceTypeId === 3).length;
  const idle = attendanceData.filter(a => a.AttendanceTypeId === 5).length;
  const leave = attendanceData.filter(a => a.AttendanceTypeId === 6).length;

  return (

    <View style={styles.root}>

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.tabRow}>

          <Pressable style={styles.activeTab}>
            <Text style={styles.activeTabText}>ATTENDANCE</Text>
          </Pressable>

          <Pressable
            style={styles.inactiveTab}
            onPress={() => navigation.navigate('Leave')}
          >
            <Text style={styles.inactiveTabText}>LEAVES</Text>
          </Pressable>

        </View>

        <Text style={styles.monthText}>
          {today.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>

        <View style={styles.weekRow}>
          {DAYS.map((d, i) => (
            <Text key={i} style={styles.weekText}>{d}</Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>{renderCalendar()}</View>

        <View style={styles.summaryRow}>

          <View style={[styles.summaryCard, { backgroundColor: '#f87171' }]}>
            <Text style={styles.summaryText}>Total Absent</Text>
            <Text style={styles.summaryValue}>{absent}</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#22c55e' }]}>
            <Text style={styles.summaryText}>Total Present</Text>
            <Text style={styles.summaryValue}>{present}</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.summaryText}>Total Idle</Text>
            <Text style={styles.summaryValue}>{idle}</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#000' }]}>
            <Text style={styles.summaryText}>Total Leave</Text>
            <Text style={styles.summaryValue}>{leave}</Text>
          </View>

        </View>

        <View style={styles.checkCard}>

          <View style={styles.line}>

            <Text style={styles.dateText}>
              {selectedFullDate.toLocaleDateString(undefined, {
                weekday: 'long',
              })}
            </Text>

            <Text style={styles.label}>CheckIn :</Text>

            <Text style={styles.time}>
              {selectedAttendance?.CheckIn
                ? new Date(selectedAttendance.CheckIn).toLocaleTimeString('en-JP')
                : '-NA-'}
            </Text>

          </View>

          <View style={styles.line}>

            <Text style={styles.dateText}>
              {selectedFullDate.toLocaleDateString('en-JP').replace(/\//g, '-')}
            </Text>

            <Text style={styles.label}>CheckOut :</Text>

            <Text style={styles.time}>
              {selectedAttendance?.CheckOut
                ? new Date(selectedAttendance.CheckOut).toLocaleTimeString('en-JP')
                : '-NA-'}
            </Text>

          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.white },

  tabRow: {
    flexDirection: 'row',
    height: 140,
    paddingTop: 100,
  },

  activeTab: {
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: '#f5d7d784',
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
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inactiveTabText: {
    fontSize: 18,
    color: COLORS.textQuaternary,
  },

  monthText: {
    textAlign: 'center',
    fontSize: 22,
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
    fontSize: 20,
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
    fontSize: 18,
    color: '#111',
  },

  selectedDay: {
    backgroundColor: '#22c55e',
    borderRadius: 100,
    width: 50,
    height: 50,
  },

  selectedText: {
    color: '#fff',
    fontWeight: '600',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 6,
    marginTop: 4,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },

  summaryCard: {
    width: 90,
    height: 120,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    margin: 5,
  },

  summaryText: {
    color: '#fff',
    fontSize: 18,
  },

  summaryValue: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '700',
  },

  checkCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 4,
  },

  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dateText: {
    width: '35%',
    fontSize: 16,
  },

  label: {
    width: '30%',
    fontSize: 16,
    fontWeight: '500',
  },

  time: {
    width: '35%',
    fontSize: 16,
  },
});
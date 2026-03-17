import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { useState, useEffect } from 'react';
import { useDoubleBackExit } from '../../../hooks/useDoubleBackExit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuthStore } from '../../store/authStore';
import {
  addAttendanceApi,
  getTodayAttendanceExistsApi,
} from '../../services/attendanceApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [filter, setFilter] = useState<'Today' | 'Week' | 'Month' | 'Year'>(
    'Today'
  );

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [attendanceChecked, setAttendanceChecked] = useState(false);

  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.uid);
  const name = useAuthStore((s) => s.name ?? 'Technician');

  const { height } = Dimensions.get('window');

  useDoubleBackExit();

  const todayKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `checked_in_${today}`;
  };

  useEffect(() => {
    if (!attendanceChecked && token && userId) {
      checkAttendance();
      setAttendanceChecked(true);
    }
  }, [token, userId]);

  const checkAttendance = async () => {
    try {
      if (!token || !userId) return;

      const localCheck = await AsyncStorage.getItem(todayKey());

      if (localCheck === 'true') {
        return; // already checked in today locally
      }

      const res = await getTodayAttendanceExistsApi(token, Number(userId));

      if (!res?.ResultData) {
        setShowCheckInModal(true);
      } else {
        await AsyncStorage.setItem(todayKey(), 'true');
      }

    } catch {
      setShowCheckInModal(true);
    }
  };

  const handleCheckIn = async () => {
    try {
      if (!token || !userId) return;

      const latitude = '18.5204';
      const longitude = '73.8567';

      await addAttendanceApi(token, Number(userId), latitude, longitude);

      await AsyncStorage.setItem(todayKey(), 'true');

      setShowCheckInModal(false);

      Alert.alert('Checked In Successfully');
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />

      <View style={styles.greetingRow}>
        <Text style={styles.headerGreeting}>Hello, {name}</Text>

        <Pressable
          style={styles.filterButton}
          onPress={() => setDropdownVisible(true)}
        >
          <Text style={styles.headerSub}>{filter}</Text>
          <Ionicons name="chevron-down" size={20} color="#FEE2E2" />
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

        <Text style={styles.dateText}>
          Showing data for{' '}
          <Text style={{ color: '#212121' }}>
            {new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}
          </Text>
        </Text>
        <View style={styles.progressRow}> 
          <View style={styles.circleWrapper}> 
            <View style={styles.circle}> 
              <Text style={styles.circleValue}>0</Text> 
              <Text style={styles.circleLabel}>Total Task</Text> 
            </View> 
          </View> 
          <View style={styles.stats}> 
            <Text style={[styles.stat, { color: '#08cb50' }]}>00 Completed</Text> 
            <Text style={[styles.stat, { color: '#f97316' }]}>00 Ongoing</Text> 
            <Text style={[styles.stat, { color: '#9ca3af' }]}>00 InActive</Text> 
            <Text style={[styles.stat, { color: '#dc2626' }]}>00 Rejected</Text> 
            <Text style={styles.stat}>00 OnHold</Text> 
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

      <Modal transparent visible={showCheckInModal} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>

            <Text style={styles.modalTitle}>Check-in for</Text>

            <Text style={styles.modalDate}>
              {new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </Text>

            <Pressable style={styles.confirmBtn} onPress={handleCheckIn}>
              <Text style={styles.confirmText}>CHECK-IN</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.primary },
  redBg: { top: 0, height: height * 0.1, backgroundColor: COLORS.primary },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 10,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 50,
  },
  headerGreeting: { fontSize: 22, fontWeight: '500', color: '#fff' },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: 35 },
  headerSub: { fontSize: 20, color: COLORS.white },

  dropdown: {
    position: 'absolute',
    top: 75,
    right: 18,
    backgroundColor: '#fff',
    width: 140,
    elevation: 6,
  },
  dropdownItem: { padding: 12 },
  dropdownText: { fontSize: 14 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    height: 250,
  },

  modalTitle: {
    fontSize: 22,
    paddingVertical: 15,
    textAlign: 'center',
  },

  modalDate: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '400',
  },

  confirmBtn: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },

  confirmText: { fontSize: 22, color: '#fff' },

  profileTitle: { fontSize: 18, fontWeight: '500', marginBottom: 10, paddingLeft: 10 }, 
  progressBar: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3 }, 
  progressFill: { width: '70%', height: 6, backgroundColor: '#f59e0b', borderRadius: 3, }, 
  dateText: { marginVertical: 12, fontSize: 18, color: '#6b7280' },

  circleWrapper: { alignItems: 'center', marginVertical: 20 }, 
  circle: { width: 200, height: 200, borderRadius: 100, borderWidth: 18, borderColor: '#2563eb', alignItems: 'center', justifyContent: 'center', }, 
  circleValue: { fontSize: 28, fontWeight: '700' }, 
  circleLabel: { color: '#6b7280', fontSize: 18 }, 
  stats: { marginTop: 10 }, 
  stat: { fontSize: 18, marginVertical: 4, fontWeight: '500', paddingVertical: 10 }, 
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, },
});
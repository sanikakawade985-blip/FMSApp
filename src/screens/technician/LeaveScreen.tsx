import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Image,
} from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { TechnicianTabParamList } from '../../navigation/TechnicianTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type NavigationProp = BottomTabNavigationProp<
  TechnicianTabParamList,
  'Leave'
>;

export default function LeaveScreen() {
  
  const [filter1, setFilter1] = useState<
    'Dec 2025' | 'Jan 2026' | 'Feb 2026'
  >('Feb 2026');

  const [filter2, setFilter2] = useState<
    'Status' | 'Approved' | 'Declined' | 'Pending'
  >('Status');

  const [activeDropdown, setActiveDropdown] =
    useState<'Feb 2026' | 'STATUS' | null>(null);

    const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.root}>
        <View style={styles.tabRow}>
            <Pressable style={styles.inactiveTab} onPress={() => navigation.navigate('Attendance')}>
                <Text style={styles.inactiveTabText}>ATTENDANCE</Text>
            </Pressable>
            <Pressable style={styles.activeTab}>
                <Text style={styles.activeTabText}>LEAVES</Text>
            </Pressable>
        </View>
      <View style={styles.whiteSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.filterRow}>
            <Pressable
              style={styles.filterItem}
              onPress={() => setActiveDropdown('Feb 2026')}
            >
              <Text style={styles.filterText}>{filter1}</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={COLORS.primary}
              />
            </Pressable>

            <Pressable
              style={styles.filterItem}
              onPress={() => setActiveDropdown('STATUS')}
            >
              <Text style={styles.filterText}>{filter2}</Text>
              <Ionicons
                name="chevron-down"
                size={16}
                color={COLORS.primary}
              />
            </Pressable>

            <Pressable style={styles.leaveBtn}>
              <Text style={styles.leaveText}>+ Leave</Text>
            </Pressable>
          </View>

          <View style={styles.emptyState}>
            <Image
              style={styles.emptyImage}
              resizeMode="contain"
              source={require('../../../assets/images/noresultfound.png')}
            />
          </View>
        </ScrollView>

        <Modal
          visible={activeDropdown !== null}
          transparent
          animationType="fade"
          onRequestClose={() => setActiveDropdown(null)}
        >
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setActiveDropdown(null)}
          />

          <View style={styles.dropdown}>
            {activeDropdown === 'Feb 2026' &&
              (['Dec 2025', 'Jan 2026', 'Feb 2026'] as const).map((item) => (
                <Pressable
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFilter1(item);
                    setActiveDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
                </Pressable>
              ))}

            {activeDropdown === 'STATUS' &&
              ([
                'Status',
                'Approved',
                'Declined',
                'Pending',
              ] as const).map((item) => (
                <Pressable
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFilter2(item);
                    setActiveDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
                </Pressable>
              ))}
          </View>
        </Modal>
      </View>
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
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 24,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterText: {
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  leaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 32,
    width: 90,
    borderRadius: 12,
    gap: 6,
    backgroundColor: '#000',
  },
  leaveText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyImage: {
    width: 220,
    height: 220,
    marginBottom: 16,
  },
  dropdown: {
    position: 'absolute',
    top: 250,
    left: 45,
    backgroundColor: '#fff',
    width: 300,
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

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { TechnicianTabParamList } from '../../navigation/TechnicianTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type NavigationProp = BottomTabNavigationProp<
  TechnicianTabParamList,
  'Passbook'
>;

export default function PassbookScreen() {

  const navigation = useNavigation<NavigationProp>();

  const [activePeriod, setActivePeriod] = useState<
    'today' | 'monthly' | 'yearly'
  >('today');

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.tabRow}>
          <Pressable style={styles.activeTab}>
            <Text style={styles.activeTabText}>PASSBOOK</Text>
          </Pressable>
          <Pressable style={styles.inactiveTab} onPress={() => navigation.navigate('Expenditure')}>
            <Text style={styles.inactiveTabText}>EXPENDITURE</Text>
          </Pressable>
        </View>

        <View style={styles.periodRow}>
          {(['today', 'monthly', 'yearly'] as const).map((period) => (
            <Pressable
              key={period}
              style={[
                styles.periodBtn,
                activePeriod === period && styles.activePeriod,
              ]}
              onPress={() => setActivePeriod(period)}
            >
              <Text
                style={[
                  styles.periodText,
                  activePeriod === period && styles.activePeriodText,
                ]}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.whiteSheet}>
          <View style={styles.earnRow}>
            <Pressable style={styles.caretButton}>
              <Ionicons name="caret-back" size={24} color="#111" />
            </Pressable>
            <View>
              <Text style={styles.earningTitle}>Today's Earnings</Text>
              <Text style={styles.earningAmount}>Rs. 0</Text>
            </View>
            <Pressable style={styles.caretButton}>
              <Ionicons name="caret-forward" size={24} color="#111" />
            </Pressable>
          </View>

          <LinearGradient
            colors={['#fcbbc2', '#fdcfd5', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.redSheet}
          >
            <View style={styles.progressBarBg}>
              <View style={styles.progressBarFill} />
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.mutedText}>
                Estimated Earnings <Text style={styles.bold}>Rs. 0</Text>
              </Text>
              <Text style={styles.percentText}>80%</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={[styles.bold, { fontSize: 22 }]}>Credit Given</Text>
              <Text style={[styles.bold, { fontSize: 22 }]}>Rs. 0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={{fontSize:20}}>Expenses</Text>
              <Text style={styles.bold}>Rs. 0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={{fontSize:20}}>Received</Text>
              <Text style={styles.bold}>Rs. 0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={{fontSize:20}}>Remaining Amount</Text>
              <Text style={styles.bold}>Rs. 0</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    marginTop: 18,
    justifyContent: 'center',
  },
  redSheet: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 16,
    height: 600,
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
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginTop: 25,
  },
  periodBtn: {
    paddingVertical: 8,
    paddingHorizontal: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#c7c7c5',
  },
  activePeriod: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodText: {
    color: '#111',
    fontWeight: '600',
    fontSize: 15,
  },
  activePeriodText: {
    color: '#fff',
  },
  earnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  earningTitle: {
    fontSize: 25,
    textAlign: 'center',
  },
  earningAmount: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#ededed',
    borderRadius: 4,
    marginBottom: 14,
  },
  progressBarFill: {
    width: '80%',
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 18,
  },
  divider: {
    height: 1,
    width: '95%',
    backgroundColor: '#f8eeee',
    marginVertical: 6,
    alignContent: 'center',
    alignSelf: 'center',
  },
  bold: {
    fontWeight: '600',
    fontSize: 20,
  },
  mutedText: {
    color: '#374151',
    fontSize: 16,
  },
  percentText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 16,
  },
  caretButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
});

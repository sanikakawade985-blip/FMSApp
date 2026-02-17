import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';

export default function AddLeadScreen() {

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View style={styles.tabRow}>
          <Pressable style={styles.activeTab}>
            <Text style={styles.activeTabText}>EXPENDITURE</Text>
          </Pressable>
          <Pressable style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>PASSBOOK</Text>
          </Pressable>
        </View>

        <View style={styles.whiteSheet}>
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
              <Text>Expenses</Text>
              <Text style={styles.bold}>Rs. 0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text>Received</Text>
              <Text style={styles.bold}>Rs. 0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text>Remaining Amount</Text>
              <Text style={styles.bold}>Rs. 0</Text>
            </View>
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
    fontSize: 18,
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

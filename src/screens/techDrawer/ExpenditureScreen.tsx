import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { TechnicianTabParamList } from '../../navigation/TechnicianTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useState } from 'react';

type NavigationProp = BottomTabNavigationProp<
  TechnicianTabParamList,
  'Expenditure'
>;

export default function ExpenditureScreen() {

  const [ showAddExpenseModal, setShowAddExpenseModal ] = useState(false);

  const navigation = useNavigation<NavigationProp>();

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
          <Pressable style={styles.inactiveTab} onPress={() => navigation.navigate('Passbook')}>
            <Text style={styles.inactiveTabText}>PASSBOOK</Text>
          </Pressable>
        </View>

        <View style={styles.headerRow}>
          <Text style={styles.headerSub}>16 Feb 2026</Text>
          <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
        </View>
        <Text style={styles.bold}>Technician Name</Text>

        <View style={styles.whiteCard}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Credited Amount: </Text>
            <Text style={styles.bold}>0</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Opening Amount: </Text>
            <Text style={styles.bold}>0</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Earned Amount: </Text>
            <Text style={styles.bold}>0</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Total Expense: </Text>
            <Text style={styles.bold}>0</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.label}>Return: </Text>
            <Text style={styles.bold}>0</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <Text style={styles.bold}>Remaining Amount: </Text>
            <Text style={styles.bold}>0</Text>
          </View>
        </View>

        <View style={styles.lowerRow}>
          <Text style={{color: COLORS.primary, fontSize: 18, fontWeight: '400'}}>Expense List</Text>
          <Pressable onPress={() => setShowAddExpenseModal(true)}>
            <Ionicons name="add" size={30} color={COLORS.primary} />
          </Pressable>
        </View>

        <View style={styles.whiteCard}>
          <Text style={{color: COLORS.black, fontSize: 16, fontWeight: '400', paddingBottom: 15}}>NA</Text>
        </View>

      </ScrollView>
      <Modal
        transparent
        visible={showAddExpenseModal}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>
              Add Expense
            </Text>

            <View style={styles.expImage}>
              <Ionicons name='image-outline' size={60} color='#999' />
              <TextInput
                placeholder="Upload Expense Photo"
                placeholderTextColor="#999"
                style={{fontSize: 20}}
              />
            </View>

            <View style={styles.expName}>
              <TextInput
                placeholder="Expense Name"
                placeholderTextColor="#999"
                style={{fontSize: 20}}
              />
            </View>

            <View style={styles.expName}>
              <TextInput
                placeholder="Please Enter Amount"
                placeholderTextColor="#999"
                style={{fontSize: 20}}
              />
            </View>
      
            <Pressable
              style={styles.confirmBtn}
              onPress={() => {
                setShowAddExpenseModal(false);
                console.log('Confirmed Add Expense');
              }}
            >
              <Text style={styles.confirmText}>ADD</Text>
            </Pressable>
            <Pressable onPress={() => setShowAddExpenseModal(false)} >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  whiteCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingTop: 16,
    paddingHorizontal: 10,
    marginTop: 18,
    justifyContent: 'center',
    elevation: 4,
    marginHorizontal: 15,
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

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 18,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#000000',
    marginVertical: 6,
    alignContent: 'center',
    alignSelf: 'center',
  },
  bold: {
    fontWeight: '600',
    fontSize: 18,
    paddingHorizontal: 18,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 20,
    gap: 4,
  },

  headerSub: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
  },
  label: {
    fontSize: 18,
  },

  lowerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

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
  height: 'auto',
},

modalTitle: {
  fontSize: 24,
  fontWeight: '400',
},

confirmBtn: {
  padding: 10,
  borderRadius: 40,
  backgroundColor: COLORS.primary,
  alignItems: 'center',
  elevation: 4,
  height: 50,
},

cancelText: {
  fontSize: 20,
  color: COLORS.primary,
  fontWeight: '500',
  textAlign: 'center',
  marginTop: 30,
},

confirmText: {
  fontSize: 20,
  color: '#fff',
  fontWeight: '500',
  textAlign: 'center',
},

expName: {
  borderWidth: 1,
  borderColor: '#382f2f',
  borderRadius: 30,
  paddingHorizontal: 10,
  marginTop: 20,
  marginBottom: 20,
  height: 'auto',
},
expImage: {
  borderWidth: 1,
  borderColor: '#382f2f',
  borderRadius: 30,
  padding: 10,
  marginTop: 20,
  marginBottom: 20,
  height: 200,
  alignItems: 'center',
  justifyContent: 'center',
},
});

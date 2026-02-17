import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';

const { height } = Dimensions.get('window');

export default function TaskScreen() {
  const [filter1, setFilter1] = useState<
    'Select Task Tag' | 'HG Tag' | 'I Tag'
  >('Select Task Tag');

  const [filter2, setFilter2] = useState<
    'Status' | 'Completed' | 'Rejected' | 'Ongoing' | 'Inactive' | 'On Hold'
  >('Status');

  const [activeDropdown, setActiveDropdown] =
    useState<'TAG' | 'STATUS' | null>(null);

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />

      <View style={styles.monthRow}>
        <Text style={styles.monthText}>Jan 2026</Text>
        <Ionicons name="chevron-down" size={18} color="#fff" />
      </View>

      <View style={styles.whiteSheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              placeholder="Customer Or Task Id Number"
              placeholderTextColor="#999"
              style={styles.searchInput}
              cursorColor={COLORS.primary}
            />
            <Ionicons name="close" size={24} color="#494747ff" />
          </View>

          <View style={styles.filterRow}>
            <Pressable
              style={styles.filterItem}
              onPress={() => setActiveDropdown('TAG')}
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

            <Pressable style={styles.refreshItem}>
              <Text style={styles.refreshText}>Refresh List</Text>
              <Ionicons name="refresh" size={16} color={COLORS.primary} />
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
            {activeDropdown === 'TAG' &&
              (['Select Task Tag', 'HG Tag', 'I Tag'] as const).map((item) => (
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
                'Completed',
                'Rejected',
                'Ongoing',
                'Inactive',
                'On Hold',
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
    backgroundColor: COLORS.primary,
  },
  redBg: {
    height: height * 0.10,
    backgroundColor: COLORS.primary,
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 6,
    height: 45,
    backgroundColor: COLORS.primary,
  },
  monthText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 6,
    marginTop: 6,
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#382f2f',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: COLORS.textPrimary,
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
  refreshItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  refreshText: {
    fontSize: 15,
    color: COLORS.primary,
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

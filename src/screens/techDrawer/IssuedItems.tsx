//   const [activeTab, setActiveTab] = useState<'issued' | 'requested'>('issued');

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function IssuedItems() {
  const navigation = useNavigation<any>();

  const data = [
    { id: '1', name: 'UPS 600va', available: 1, note: 'na', taskId: '271957' },
    { id: '2', name: 'CCTV', available: 4, note: 'Model', taskId: '268148' },
    { id: '3', name: 'CCTV', available: 1, note: 'Model', taskId: '269041' },
    { id: '4', name: 'AC duct', available: 2, note: 'Used for repairing', taskId: '180958' },
    { id: '5', name: 'Fridge Compressor', available: 1, note: 'Only Fridge 225 240 260', taskId: '181247' },
    { id: '6', name: 'Magnetic Switch', available: 1, note: 'Electrical switch that opens/closes contact...', taskId: '206640' },
    { id: '7', name: 'Tool Kit', available: 13, note: 'ABC133', taskId: '384598' },
  ];

  return (
    <View style={styles.root}>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <Pressable style={styles.activeTab}>
          <Text style={styles.activeTabText}>ISSUED ITEMS</Text>
        </Pressable>

        <Pressable
          style={styles.inactiveTab}
          onPress={() => navigation.navigate('Requested Items')}
        >
          <Text style={styles.inactiveTabText}>REQUESTED ITEMS</Text>
        </Pressable>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search here"
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
        <Ionicons name="close" size={20} color="#888" />
      </View>

      <View style={styles.whiteCard}>
        {/* List */}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.taskBadge}>
                <Text style={styles.taskText}>
                  TASK ID: {item.taskId}
                </Text>
              </View>

              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemSub}>Available: {item.available}</Text>
              <Text style={styles.itemSub}>Note : {item.note}</Text>
            </View>
          )}
        />
      </View>
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
    paddingVertical: 6,
    paddingHorizontal: 20,
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
    fontSize: 15,
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
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.textQuaternary,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#382f2f',
    marginBottom: 12,
    paddingTop: 5,
    marginHorizontal: 18,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 20,
    color: COLORS.textPrimary,
  },

card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 4,
    width: 'auto',
  },

  taskBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },

  taskText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },

  itemSub: {
    fontSize: 16,
    color: '#555',
  },
});
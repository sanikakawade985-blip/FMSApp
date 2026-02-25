import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';

export default function RequestedItems() {
  const navigation = useNavigation<any>();

  const data = [
    { id: '1', req: '#REQ 7990', issue: 'No', date: '03-02-2026', code: 'CFT0302260004' },
    { id: '2', req: '#REQ 7986', issue: 'No', date: '03-02-2026', code: 'CFT0302260004' },
    { id: '3', req: '#REQ 7985', issue: 'No', date: '03-02-2026', code: 'CFT0302260004' },
    { id: '4', req: '#REQ 7984', issue: 'No', date: '03-02-2026', code: 'CFT0302260004' },
  ];

  return (
    <View style={styles.root}>
      
      {/* Tabs */}
      <View style={styles.tabRow}>
        <Pressable
          style={styles.inactiveTab}
          onPress={() => navigation.navigate('Item Inventory')}
        >
          <Text style={styles.inactiveTabText}>ISSUED ITEMS</Text>
        </Pressable>

        <Pressable style={styles.activeTab}>
          <Text style={styles.activeTabText}>REQUESTED ITEMS</Text>
        </Pressable>
      </View>

      {/* + Request Button */}
      <View style={styles.requestRow}>
        <Pressable style={styles.requestButton}>
          <Ionicons name="add" size={16} color="#fff" />
          <Text style={styles.requestText}>Request</Text>
        </Pressable>
      </View>

      {/* Filters Row */}
      <View style={styles.filterRow}>
        <Pressable style={styles.filterItem}>
          <Text style={styles.filterText}>Status Tag</Text>
          <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
        </Pressable>

        <Pressable style={styles.filterItem}>
          <Text style={styles.filterText}>Issue</Text>
          <Ionicons name="chevron-down" size={18} color={COLORS.primary} />
        </Pressable>

        <Pressable style={styles.refreshItem}>
          <Text style={styles.refreshText}>Refresh List</Text>
          <Ionicons name="refresh" size={18} color={COLORS.primary} />
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            
            {/* NA Badge */}
            <View style={styles.naBadge}>
              <Text style={styles.naText}>NA</Text>
            </View>

            <View style={styles.cardContent}>
              
              <View style={{ flex: 1 }}>
                <View style={styles.topRow}>
                  <Text style={styles.reqText}>{item.req}</Text>
                  <Text style={styles.issueText}>
                    Issue: <Text style={{ color: COLORS.primary }}>{item.issue}</Text>
                  </Text>
                  <Text style={styles.dateText}>Date {item.date}</Text>
                </View>

                <Text style={styles.codeText}>{item.code}</Text>

                <Text style={styles.notesText}>Notes</Text>
              </View>

              <Ionicons
                name="trash-outline"
                size={22}
                color={COLORS.primary}
                style={{ marginTop: 8 }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  tabRow: {
    marginTop: 80,
    flexDirection: 'row',
    height: 60,
  },

  activeTab: {
    flex: 1,
    borderBottomWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: '#f5d7d784',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inactiveTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },

  inactiveTabText: {
    fontSize: 16,
    color: '#777',
  },

  requestRow: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginVertical: 10,
  },

  requestButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    gap: 6,
  },

  requestText: {
    color: '#fff',
    fontWeight: '600',
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  filterText: {
    fontSize: 16,
  },

  refreshItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  refreshText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 18,
    elevation: 4,
  },

  naBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 18,
    width: 100,
  },

  naText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  cardContent: {
    flexDirection: 'row',
    marginTop: 10,
  },

  topRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
    justifyContent: 'flex-end',
  },

  reqText: {
    color: '#2a7be4',
    fontWeight: '600',
  },

  issueText: {
    fontWeight: '500',
  },

  dateText: {
    color: '#999',
  },

  codeText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginVertical: 6,
  },

  notesText: {
    color: '#555',
  },
});
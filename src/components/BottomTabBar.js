import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { COLORS } from '../theme/colors';

export default function BottomTabBar({ state, navigation }) {
  const [fabOpen, setFabOpen] = useState(false);

  const current = state.routes[state.index].name;

  const tab = (name, icon) => {
    const active = current === name;
    return (
      <Pressable
        onPress={() => {
          setFabOpen(false);
          navigation.navigate(name);
        }}
        style={styles.item}
      >
        <Ionicons
          name={icon}
          size={24}
          color={active ? COLORS.primary : '#484a4e'}
        />
        <Text
          style={[
            styles.label,
            { color: active ? COLORS.primary : '#484a4e' },
          ]}
        >
          {name}
        </Text>
      </Pressable>
    );
  };

  const navigateFromFab = (route) => {
    setFabOpen(false);
    navigation.navigate(route);
  };

  return (
    <>
      {/* Overlay */}
      {fabOpen && (
        <Pressable
          style={styles.overlay}
          onPress={() => setFabOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      {fabOpen && (
        <View style={styles.bottomSheet}>
          {/* Close Button */}
          <Pressable
            style={styles.closeBtn}
            onPress={() => setFabOpen(false)}
          >
            <Ionicons name="close" size={32} color={COLORS.primary} />
          </Pressable>

          {/* Options */}
          <Pressable
            style={styles.sheetItem}
            onPress={() => navigateFromFab('AddQuote')}
          >
            <Ionicons
              name="cube-outline"
              size={28}
              color={COLORS.primary}
            />
            <Text style={styles.sheetText}>Add Quote</Text>
          </Pressable>

          <Pressable
            style={styles.sheetItem}
            onPress={() => navigateFromFab('AddInvoice')}
          >
            <Ionicons
              name="document-text-outline"
              size={28}
              color={COLORS.primary}
            />
            <Text style={styles.sheetText}>Add Invoice</Text>
          </Pressable>

          <Pressable
            style={styles.sheetItem}
            onPress={() => navigateFromFab('AddLead')}
          >
            <Ionicons
              name="people-outline"
              size={28}
              color={COLORS.primary}
            />
            <Text style={styles.sheetText}>Add Lead</Text>
          </Pressable>
        </View>
      )}

      {/* Tab Bar */}
      <View style={styles.container}>
        {tab('Home', 'home-outline')}
        {tab('Task', 'document-text-outline')}

        {/* Center FAB */}
        <Pressable
          onPress={() => setFabOpen(!fabOpen)}
          style={styles.center}
        >
          <View style={styles.fab}>
            <Ionicons
              name="add"
              size={26}
              color="#fff"
            />
          </View>
        </Pressable>

        {tab('Attendance', 'calendar-clear-outline')}
        {tab('Passbook', 'book-outline')}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 10,
    elevation: 10,
    height: 80,
    zIndex: 1,
  },

  item: { flex: 1, alignItems: 'center' },

  label: { fontSize: 15, marginTop: 2, fontWeight: '500' },

  center: { flex: 1, alignItems: 'center' },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    elevation: 8,
  },

  /* Overlay */
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 5,
  },

  /* Bottom Sheet */
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 15,
    paddingBottom: 30,
    paddingHorizontal: 24,
    elevation: 20,
    zIndex: 10,
  },

  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  sheetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 50,
  },

  sheetText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 30,
    color: '#1f2937',
  },
});

//src/components/AppHeader.js
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import { DrawerActions } from '@react-navigation/native';

export default function AppHeader({ title, navigation }) {
  return (
    <>
      <View style={styles.redBg} />

      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu-outline" size={26} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>{title}</Text>

        <View style={styles.headerIcons}>
          <Ionicons name="location-outline" size={22} color="#fff" />
          <Pressable onPress={() => navigation.navigate('help')}>
            <Ionicons name="headset-outline" size={22} color="#fff" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('notification')}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  redBg: {
    position: 'absolute',
    width: '100%',
    backgroundColor: COLORS.primary,
  },
  header: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    height: 90,
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 6,
    paddingBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 1,
    elevation: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 14,
  },
});

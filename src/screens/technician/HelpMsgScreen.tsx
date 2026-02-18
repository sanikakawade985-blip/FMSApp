import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TechnicianTabParamList } from '../../navigation/TechnicianTabs';

type NavigationProp = BottomTabNavigationProp<
  TechnicianTabParamList,
  'helpMessages'
>;

export default function HelpMessagesScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.redBg} />

      {/* Sub Header */}
      <View style={styles.subHeader}>
        <Ionicons
          name="chevron-back"
          size={26}
          color="#fff"
          onPress={() => navigation.navigate('help')}
        />
        <Text style={styles.subHeaderTitle}>Messages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>Start a new chat</Text>

        {/* New Conversation Card */}
        <Pressable
          style={styles.newCard}
          onPress={() => navigation.navigate('help')}
        >
          <View>
            <Text style={styles.newTitle}>New Conversation</Text>
            <Text style={styles.newSubtitle}>
              We typically reply in a few minutes
            </Text>
          </View>

          <Ionicons
            name="paper-plane-outline"
            size={22}
            color={COLORS.primary}
          />
        </Pressable>

        {/* Recent Section */}
        <Text style={styles.recentTitle}>Recent</Text>

        <Pressable style={styles.recentItem}>
          <View style={{ flex: 1 }}>
            <View style={styles.recentTopRow}>
              <Text style={styles.name}>Walter Chahat</Text>
              <Text style={styles.time}>now</Text>
            </View>

            <View style={styles.recentBottomRow}>
              <Text style={styles.preview}>
                Welcome to FieldWeb, if you need help simply...
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#888" />
            </View>
          </View>
        </Pressable>

      </ScrollView>

      <View style={styles.footer}>
              <View style={styles.footerRow}>
                <Pressable style={styles.footerItem}
                 onPress={() => navigation.navigate('help')}>
                  <Ionicons
                    name="home-outline"
                    size={24}
                    color="#555"
                  />
                </Pressable>
                <Pressable style={styles.footerItem}>
                  <Ionicons
                    name="chatbox-outline"
                    size={24}
                  color={COLORS.primary}
                  />
                </Pressable>
              </View>
              <Text style={styles.footerText}>Powered by tawk.to</Text>
            </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  redBg: {
    top: 0,
    height: 80,
    backgroundColor: COLORS.primary,
  },
  subHeader: {
    backgroundColor: COLORS.primary,
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  subHeaderTitle: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 15,
    fontWeight: '600',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '400',
    marginBottom: 20,
  },

  newCard: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },

  newTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  newSubtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 6,
  },

  recentTitle: {
    fontSize: 26,
    marginBottom: 15,
  },

  recentItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },

  recentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 15,
    color: '#666',
  },

  time: {
    fontSize: 15,
    color: '#999',
  },

  recentBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  preview: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },

  badge: {
    backgroundColor: COLORS.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  badgeText: {
    color: '#fff',
    fontSize: 12,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    height: 100,
    elevation: 10,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerItem: {
    flex: 1,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    paddingTop: 15,
  },
});

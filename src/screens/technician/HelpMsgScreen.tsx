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

export default function HelpMessagesScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      {/* Sub Header */}
      <View style={styles.subHeader}>
        <Ionicons
          name="chevron-back"
          size={26}
          color="#fff"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.subHeaderTitle}>Messages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <Text style={styles.title}>Start a new chat</Text>

        {/* New Conversation Card */}
        <Pressable
          style={styles.newCard}
          onPress={() => navigation.navigate('SupportChat')}
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

        <Pressable
          style={styles.recentItem}
          onPress={() => navigation.navigate('SupportChat')}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.recentTopRow}>
              <Text style={styles.name}>Walter Chahat</Text>
              <Text style={styles.time}>now</Text>
            </View>

            <View style={styles.recentBottomRow}>
              <Text style={styles.preview}>
                Welcome to FieldWeb, if you need help simpl...
              </Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#888" />
            </View>
          </View>
        </Pressable>

      </ScrollView>

      {/* Bottom Branding */}
      <View style={styles.bottomBar}>
        <Ionicons name="home-outline" size={26} color="#777" />
        <Ionicons name="chatbubble-outline" size={26} color={COLORS.primary} />
        <Text style={styles.powered}>Powered by tawk.to</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  subHeader: {
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: '500',
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
    fontSize: 18,
    color: '#666',
  },

  time: {
    fontSize: 16,
    color: '#999',
  },

  recentBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  preview: {
    flex: 1,
    fontSize: 17,
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

  bottomBar: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  powered: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
  },
});

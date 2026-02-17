import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, StatusBar, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height } = Dimensions.get('window');

export default function SettingScreen() {
  const [expanded, setExpanded] = useState(false);
  const renderCard = (icon: string, title: string) => (
    <Pressable style={({ pressed }) => [
      styles.topCard,
      pressed && styles.pressed
    ]}>
      <Ionicons name={icon} size={28} color={COLORS.primary} />
      <Text style={styles.topCardText}>{title}</Text>
    </Pressable>
  );

  const renderItem = (icon: string, title: string) => (
    <Pressable style={({ pressed }) => [
      styles.listItem,
      pressed && styles.pressed
    ]}>
      <Ionicons name={icon} size={30} color={COLORS.primary} />
      <Text style={styles.listText}>{title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />
      <View style={styles.whiteSheet}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.cardRow}>
            {renderCard('phone-portrait-outline', 'App Tour')}
            {renderCard('star-outline', 'Rate Us')}
            {renderCard('thumbs-up-outline', 'Feedback')}
          </View>
          {renderItem('language-outline', 'Change Language')}
          {renderItem('trash-outline', 'Delete Account')}
          {renderItem('document-text-outline', 'Terms & Condition')}
          {renderItem('shield-checkmark-outline', 'Privacy Policy')}
          {renderItem('cash-outline', 'Refund Policy')}
          {renderItem('information-circle-outline', 'About Fieldweb')}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              CoreField Technologies Pvt. Ltd.
            </Text>
            <Pressable
              style={styles.footerButton}
              onPress={() => setExpanded(prev => !prev)}
            >
              <Ionicons
                name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                size={22}
                color="#000000"
              />
            </Pressable>
          </View>
          {expanded && (
            <View style={styles.expandSection}>
              <Text style={styles.expandText}>
                Address 
              </Text>
              <View style={{ flexDirection: 'row', gap: 88 }}>
                <Text style={styles.expandSubtext}>
                  90b, Delhi - Jaipur Expy, Sector 18, {`\n`}Gurugram, Haryana, India - 122008
                </Text>
                <Ionicons name="location-outline" size={26} color={COLORS.primary} style={{ marginVertical: 10 }} />
              </View>
              <Text style={styles.expandText}>
                Phone 
              </Text>
              <View style={{ flexDirection: 'row', gap: 228 }}>
                <Text style={styles.expandSubtext}>
                  +91 9315228028
                </Text>
                <Ionicons name="call-outline" size={26} color={COLORS.primary} />
              </View>
              <Text style={styles.expandText}>
                Email 
              </Text>
              <View style={{ flexDirection: 'row', gap: 205}}>
                <Text style={styles.expandSubtext}>
                  info@fieldweb.co.in
                </Text>
                <Ionicons name="mail-outline" size={26} color={COLORS.primary} />
              </View>
            </View>
          )}
        </ScrollView>
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
    top: 0,
    height: height * 0.12,
    backgroundColor: COLORS.primary,
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 10,
  },
  content: {
    padding: 15,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topCard: {
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 3,
  },
  topCardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
   listItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
  },
  listText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#000000',
    fontWeight: '400',
  },
  pressed: {
    backgroundColor: '#FFE5EA',
  },
  footer: {
    marginTop: 30,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  footerText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#505050',
  },
  footerButton: {
  width: 40,
  height: 25,
  borderRadius: 3,
  backgroundColor: '#d3d3d3',
  justifyContent: 'center',
  alignItems: 'center',
  left: 15,
  alignSelf: 'flex-start',
},
expandSection: {
  paddingVertical: 10,
  paddingHorizontal: 10,
},
expandText: {
  fontSize: 16,
  color: '#505050',
  marginBottom: 6,
},
expandSubtext: {
  fontSize: 18,
  color: '#000000',
},
});

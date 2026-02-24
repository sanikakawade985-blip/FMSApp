import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { COLORS } from '../theme/colors';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

export default function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {

  const [ showLogoutModal, setShowLogoutModal ] = useState(false);
  const [ showCheckOutModal, setShowCheckOutModal ] = useState(false);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const name = useAuthStore((state) => state.name);
  const phone = useAuthStore((state) => state.phone);

  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>

        <View style={styles.profileWrapper}>
          <Image
            source={require('../../assets/images/image.png')}
            style={styles.pfp}
            resizeMode="cover"
          />

          <Pressable
            style={styles.editProfile}
            onPress={() => console.log('Edit Profile')}
          >
            <Ionicons name="create-outline" size={16} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name ?? 'User'}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="star" size={18} color={COLORS.primary} />
            <Text style={{ color: COLORS.primary, fontSize: 16 }}>4.5</Text>
          </View>

          <Text style={styles.phone}>{phone ?? ''}</Text>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
        >
          <Ionicons name="log-out-outline" size={33} color="#000000" />
        </Pressable>

      </View>

      <DrawerItem
        icon="cube-outline"
        label="Item Inventory"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Item Inventory' })}
      />

      <DrawerItem
        icon="cash-outline"
        label="Expenditure"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Expenditure' })}
      />

      <DrawerItem
        icon="list-outline"
        label="Routine Service"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Routine Service' })}
      />

      <DrawerItem
        icon="chatbox-ellipses-outline"
        label="FieldWeb AI"
        onPress={() => navigation.navigate('MainTabs', { screen: 'FieldWeb AI' })}
      />

      <DrawerItem
        icon="settings-outline"
        label="Settings"
        onPress={() => navigation.navigate('MainTabs', { screen: 'Settings' })}
      />

      <DrawerItem
        icon="arrow-forward-circle-outline"
        label="Check-Out"
        onPress={() => setShowCheckOutModal(true)}
      />

      <Modal
        transparent
        visible={showLogoutModal}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>
              Oh no! You are leaving... {'\n'}Are you sure?
            </Text>

            <Pressable
              style={styles.confirmBtn}
              onPress={() => {
                setShowLogoutModal(false);
                clearAuth();
              }}
            >
              <Text style={styles.confirmText}>LOGOUT</Text>
            </Pressable>
            <Pressable onPress={() => setShowLogoutModal(false)} >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        visible={showCheckOutModal}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.modalTitle}>
              Do you want to Check-Out for Today?
            </Text>

            <Pressable
              style={styles.confirmBtn}
              onPress={() => {
                setShowCheckOutModal(false);
                console.log('Confirmed Check Out');
              }}
            >
              <Text style={styles.confirmText}>CHECK-OUT</Text>
            </Pressable>
            <Pressable onPress={() => setShowCheckOutModal(false)} >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

interface DrawerItemProps {
  icon: string;
  label: string;
  onPress: () => void;
}

function DrawerItem({ icon, label, onPress }: DrawerItemProps) {
  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={22} />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 40, 
    paddingTop: 60, 
    borderTopRightRadius: 0, 
    borderBottomRightRadius: 0,
    position: 'relative',
  },
  name: { 
    fontSize: 20, 
    fontWeight: '600', 
    marginBottom: 4 
  },
  phone: { marginBottom: 20, color: '#007BFF', fontSize: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 16,
  },
  label: { fontSize: 18, fontWeight: '500' },
  profileRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},

profileWrapper: {
  width: 70,
  height: 70,
  marginRight: 16,
  position: 'relative',
},

pfp: {
  width: '100%',
  height: '100%',
  borderRadius: 35,
},

editProfile: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 22,
  height: 22,
  borderRadius: 11,
  backgroundColor: COLORS.primary,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 4,
},

infoContainer: {
  flex: 1,
},

logoutButton: {
  width: 35,
  height: 65,
  borderRadius: 8,
  backgroundColor: '#f4f4f4',
  justifyContent: 'center',
  alignItems: 'flex-end',
  left: 15,
  alignSelf: 'flex-start',
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
  height: 250,
},

modalTitle: {
  fontSize: 20,
  fontWeight: '400',
  marginBottom: 8,
  paddingVertical: 15,
  textAlign: 'center',
},

confirmBtn: {
  padding: 10,
  borderRadius: 20,
  backgroundColor: COLORS.primary,
  alignItems: 'center',
  elevation: 4,
  height: 50,
},

cancelText: {
  fontSize: 20,
  color: '#8e8b8b',
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
});

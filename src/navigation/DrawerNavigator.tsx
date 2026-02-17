import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TechnicianTabs from './TechnicianTabs';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={TechnicianTabs} />
    </Drawer.Navigator>
  );
}

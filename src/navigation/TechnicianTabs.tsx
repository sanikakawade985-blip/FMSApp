// src/navigation/TechnicianTabs.tsx
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppHeader from '../components/AppHeader';
import BottomTabBar from '../components/BottomTabBar';

import HomeScreen from '../screens/technician/HomeScreen';
import TaskScreen from '../screens/technician/TaskScreen';
import AttendanceScreen from '../screens/technician/AttendanceScreen';
import LeaveScreen from '../screens/technician/LeaveScreen';
import PassbookScreen from '../screens/technician/PassbookScreen';

import AddQuoteScreen from '../screens/technician/AddQuoteScreen';
import AddInvoiceScreen from '../screens/technician/AddInvoiceScreen';
import AddLeadScreen from '../screens/technician/AddLeadScreen';

import NotificationScreen from '../screens/technician/NotificationScreen';
import HelpScreen from '../screens/technician/HelpScreen';
import HelpMessagesScreen from '../screens/technician/HelpMsgScreen';

import TechProfileScreen from '../screens/techDrawer/TechProfileScreen';
import InventoryScreen from '../screens/techDrawer/InventoryScreen';
import ExpenditureScreen from '../screens/techDrawer/ExpenditureScreen';
import ServiceScreen from '../screens/techDrawer/ServiceScreen';
import AIScreen from '../screens/techDrawer/AIScreen';
import SettingScreen from '../screens/techDrawer/SettingScreen';

export type TechnicianTabParamList = {
  Home: undefined;
  Task: undefined;
  Attendance: undefined;
  Leave: undefined;
  Passbook: undefined;
  AddQuote: undefined;
  AddInvoice: undefined;
  AddLead: undefined;
  notification: undefined;
  help: undefined;
  helpMessages: undefined;
  Profile: undefined;
  'Item Inventory': undefined;
  Expenditure: undefined;
  'Routine Service': undefined;
  'FieldWeb AI': undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TechnicianTabParamList>();

export default function TechnicianTabs() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        tabBar={(props) => {
          const currentRoute =
            props.state.routes[props.state.index].name;

          const hideTabBar = currentRoute === 'help' || currentRoute === 'helpMessages' || currentRoute === 'Settings' || currentRoute === 'FieldWeb AI';

          return (
            <>
              <AppHeader
                title={getTitle(props.state)}
                navigation={props.navigation}
              />

              {!hideTabBar && <BottomTabBar {...props} />}
            </>
          );
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Task" component={TaskScreen} />
        <Tab.Screen name="Attendance" component={AttendanceScreen} />
        <Tab.Screen name="Leave" component={LeaveScreen} />
        <Tab.Screen name="Passbook" component={PassbookScreen} />

        <Tab.Screen name="AddQuote" component={AddQuoteScreen} />
        <Tab.Screen name="AddInvoice" component={AddInvoiceScreen} />
        <Tab.Screen name="AddLead" component={AddLeadScreen} />
        
        <Tab.Screen name="notification" component={NotificationScreen} />
        <Tab.Screen name="help" component={HelpScreen} />
        <Tab.Screen name="helpMessages" component={HelpMessagesScreen} />

        <Tab.Screen name="Profile" component={TechProfileScreen} />
        <Tab.Screen name="Item Inventory" component={InventoryScreen} />
        <Tab.Screen name="Expenditure" component={ExpenditureScreen} />
        <Tab.Screen name="Routine Service" component={ServiceScreen} />
        <Tab.Screen name="FieldWeb AI" component={AIScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    </View>
  );
}

function getTitle(state: any) {
  const routeName = state.routes[state.index].name;

  switch (routeName) {
    case 'Home':
      return 'FieldWeb';
    case 'Task':
      return 'Tasks';
    case 'Attendance':
      return 'Attendance';
    case 'Leave':
      return 'Attendance';
    case 'Passbook':
      return 'Passbook';
    case 'notification':
      return 'Notification';
    case 'help':
      return 'Help & Support';
    case 'helpMessages':
      return 'Help & Support';
    case 'Item Inventory':
      return 'Item Inventory';
    case 'Expenditure':
      return 'Passbook';
    case 'Routine Service':
      return 'Routine Service';
    case 'FieldWeb AI':
      return 'FieldWeb AI';
    case 'Settings':
      return 'Settings';
    case 'Profile':
      return 'Profile';
    default:
      return 'FieldWeb';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

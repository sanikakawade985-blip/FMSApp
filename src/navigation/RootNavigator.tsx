// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthStack from './AuthStack';
// import TechnicianTabs from './TechnicianTabs';
// import { useAuthStore } from '../store/authStore';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const { uid } = useAuthStore();
//   console.log('ROOT uid =', uid);

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {uid ? (
//         <Stack.Screen name="Technician" component={TechnicianTabs} />
//       ) : (
//         <Stack.Screen name="Auth" component={AuthStack} />
//       )}
//     </Stack.Navigator>
//   );
// }

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { uid } = useAuthStore();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {uid ? (
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

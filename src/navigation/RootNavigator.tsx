import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const uid = useAuthStore((state) => state.uid);

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      key={uid ? 'app' : 'auth'}
    >
      {uid ? (
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

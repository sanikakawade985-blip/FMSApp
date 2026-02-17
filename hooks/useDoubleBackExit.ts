import { useRef, useCallback } from 'react';
import { BackHandler, Platform, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useDoubleBackExit = () => {
  const lastPress = useRef(0);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;

      const onBackPress = () => {
        const now = Date.now();

        if (now - lastPress.current < 2000) {
          BackHandler.exitApp();
          return true;
        }

        lastPress.current = now;
        ToastAndroid.show(
          'Press back again to exit',
          ToastAndroid.SHORT
        );
        return true;
      };

      const sub = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => sub.remove();
    }, [])
  );
};

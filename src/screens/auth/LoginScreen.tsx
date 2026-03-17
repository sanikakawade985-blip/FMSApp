import {
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useMemo, useEffect } from 'react';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStyles } from '../../styles/globalStyles';
import { sendOtpApi, checkMobileExistsApi } from '../../services/authApi';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import * as Geolocation from 'react-native-geolocation-service';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: { mobile: string; serverOtp: number; token: string; userId: number; role: string};
};

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const isValidMobile = useMemo(() => {
    const cleaned = mobile.replace(/\D/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  }, [mobile]);

  const login = async () => {
    const cleanedMobile = mobile.replace(/\D/g, "");

    if (!isValidMobile) {
      Alert.alert("Error", "Please enter valid mobile number");
      return;
    }

    try {
      setLoading(true);

      //Step 1 - check mobile exists
      await checkMobileExistsApi(cleanedMobile);

      // Step 2 — Send login request
      const res = await sendOtpApi(cleanedMobile);

      const result = res?.ResultData;

      navigation.navigate("Otp", {
        mobile: cleanedMobile,
        serverOtp: result?.OTP ?? 0,
        token: result?.Token ?? "",
        userId: result?.UserID ?? 0,
        role: result?.UserGroupName ?? "technician",
      });

    } catch (e: any) {
      Alert.alert("Login Failed", e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await request(permission);

      if (result !== RESULTS.GRANTED) {
        Alert.alert('Permission Required', 'Location permission is required');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/ic_splash_background.png')}
      style={GlobalStyles.container}
      resizeMode="cover"
    >
      <View style={GlobalStyles.header}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={GlobalStyles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={GlobalStyles.title}>Welcome</Text>
      <Text style={GlobalStyles.subtitle}>
        Please enter your details {`\n`} to access your account
      </Text>

      <TextInput
        placeholder="Enter Your Mobile No. Or Email"
        keyboardType="phone-pad"
        style={[
          GlobalStyles.input,
          !isValidMobile && mobile.length > 0 && GlobalStyles.inputError,
        ]}
        onChangeText={setMobile}
        value={mobile}
        maxLength={15}
        cursorColor={COLORS.primary}
      />

      {!isValidMobile && mobile.length > 0 && (
        <Text style={GlobalStyles.errorText}>
          Please enter a valid mobile number (7-15 digits)
        </Text>
      )}

      <AppButton title="GET OTP" onPress={login} />

      <View style={GlobalStyles.languageRow}>
        <Ionicons
          name="language-outline"
          size={22}
          color={COLORS.textPrimary}
        />
        <Text style={GlobalStyles.languageText}> Change Language </Text>
      </View>

      <Text style={GlobalStyles.footerText}>
        New to FieldWeb?{'\t\t\t\t'}
        <Text
          style={GlobalStyles.link}
          onPress={() => navigation.navigate('Signup')}
        >
          Register Here
        </Text>
      </Text>

      <Text style={GlobalStyles.helpText}>
        If you are having trouble Logging in
      </Text>

      <View style={GlobalStyles.helpButtonsRow}>
        <Pressable
          style={[GlobalStyles.helpButton, GlobalStyles.whatsappButton]}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#FFFFFF" />
          <Text style={GlobalStyles.helpButtonText}>WhatsApp</Text>
        </Pressable>

        <Pressable style={[GlobalStyles.helpButton, GlobalStyles.videoButton]}>
          <Ionicons name="play-circle" size={20} color="#C22032" />
          <Text style={GlobalStyles.helpButtonText}>Video</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

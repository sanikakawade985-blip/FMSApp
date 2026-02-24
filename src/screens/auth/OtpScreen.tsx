import {
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import AppButton from '../../components/AppButton';
import { GlobalStyles } from '../../styles/globalStyles';
import { COLORS } from '../../theme/colors';

const OTP_LENGTH = 4;

export default function OtpScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
  mobile,
  countryCode,
  serverOtp,
  token,
  userId,
  role,
} = route.params as {
  mobile: string;
  countryCode: string;
  serverOtp: number;
  token: string;
  userId: number;
  role: string;
};

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  const isOtpComplete = otp.every((d) => d !== '');
  const { setAuth } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

    const verifyOtp = () => {
      if (!isOtpComplete) {
        Alert.alert('Error', 'Please enter complete OTP');
        return;
      }

      if (Number(otp.join('')) !== serverOtp) {
        Alert.alert('Error', 'Invalid OTP');
        return;
      }

      setAuth(String(userId), role as any);
    };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];

    if (value !== '') {
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
      return;
    }

    updatedOtp[index] = '';
    setOtp(updatedOtp);
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key !== 'Backspace') return;

    if (otp[index] === '' && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = '';
      setOtp(updatedOtp);

      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
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

      <Text style={GlobalStyles.title}>Verify</Text>
      <Text style={GlobalStyles.subtitle}>
        You will receive a {OTP_LENGTH}-digit OTP for verification
      </Text>

      <View style={GlobalStyles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref: TextInput | null) => { inputRefs.current[index] = ref; }}
            value={digit}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => handleOtpChange(val, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key ?? '', index)
            }
            cursorColor={COLORS.primary}
            onFocus={() => setFocusedIndex(index)}
            style={[
              GlobalStyles.otpInput,
              focusedIndex === index && {
                borderColor: COLORS.primary,
                borderWidth: 2,
              },
            ]}
          />
        ))}
      </View>

      <AppButton title="Verify" onPress={verifyOtp} disabled={!isOtpComplete} />
    </ImageBackground>
  );
}

//OtpScreen.tsx
import {
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/authStore';
import { COLORS } from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { authApi } from '../../services/authApi';
import { profileApi } from '../../services/profileApi';
import { RouteProp } from '@react-navigation/native';

type AuthStackParamList = {
  Otp: {
    mobile: string;
    serverOtp: number;
    token: string;
    userId: number;
    role: string;
  };
};

const OTP_LENGTH = 4;

const OTP_EXPIRY_SECONDS = 270; // 4.5 minutes
const RESEND_COOLDOWN = 60;

export default function OtpScreen() {
  const route = useRoute<RouteProp<AuthStackParamList, 'Otp'>>();
  const navigation = useNavigation();

  const { mobile, serverOtp, token, userId, role } = route.params as {
    mobile: string;
    serverOtp: number;
    token: string;
    userId: number;
    role: string;
  };

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);

  const [expiryTimer, setExpiryTimer] = useState(OTP_EXPIRY_SECONDS);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);
  const [currentOtp, setCurrentOtp] = useState(serverOtp);

  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

  const isOtpComplete = otp.every((d) => d !== '');
  const { setAuth, setProfile } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /*
  OTP EXPIRY TIMER (4.5 minutes)
  */
  useEffect(() => {
    if (expiryTimer <= 0) {
      setOtpExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setExpiryTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryTimer]);

  /*
  RESEND TIMER
  */
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const verifyOtp = async () => {
    if (otpExpired) {
      Alert.alert('OTP Expired', 'Please resend OTP.');
      return;
    }

    if (!isOtpComplete) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    // ✅ NO OTP COMPARISON HERE

    setAuth(userId, role, role, mobile, token);

    try {
      const profile = await profileApi.getUserDetails(token, userId);

      const parsed =
        typeof profile.resultData === 'string'
          ? JSON.parse(profile.resultData)
          : profile.resultData;

      const user = parsed?.ResultData;

      const fullName = `${user?.FirstName ?? ''} ${user?.LastName ?? ''}`.trim();
      const contact = user?.ContactNo ?? mobile;

      let countryCode = user?.CountryCode;

      if (!countryCode) {
        countryCode = contact.length === 10 ? '+91' : '+1';
      }

      setProfile(fullName, contact, countryCode);

    } catch (err) {
      console.log('PROFILE FETCH ERROR', err);
    }
  };

  const resendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      const response = await authApi.sendOtp({
        MobileNo: mobile
      });

      const parsed =
        typeof response.resultData === 'string'
          ? JSON.parse(response.resultData)
          : response.resultData;

      const result = parsed?.ResultData;

      console.log("RESEND OTP:", result?.OTP);

      setOtp(Array(OTP_LENGTH).fill(''));
      setExpiryTimer(OTP_EXPIRY_SECONDS);
      setOtpExpired(false);
      setResendTimer(RESEND_COOLDOWN);
      setCurrentOtp(result?.OTP ?? currentOtp);

      Alert.alert('OTP Sent', 'A new OTP has been sent.');

    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
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
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Verify</Text>

      <Text style={styles.subtitle}>
        You will receive a {OTP_LENGTH} digit OTP for verification
      </Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(val) => handleOtpChange(val, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key ?? '', index)
            }
            onFocus={() => setFocusedIndex(index)}
            style={[
              styles.otpInput,
              focusedIndex === index && {
                borderBottomColor: '#6b6b6b',
              },
            ]}
            cursorColor={COLORS.black}
          />
        ))}
      </View>

      {otpExpired && (
        <Text style={{ color: 'red', marginBottom: 10 }}>
          OTP expired. Please resend OTP.
        </Text>
      )}

      {!otpExpired && (
        <Text style={{ color: '#8E8E8E', marginBottom: 10 }}>
          OTP expires in {formatTime(expiryTimer)}
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.verifyButton,
          { opacity: isOtpComplete && !otpExpired ? 1 : 0.6 },
        ]}
        onPress={verifyOtp}
        disabled={!isOtpComplete || otpExpired}
      >
        <Text style={styles.verifyText}>VERIFY</Text>
      </TouchableOpacity>

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Did not get the code? </Text>

        <Pressable onPress={resendOtp} disabled={resendTimer > 0}>
          <Text
            style={[
              styles.resendLink,
              { color: resendTimer > 0 ? 'gray' : COLORS.primary },
            ]}
          >
            {resendTimer > 0
              ? `Resend in ${formatTime(resendTimer)}`
              : 'Resend'}
          </Text>
        </Pressable>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle-outline" size={50} color="#A0A0A0" />
        </Pressable>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  logoContainer: {
    marginTop: -100,
    alignItems: 'center',
  },

  logo: {
    width: 300,
    height: 200,
  },

  title: {
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 20,
    color: '#000',
  },

  subtitle: {
    fontSize: 20,
    color: '#8E8E8E',
    textAlign: 'center',
    marginBottom: 40,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 30,
  },

  otpInput: {
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
    borderBottomWidth: 2.5,
    borderBottomColor: '#6b6b6b',
  },

  verifyButton: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
    marginBottom: 25,
  },

  verifyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  resendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },

  resendText: {
    color: '#8E8E8E',
    fontSize: 18,
  },

  resendLink: {
    fontWeight: '600',
    fontSize: 18,
  },

  backButton: {
    marginTop: 60,
    bottom: 40,
    alignItems: 'center',
  },
});
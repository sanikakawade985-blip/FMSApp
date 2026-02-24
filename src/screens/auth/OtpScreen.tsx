// import {
//   View,
//   TextInput,
//   Text,
//   Image,
//   ImageBackground,
//   Alert,
// } from 'react-native';
// import { useState, useRef, useEffect } from 'react';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import { useAuthStore } from '../../store/authStore';
// import AppButton from '../../components/AppButton';
// import { GlobalStyles } from '../../styles/globalStyles';
// import { COLORS } from '../../theme/colors';

// const OTP_LENGTH = 4;

// export default function OtpScreen() {
//   const route = useRoute();
//   const navigation = useNavigation();

//   const {
//   mobile,
//   countryCode,
//   serverOtp,
//   token,
//   userId,
//   role,
// } = route.params as {
//   mobile: string;
//   countryCode: string;
//   serverOtp: number;
//   token: string;
//   userId: number;
//   role: string;
// };

//   const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
//   const [focusedIndex, setFocusedIndex] = useState(0);
//   const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null));

//   const isOtpComplete = otp.every((d) => d !== '');
//   const { setAuth } = useAuthStore();

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);

//     const verifyOtp = () => {
//       if (!isOtpComplete) {
//         Alert.alert('Error', 'Please enter complete OTP');
//         return;
//       }

//       if (Number(otp.join('')) !== serverOtp) {
//         Alert.alert('Error', 'Invalid OTP');
//         return;
//       }

//       setAuth(
//         String(userId),
//         role,
//         role,
//         mobile,
//         token
//       );
//     };

//   const handleOtpChange = (value: string, index: number) => {
//     if (!/^\d?$/.test(value)) return;

//     const updatedOtp = [...otp];

//     if (value !== '') {
//       updatedOtp[index] = value;
//       setOtp(updatedOtp);

//       if (index < OTP_LENGTH - 1) {
//         inputRefs.current[index + 1]?.focus();
//         setFocusedIndex(index + 1);
//       }
//       return;
//     }

//     updatedOtp[index] = '';
//     setOtp(updatedOtp);
//   };

//   const handleKeyPress = (key: string, index: number) => {
//     if (key !== 'Backspace') return;

//     if (otp[index] === '' && index > 0) {
//       const updatedOtp = [...otp];
//       updatedOtp[index - 1] = '';
//       setOtp(updatedOtp);

//       inputRefs.current[index - 1]?.focus();
//       setFocusedIndex(index - 1);
//     }
//   };

//   return (
//     <ImageBackground
//       source={require('../../../assets/images/ic_splash_background.png')}
//       style={GlobalStyles.container}
//       resizeMode="cover"
//     >
//       <View style={GlobalStyles.header}>
//         <Image
//           source={require('../../../assets/images/logo.png')}
//           style={GlobalStyles.logo}
//           resizeMode="contain"
//         />
//       </View>

//       <Text style={GlobalStyles.title}>Verify</Text>
//       <Text style={GlobalStyles.subtitle}>
//         You will receive a {OTP_LENGTH}-digit OTP for verification
//       </Text>

//       <View style={GlobalStyles.otpRow}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref: TextInput | null) => { inputRefs.current[index] = ref; }}
//             value={digit}
//             keyboardType="number-pad"
//             maxLength={1}
//             onChangeText={(val) => handleOtpChange(val, index)}
//             onKeyPress={({ nativeEvent }) =>
//               handleKeyPress(nativeEvent.key ?? '', index)
//             }
//             cursorColor={COLORS.primary}
//             onFocus={() => setFocusedIndex(index)}
//             style={[
//               GlobalStyles.otpInput,
//               focusedIndex === index && {
//                 borderColor: COLORS.primary,
//                 borderWidth: 2,
//               },
//             ]}
//           />
//         ))}
//       </View>

//       <AppButton title="Verify" onPress={verifyOtp} disabled={!isOtpComplete} />
//     </ImageBackground>
//   );
// }

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

    setAuth(String(userId), role, role, mobile, token);
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
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Verify</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        You will receive a {OTP_LENGTH} digit OTP for verification
      </Text>

      {/* OTP Inputs */}
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

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          { opacity: isOtpComplete ? 1 : 0.6 },
        ]}
        onPress={verifyOtp}
        disabled={!isOtpComplete}
      >
        <Text style={styles.verifyText}>VERIFY</Text>
      </TouchableOpacity>

      {/* Resend */}
      <View style={styles.resendRow}>
        <Text style={styles.resendText}>Did not get the code?{'\t\t'}</Text>
        <Text style={styles.resendLink}> Resend</Text>
      </View>

      {/* Back Button */}
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
    marginBottom: 50,
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
    paddingTop: 40,
  },

  resendText: {
    color: '#8E8E8E',
    fontSize: 18,
  },

  resendLink: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 18,
  },

  backButton: {
    marginTop: 60,
    bottom: 40,
    alignItems: 'center',
  },
});
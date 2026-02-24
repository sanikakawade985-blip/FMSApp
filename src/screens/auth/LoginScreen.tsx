import {
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useMemo } from 'react';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStyles } from '../../styles/globalStyles';
import { sendOtpApi } from '../../services/authApi';

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

  const isValidMobile = useMemo(() => {
    const cleaned = mobile.replace(/\D/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  }, [mobile]);

  const login = async () => {
    try {
      const res = await sendOtpApi(mobile);

      navigation.navigate('Otp', {
        mobile,
        serverOtp: res.ResultData.OTP,
        token: res.ResultData.Token,
        userId: res.ResultData.UserID,
        role: res.ResultData.UserGroupName,
      });

    } catch (e: any) {
      Alert.alert('Error', e.message);
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

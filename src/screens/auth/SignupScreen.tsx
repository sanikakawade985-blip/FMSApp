import {
  View,
  TextInput,
  Text,
  Image,
  Pressable,
  Modal,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppButton from '../../components/AppButton';
import { COUNTRIES, Country } from '../../data/countries';
import { getDefaultCountry } from '../../utils/countryUtils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStyles } from '../../styles/globalStyles';
import { sendOtp } from '../../services/authApi';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Otp: { mobile: string; countryCode: string };
};

export default function SignupScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const defaultCountry = useMemo(() => getDefaultCountry(), []);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
  const [mobile, setMobile] = useState('');
  const [countryModalVisible, setCountryModalVisible] = useState(false);

  const isValidMobile = useMemo(() => {
    const cleaned = mobile.replace(/\D/g, '');
    return cleaned.length >= 7 && cleaned.length <= 15;
  }, [mobile]);

  const signup = async () => {
    if (!isValidMobile) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid mobile number (7–15 digits).'
      );
      return;
    }

    try {
      await sendOtp({
        countryCode: selectedCountry.dialCode,
        mobile,
      });

      navigation.navigate('Otp', {
        mobile,
        countryCode: selectedCountry.dialCode,
      });
    } catch (err: any) {
      Alert.alert('Error', err.message);
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

      <Text style={GlobalStyles.title}>Sign Up</Text>
      <Text style={GlobalStyles.subtitle}>
        Create an admin account for your company
      </Text>

      <Text style={GlobalStyles.label}>Country Code</Text>
      <Pressable
        style={GlobalStyles.dropdownWrapper}
        onPress={() => setCountryModalVisible(true)}
      >
        <Text style={GlobalStyles.dropdownText}>
          {selectedCountry.flag} {selectedCountry.dialCode}
        </Text>
      </Pressable>

      <Modal transparent animationType="fade" visible={countryModalVisible}>
        <Pressable
          style={GlobalStyles.modalOverlay}
          onPress={() => setCountryModalVisible(false)}
        >
          <View style={GlobalStyles.modalContent}>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.isoCode}
              renderItem={({ item }) => (
                <Pressable
                  style={GlobalStyles.modalItem}
                  onPress={() => {
                    setSelectedCountry(item);
                    setCountryModalVisible(false);
                  }}
                >
                  <Text style={GlobalStyles.modalItemText}>
                    {item.flag} {item.name} ({item.dialCode})
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      <Text style={GlobalStyles.label}>Mobile Number</Text>
      <TextInput
        keyboardType="phone-pad"
        placeholder="Enter your mobile number"
        style={[
          GlobalStyles.input,
          !isValidMobile && mobile.length > 0 && GlobalStyles.inputError,
        ]}
        onChangeText={setMobile}
        value={mobile}
        maxLength={15}
      />

      {!isValidMobile && mobile.length > 0 && (
        <Text style={GlobalStyles.errorText}>
          Please enter a valid mobile number
        </Text>
      )}

      <Text style={{ textAlign: 'center', marginVertical: 8 }}>
        Login with Email (coming soon)
      </Text>

      <AppButton title="GET OTP" onPress={signup} />

      <Text style={GlobalStyles.footerText}>
        Already Registered?{' '}
        <Text
          style={GlobalStyles.link}
          onPress={() => navigation.navigate('Login')}
        >
          Login
        </Text>
      </Text>

      <Text style={GlobalStyles.helpText}>
        If you are having trouble signing up
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

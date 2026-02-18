import {
  View,
  TextInput,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useMemo } from 'react';
import AppButton from '../../components/AppButton';
import { COLORS } from '../../theme/colors';
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

export default function LoginScreen() {
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

  const login = async () => {
    if (!isValidMobile) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid mobile number (7-15 digits).'
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
        Please enter your details to access your account
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

      <Modal
        transparent
        animationType="fade"
        visible={countryModalVisible}
        onRequestClose={() => setCountryModalVisible(false)}
      >
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
        placeholder="Enter your mobile number"
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
          size={20}
          color={COLORS.textPrimary}
        />
        <Text style={GlobalStyles.languageText}> Change Language </Text>
      </View>

      <Text style={GlobalStyles.footerText}>
        New to FieldWeb?{' '}
        <Text
          style={GlobalStyles.link}
          onPress={() => navigation.navigate('Signup')}
        >
          Register Here
        </Text>
      </Text>

      <Text style={GlobalStyles.helpText}>
        If you are having trouble logging in
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

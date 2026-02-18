import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  Pressable,
  Modal
} from 'react-native';
import { COLORS } from '../../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

const { height } = Dimensions.get('window');

export default function ServiceScreen() {
  const [filter, setFilter] = useState<
    'Asset' | 'Customer No.'
  >('Asset');

  const [activeDropdown, setActiveDropdown] =
    useState<'Asset' | null>(null);

  return (
    <View style={styles.root}>
      
      {/* Red Top Section */}
      <View style={styles.redBg} />

      {/* White Bottom Sheet */}
      <View style={styles.whiteSheet}>
        <Text style={styles.titleText}>
          Enter Asset Id/Model No. or Customer Number
        </Text>

        {/* Dropdown */}
        <Pressable
          style={styles.assetDropdown}
          onPress={() => setActiveDropdown('Asset')}
        >
          <Text style={styles.assetText}>{filter}</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </Pressable>

        {/* Input */}
        <TextInput
          placeholder="Enter Asset ID/Model No."
          placeholderTextColor="#9ca3af"
          style={styles.input}
          cursorColor={COLORS.primary}
        />

        {/* Submit Button */}
        <Pressable style={styles.submitBtn}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </Pressable>
      </View>

      <Modal
        visible={activeDropdown !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveDropdown(null)}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setActiveDropdown(null)}
        />
          
        <View style={styles.dropdown}>
          {activeDropdown === 'Asset' &&
            (['Asset', 'Customer No.'] as const).map((item) => (
              <Pressable
                key={item}
                style={styles.dropdownItem}
                onPress={() => {
                  setFilter(item);
                  setActiveDropdown(null);
                }}
              >
                <Text style={styles.dropdownText}>{item}</Text>
              </Pressable>
            ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  redBg: {
    height: height * 0.12,
    backgroundColor: COLORS.primary,
  },

  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 40,
  },

  titleText: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 120,
    marginBottom: 50,
    fontWeight: '500',
  },

  assetDropdown: {
    height: 50,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: 300,
    alignSelf: 'center',
  },

  assetText: {
    fontSize: 18,
    color: '#111',
  },

  input: {
    height: 50,
    width: 300,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
  },

  submitBtn: {
    height: 50,
    width: 300,
    borderRadius: 35,
    backgroundColor: '#2f2f2f',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    alignSelf: 'center',
  },

  submitText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 300,
    backgroundColor: '#fff',
    width: 250,
    height: 100,
    elevation: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 20,
    color: COLORS.textQuaternary,
    fontWeight: '400',
  },
});

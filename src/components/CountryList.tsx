import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { COUNTRIES, Country } from '../data/countries';

interface CountryListProps {
  onCountrySelect?: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({ onCountrySelect }) => {
  const renderCountry = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => onCountrySelect?.(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryDetails}>
          {item.isoCode} • {item.dialCode}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Country</Text>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => item.isoCode}
        renderItem={renderCountry}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  countryDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default CountryList;

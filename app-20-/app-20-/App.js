import React, { useState, useEffect } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [smallFont, setSmallFont] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      const darkModePreference = await AsyncStorage.getItem('darkModePreference');
      const smallFontPreference = await AsyncStorage.getItem('smallFontPreference');
      if (darkModePreference !== null) {
        setDarkMode(JSON.parse(darkModePreference));
      }
      if (smallFontPreference !== null) {
        setSmallFont(JSON.parse(smallFontPreference));
      }
    };

    fetchPreferences();
  }, []);

  const toggleDarkMode = async (value) => {
    setDarkMode(value);
    await AsyncStorage.setItem('darkModePreference', JSON.stringify(value));
  };

  const toggleFontSize = async (value) => {
    setSmallFont(value);
    await AsyncStorage.setItem('smallFontPreference', JSON.stringify(value));
  };

  return (
    <View style={[styles.container, darkMode && styles.darkMode]}>
      <Text style={styles.title}>Frases</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.textt, darkMode && styles.darkModeText]}> Noite </Text>
        <Switch
          value={darkMode}
          onValueChange={(newValue) => toggleDarkMode(newValue)}
        />
        <Text style={[styles.textt, darkMode && styles.darkModeText]}> Pequeno </Text>
        <Switch
          value={smallFont}
          onValueChange={(newValue) => toggleFontSize(newValue)}
        />
      </View>
      <Text style={[styles.text, smallFont && styles.smallFont, darkMode && styles.darkModeText]}>That's what she said 
         </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  darkMode: {
    backgroundColor: '#303030', 
  },
  title: {
    fontSize: 30,
    marginTop: 20,
    color: '#1F51FF'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 40
  },
  text: {
    fontSize: 28, 
    color: '#000000', 
  },
  textt: {
    fontSize: 12, 
    color: '#000000', 
  },
  smallFont: {
    fontSize: 12, 
  },
  darkModeText: {
    color: '#ffffff', 
  },
});

export default App;

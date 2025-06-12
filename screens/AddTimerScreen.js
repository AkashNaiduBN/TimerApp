import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTimerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const saveTimer = async () => {
    if (!name || !duration || !category) return Alert.alert("Please fill all fields");

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      category,
      remaining: parseInt(duration),
      status: 'Paused',
    };

    const existing = await AsyncStorage.getItem('timers');
    const timers = existing ? JSON.parse(existing) : [];
    await AsyncStorage.setItem('timers', JSON.stringify([...timers, newTimer]));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text>Duration (seconds):</Text>
      <TextInput value={duration} onChangeText={setDuration} style={styles.input} keyboardType="numeric" />

      <Text>Category:</Text>
      <TextInput value={category} onChangeText={setCategory} style={styles.input} />

      <Button title="Save Timer" onPress={saveTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});
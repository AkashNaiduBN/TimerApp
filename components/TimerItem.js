// TimerItem.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

export default function TimerItem({ timer }) {
  const [remaining, setRemaining] = useState(timer.remaining);
  const [status, setStatus] = useState(timer.status);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let interval;
    if (status === 'Running' && remaining > 0) {
      interval = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setStatus('Completed');
            setShowModal(true);
            updateStorage(0, 'Completed');
            return 0;
          }
          updateStorage(prev - 1, 'Running');
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const updateStorage = async (newTime, newStatus) => {
    const stored = await AsyncStorage.getItem('timers');
    const timers = JSON.parse(stored) || [];
    const updated = timers.map(t =>
      t.id === timer.id ? { ...t, remaining: newTime, status: newStatus } : t
    );
    await AsyncStorage.setItem('timers', JSON.stringify(updated));
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text>Status: {status}</Text>
      <Text>Remaining: {remaining}s</Text>

      <Progress.Bar
        progress={remaining / timer.duration}
        width={null}           // full-width container
        height={10}
        borderRadius={5}
        color="#4caf50"
        unfilledColor="#ddd"
        animated={true}
      />

      <View style={styles.row}>
        <Button title="Start" onPress={() => setStatus('Running')} />
        <Button title="Pause" onPress={() => setStatus('Paused')} />
        <Button title="Reset" onPress={() => {
          setRemaining(timer.duration);
          setStatus('Paused');
          updateStorage(timer.duration, 'Paused');
        }} />
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalText}>🎉 {timer.name} Completed!</Text>
          <Button title="Close" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  modalText: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    fontSize: 18,
  },
});

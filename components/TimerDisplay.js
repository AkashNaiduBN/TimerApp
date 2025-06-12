import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function TimerDisplay({ seconds }) {
  const formatTime = sec => {
    const mins = Math.floor(sec / 60).toString().padStart(2, '0');
    const secs = (sec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return <Text style={styles.timer}>{formatTime(seconds)}</Text>;
}

const styles = StyleSheet.create({
  timer: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
});

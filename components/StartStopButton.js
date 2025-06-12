import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function StartStopButton({ isRunning, onStart, onStop, onReset }) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={isRunning ? "Stop" : "Start"}
        onPress={isRunning ? onStop : onStart}
        color={isRunning ? "#e53935" : "#43a047"}
      />
      <View style={{ marginTop: 15 }}>
        <Button title="Reset" onPress={onReset} color="#039be5" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
  },
});

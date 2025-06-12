import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerItem from '../components/TimerItem';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [timers, setTimers] = useState([]);
  const [expanded, setExpanded] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadTimers = async () => {
      const stored = await AsyncStorage.getItem('timers');
      const parsed = stored ? JSON.parse(stored) : [];
      setTimers(parsed);
    };
    loadTimers();
  }, [isFocused]);

  const grouped = timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const sections = Object.keys(grouped).map(category => ({
    title: category,
    data: expanded[category] ? grouped[category] : [],
  }));

  const toggleExpand = (category) => {
    setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Add Timer" onPress={() => navigation.navigate('Add Timer')} />
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <TouchableOpacity onPress={() => toggleExpand(title)} style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </TouchableOpacity>
        )}
        renderItem={({ item }) => <TimerItem timer={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#eee', padding: 10 },
  headerText: { fontWeight: 'bold', fontSize: 16 }
});

import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

export function Home() {
  // State para armazenar nova skill
  const [newSkill, setNewSkill] = useState('');
  // State para armazenar o array de skills
  const [mySkills, setMySkills] = useState([]);
  // State para armazenar a saudação referente a hora atual
  const [greeting, setGreeting] = useState('');

  // função para adicionar novo item no state mySkills
  function handleAddNewSkill() {
    // oldState usado com spread operator para pegar state antigo 
    // e adicionar a nova informação,
    // ao inves desubstituir o array com o state newSkill
    setMySkills(oldState => [...oldState, newSkill]);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good morning!');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good afternoon!');
    } else {
      setGreeting('Good night!');
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, José
      </Text>
      <Text style={styles.greetings}>
        {greeting}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />
      <Button
        onPress={handleAddNewSkill}
      />
      <Text
        style={[styles.title, { marginVertical: 50 }]}
      >
        My Skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item}
        renderItem={({ item }) => <SkillCard skill={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#FFF',
  }
})

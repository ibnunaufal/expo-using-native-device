import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/styles'
import ImagePicker from './ImagePicker'

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('')

  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input} />
        <Text></Text>
      </View>
      <ImagePicker />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary700,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 10,
  }
})
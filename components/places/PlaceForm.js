import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Colors } from '../../constants/styles'
import ImagePicker from './ImagePicker'
import LocationPicker from './LocationPicker'
import Button from '../ui/Button'

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState()
  const [selectedLocation, setSelectedLocation] = useState()

  function changeTitleHandler(enteredText){
    setEnteredTitle(enteredText)
  }

  function takeImageHandler(imageUri){
    setSelectedImage(imageUri)
  }
  const pickLocationHandler = useCallback((location)=>{
    setSelectedLocation(location)
  },[])
  function savePlace(){
    console.log(`${enteredTitle} \n ${selectedImage} \n ${selectedLocation}`)
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={changeTitleHandler} value={enteredTitle} style={styles.input} />
        <Text></Text>
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <View style={{marginBottom: 50}}>
        <Button onPress={savePlace} >Simpan</Button>
      </View>
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
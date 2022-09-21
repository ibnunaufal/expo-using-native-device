import { Alert, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import Button from "../ui/Button";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

export default function ImagePicker({onTakeImage}) {
  const [cameraPermission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState()

  async function verifiyPermission() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient permissions!",
        "You need to granted the permission."
      );
      return false;
    }

    if (cameraPermission.status === PermissionStatus.GRANTED) {
      return true;
    }
  }

  async function takeImageHandler() {
    const hasPermission = await verifiyPermission();
    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setImage(image.uri)
    onTakeImage(image.uri)
    console.log(image);
  }
  return (
    <View>
      <View style={styles.imageView}>
        { image && <Image source={{uri: image}} style={styles.image} /> }
        { !image && <Text style={{color:'white', textAlign: "center"}}>No Image taken.</Text> }
      </View>
      <Button onPress={takeImageHandler}>Take Photos</Button>
    </View>
  );
}

const styles = StyleSheet.create({
    imageView: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center"
    },
    image: {
        width: '100%',
        height: 200,
    }
});

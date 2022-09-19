import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../ui/Button";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

export default function ImagePicker() {
  const [cameraPermission, requestPermission] = useCameraPermissions();

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

    console.log(image);
  }
  return (
    <View>
      <View>
        
      </View>
      <Button onPress={takeImageHandler}>Take Photos</Button>
    </View>
  );
}

const styles = StyleSheet.create({});

import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { Colors } from "../../constants/styles";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";

export default function LocationPicker() {
  const [locationPermission, requestPermission] = useForegroundPermissions();

  async function verifiyPermission() {
    if (locationPermission.status === PermissionStatus.UNDETERMINED) {
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
  
      if (locationPermission.status === PermissionStatus.DENIED) {
        Alert.alert(
          "Insufficient permissions!",
          "You need to granted the permission."
        );
        return false;
      }
  
      if (locationPermission.status === PermissionStatus.GRANTED) {
        return true;
      }
  }

  async function getLocationHandler() {
    const hasPermission = await verifiyPermission()

    if(!hasPermission){
        return
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
  }

  function pickOnMapHandler() {}

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <Button onPress={getLocationHandler}>Locate User</Button>
        <Button onPress={pickOnMapHandler}>Pick on Map</Button>
        {/* <IconButton icon="location" onPress={getLocationHandler} size={24} color={Colors.primary200} />
        <IconButton icon="map" onPress={pickOnMapHandler} color={Colors.primary200} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    // borderWidth: 1,
    // borderColor: Colors.primary200,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
